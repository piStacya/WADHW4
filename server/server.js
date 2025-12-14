const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, createTables } = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- MIDDLEWARE (Turvamees) ---
// See funktsioon kontrollib, kas kasutajal on kehtiv token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Token tuleb tavaliselt kujul: "Bearer kood..."
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: "Puudub ligipääs (token puudu)" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token ei kehti" });
        req.user = user;
        next(); // Laseb kasutaja edasi järgmise funktsiooni juurde
    });
};

// --- ROUTES ---

// 1. SIGNUP
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email ja parool on kohustuslikud!" });

        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) return res.status(400).json({ error: "See email on juba kasutusel!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
            [email, hashedPassword]
        );

        const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Vale email või parool!" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Vale email või parool!" });

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET ALL POSTS (Kõik postitused) - Kaitstud!
app.get('/api/posts', authenticateToken, async (req, res) => {
    try {
        // Võtame kõik postitused
        const allPosts = await pool.query('SELECT * FROM posts');
        res.json(allPosts.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. ADD POST (Lisa postitus) - Kaitstud!
app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        const { body } = req.body; // Front-end saadab { body: "tekst" }
        const newPost = await pool.query(
            'INSERT INTO posts (body) VALUES ($1) RETURNING *',
            [body]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. DELETE ALL POSTS (Kustuta kõik) - Kaitstud!
app.delete('/api/posts', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM posts');
        res.json({ message: "Kõik postitused kustutatud" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SIIT ALGAVAD UUED LISAD (Üksiku postituse jaoks) ---

// 6. GET SINGLE POST (Saa kätte üks postitus ID järgi)
app.get('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Võtame URL-ist ID (nt /api/posts/5)
        const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Postitust ei leitud" });
        }

        res.json(post.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. UPDATE POST (Muuda postitust)
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body; // Uus sisu

        const updatePost = await pool.query(
            'UPDATE posts SET body = $1 WHERE id = $2',
            [body, id]
        );

        res.json({ message: "Postitus uuendatud!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. DELETE SINGLE POST (Kustuta üks postitus)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.json({ message: "Postitus kustutatud!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Käivitamine
app.listen(PORT, async () => {
    await createTables();
    console.log(`Server töötab pordil ${PORT}`);
});