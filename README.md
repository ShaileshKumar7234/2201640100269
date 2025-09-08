📦 Backend Test Submission – URL Shortener Microservice
This project is a backend microservice that provides URL shortening functionality along with basic analytics. It is built using Node.js and Express, and includes a custom logging middleware that sends structured logs to a remote evaluation server.


🚀 Features
- ✅ Shortens long URLs with optional custom shortcodes
- 🔐 Ensures shortcode uniqueness and expiry handling
- 🔁 Redirects users to original URLs via shortcodes
- 📊 Tracks click statistics including timestamp, source, and location
- 📥 Logs all major events using a reusable logging middlewar


🧱 Folder Structure

2201640100269/
├── Logging Middleware/         # Custom logger that sends logs to evaluation server
│   └── logMiddleware.js
└── Backend Test Submission/    # Main microservice code
    ├── server.js               # Entry point
    ├── routes/                 # API route definitions
    ├── controllers/            # Business logic for endpoints
    ├── utils/                  # Shortcode generator
    └── data/                   # In-memory data store


⚙️ Setup Instructions
- Clone the repository
- Navigate to Backend Test Submission
- Install dependencies:
...........................
npm install
...........................

- Start the server:
..........................
node server.js
..........................


The service will run on http://localhost:3000


📮 API Endpoints
1. Create Short URL
..........................
POST /shorturls
..........................

Request Body:

{
  "url": "https://example.com",
  "validity": 30,
  "shortcode": "custom123"
}

Response:

{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-09-08T14:30:00Z"
}


2. Redirect to Original URL
GET /:shortcode
Redirects to the original URL if the shortcode is valid and not expired.



3. Get Short URL Statistics
..............................
GET /shorturls/:shortcode
..............................
Response:

{
  "originalUrl": "...",
  "createdAt": "...",
  "expiry": "...",
  "totalClicks": 1,
  "clickDetails": [...]
}


🧾 Logging Middleware
All major actions (creation, redirection, errors) are logged using a custom middleware located in Logging Middleware/logMiddleware.js. Logs are sent to:

..................................................
http://20.244.56.144/evaluation-service/logs
..................................................


Each log includes:
- stack: "backend"
- level: "info", "error", etc.
- package: e.g. "controller", "route"
- message: descriptive context