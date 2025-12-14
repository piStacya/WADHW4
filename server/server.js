const express = require('express');
const cors = require('cors');
const { createTables } = require('./database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, async () => {
    await createTables();
    console.log("Server töötab pordil 3000");
});