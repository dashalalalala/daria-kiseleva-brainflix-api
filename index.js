const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 8080;
const URL = "http://localhost:";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
