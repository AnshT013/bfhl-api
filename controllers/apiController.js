const { separateNumbers, findHighestLowercase } = require("../utils/helpers");

// GET Request Handler
exports.handleGet = (req, res) => {
  res.json({ operation_code: 1 });
};

// POST Request Handler
exports.handlePost = (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    const numbers = separateNumbers(data);
    const highestLowercase = findHighestLowercase(data);

    res.json({
      is_success: true,
      user_id: "ansh_tiwari_1308", // replace with your format
      email: "tiwariansh1308@gmail.com",
      roll_number: "XYZ123", // replace with your roll no
      numbers: numbers,
      highest_lowercase_alphabet: highestLowercase,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
