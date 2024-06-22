import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv"

// Initialize Express application
const app = express();
dotenv.config({
    path: "./data/config.env"
});

const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Define a route to fetch restaurant data
app.get("/restaurants", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
