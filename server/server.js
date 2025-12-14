const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Vajalik paroolide krüpteerimiseks
const jwt = require('jsonwebtoken'); // Vajalik tokeni loomiseks
const { pool, createTables } = require('./database'); // NB! Lisasime 'pool', et saaks andmebaasiga rääkida
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- ROUTES (Teekonnad) ---

// 1. SIGNUP (Registreerimine)
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kontrollime, kas andmed on olemas
        if (!email || !password) {
            return res.status(400).json({ error: "Email ja parool on kohustuslikud!" });
        }

        // Kontrollime, kas kasutaja on juba olemas
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: "See email on juba kasutusel!" });
        }

        // Krüpteerime parooli
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Salvestame uue kasutaja
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
            [email, hashedPassword]
        );

        // Loome JWT tokeni
        const token = jwt.sign(
            { userId: newUser.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Serveri viga registreerimisel" });
    }
});

// 2. LOGIN (Sisselogimine)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Otsime kasutajat
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Vale email või parool!" });
        }

        // Kontrollime parooli
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({ error: "Vale email või parool!" });
        }

        // Loome tokeni
        const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Serveri viga sisselogimisel" });
    }
});

// Käivitamine
app.listen(PORT, async () => {
    await createTables();
    console.log(`Server töötab pordil ${PORT}`);
});