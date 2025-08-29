const { json } = require('micro'); // or use 'vercel-node'

module.exports = async (req, res) => {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(200).json({ operation_code: 1 });
  }

  const FULL_NAME = (process.env.FULL_NAME || "ansh tiwari").trim().toLowerCase();
  const DOB = process.env.DOB_DDMMYYYY || "13082003";
  const EMAIL = process.env.EMAIL || "tiwariansh1308@gmail.com";
  const ROLL = process.env.ROLL_NUMBER || "XYZ123";

  const user_id = `${FULL_NAME.replace(/\s+/g, "_")}_${DOB}`;

  try {
    const body = await json(req);
    const data = body.data;

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

    const reversed = alphaChars.reverse();
    const concat_string = reversed
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
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
    console.error("Error:", err);
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
};
