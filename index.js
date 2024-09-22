const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST /bfhl to process JSON data
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercase) {
                highestLowercase = item;
            }
        }
    });

    // File handling (dummy validation for now)
    let file_valid = false, file_mime_type = '', file_size_kb = 0;
    if (file_b64) {
        const fileBuffer = Buffer.from(file_b64, 'base64');
        file_size_kb = fileBuffer.length / 1024;
        file_mime_type = 'application/octet-stream'; // Adjust this
        file_valid = true;
    }

    res.json({
        is_success: true,
        user_id: "your_name_23091999",
        email: "your_email@college.edu",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// GET /bfhl to return operation code
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
