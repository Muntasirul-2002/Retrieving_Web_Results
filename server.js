const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.get("/search", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.gyanibooks.com/search_publication/?keyword=ai",
      {
        keyword: "ai",
      }
    );
    console.log(response.data);
    res.json(response.data.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while processing the data for analytcs",
    });
  }
});
app.listen(port, () => {
  console.log("Server is running");
});
