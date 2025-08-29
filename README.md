# BFHL API

## Description
This is a REST API developed for the BFHL company test. It processes an array and returns structured data including odd/even numbers, alphabets, special characters, sum, and concatenated string in alternating caps.  

**Endpoints:**
- `POST /bfhl` → Main logic to process input array  
- `GET /bfhl` → Returns operation code (1)  

---

## Folder Structure
bfhl-api/
│── index.js
│── package.json
│── .env
│── .gitignore
│── README.md
│── utils/
│ └── processor.js


---

## Installation & Running Locally

1. Clone the repository:
```bash
git clone https://github.com/<AnshT013>/bfhl-api.git
cd bfhl-api

npm install

## Create a .env file inside root folder
FULL_NAME=ansh tiwari
DOB_DDMMYYYY=13082003
EMAIL=tiwariansh1308@gmail.com
ROLL_NUMBER=VITB-XXXX
PORT=3000

## Run the server
npm run dev   # for development with nodemon
# or
npm start     # for production

API Usage
GET /bfhl

URL:

http://localhost:3000/bfhl


Response:

{
  "operation_code": 1
}

POST /bfhl

URL:

http://localhost:3000/bfhl


Body Example:

{
  "data": ["a","1","334","4","R","$"]
}


Response:

{
  "is_success": true,
  "user_id": "ansh_tiwari_13082003",
  "email": "tiwariansh1308@gmail.com",
  "roll_number": "VITB-XXXX",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}

Notes:

Numbers are returned as strings.

concat_string reverses all alphabetical characters and alternates capitalization.

Scripts
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}


npm run dev → development mode (auto restart)

npm start → production mode