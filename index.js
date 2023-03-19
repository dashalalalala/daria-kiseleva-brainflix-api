const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 8080;
const URL = "http://localhost:";
const videoRoutes = require("./routes/videos")

app.use(cors());
app.use(express.json());

// This middleware allows us to serve static files from a folder.
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/videos", videoRoutes)

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
