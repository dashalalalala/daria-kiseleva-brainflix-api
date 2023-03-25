const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 8080;
const URL = "http://localhost:";
const videoRoutes = require("./routes/videos");

app.use(cors());
app.use(express.json());

// Static Folder
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Hello World");
});

// This middleware checks if we're getting JSON headers on our POST requests
app.use((req, res, next) => {
	if (
		req.method === "POST" &&
		req.headers["content-type"] !== "application/json"
	) {
		return res.status(400).send("Hey, you need to give me proper JSON");
	}

	next();
});

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
