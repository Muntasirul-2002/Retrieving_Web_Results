
const express = require("express")
const axios = require("axios")

const app = express();
const port = 3000;
app.use(express.json())
app.get("/search", async(req,res)=>{
    try {
        const response = await axios.post("https://api.gyanibooks.com/search_publication/?keyword=ai",{
            'keyword':'ai'
        })
        console.log(response.data);
        res.json(response.data.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"An error occurred while processing the data for analytcs"
        })
        
    }
})
app.listen(port, ()=>{
    console.log("Server is running")
})

// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 3000; // Replace with your desired port number

// app.use(express.json());

// app.get('/search', async (req, res) => {
//   try {
//     const keyword = req.body.keyword;
//     const limit = req.body.limit;

//     const data = {
//       keyword: keyword,
//       limit: limit,
//     };

//     const response = await axios.post('https://api.gyanibooks.com/search_publication/', data);

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
