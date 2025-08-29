require('dotenv').config(); // <-- load .env variables
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // use PORT from .env if available

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" })); // no need for body-parser separately

// Root GET route (optional, just to check server)
app.get("/", (req, res) => {
  res.send("BFHL API is running 🚀");
});

// ✅ GET /bfhl - returns operation code
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// ✅ POST /bfhl - main logic
app.post("/bfhl", (req, res) => {
  const FULL_NAME = (process.env.FULL_NAME || "ansh tiwari").trim().toLowerCase();
  const DOB = process.env.DOB_DDMMYYYY || "13082003";
  const EMAIL = process.env.EMAIL || "tiwariansh1308@gmail.com";
  const ROLL = process.env.ROLL_NUMBER || "XYZ123";

  const user_id = `${FULL_NAME.replace(/\s+/g, "_")}_${DOB}`;

  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id,
        email: EMAIL,
        roll_number: ROLL,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
      });
    }

    // Initialize arrays
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const alphaChars = [];

    data.forEach((item) => {
      const s = String(item);

      if (/^\d+$/.test(s)) {
        const n = Number(s);
        if (n % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
        sum += n;
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        s.split("").forEach((ch) => alphaChars.push(ch));
      } else {
        special_characters.push(s);
      }
    });

    // Build concat_string (reverse + alternating caps)
    const reversed = alphaChars.reverse();
    const concat_string = reversed
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    console.error("Error processing data:", err);
    res.status(200).json({
      is_success: false,
      user_id,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BFHL API running at http://localhost:${PORT}`);
});
