const express = require("express");
const app = express();
const port = 3000;

const apiToken = process.env.API_TOKEN;

if (!apiToken || apiToken.length !== 64) {
  console.error("Invalid token");
  process.exit(1);
}

app.use(express.json());

// Public
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Protected
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) {
    const token = header.slice(7);
    if (token === apiToken) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

app.use(requireAuth);

app.get("/pong", (req, res) => {
  res.json({ pong: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
