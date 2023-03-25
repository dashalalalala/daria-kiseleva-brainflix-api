const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid4 = require("uuid4");

function readVideos() {
	const videosJSON = fs.readFileSync("./data/video-details.json");
	const parsedVideos = JSON.parse(videosJSON);
	return parsedVideos;
}
readVideos();

router.use((req, res, next) => {
	console.log("Middleware from videos router");
	next();
});

//GET Videos Data
router.get("/", (req, res) => {
	res.json(readVideos());
});

//GET Individual Video Data
router.get("/:videoId", (req, res) => {
	const videos = readVideos();
	const singleVideo = videos.find((video) => video.id === req.params.videoId);
	res.json(singleVideo);
});

//POST endpoint to add a video
router.post("/", (req, res) => {
	const newVideo = {
		id: uuid4(),
		title: req.body.title,
		channel: "New Channel",
		image: "http://localhost:8080/filler-image/filler.png",
		description: req.body.description,
		views: "0",
		likes: "0",
		duration: "0",
		video: "https://project-2-api.herokuapp.com/stream",
		timestamp: req.body.timestamp,
		comments: [],
	};
	console.log("new video", newVideo);
	const videos = readVideos();
	videos.push(newVideo);
	fs.writeFileSync("./data/video-details.json", JSON.stringify(videos));
	res.status(200).json(newVideo);
});

//POST Endpoint for comments
router.post("/:videoId/comments", (req, res) => {
	const newComment = {
		comment: req.body.comment,
		id: uuid4(),
		likes: req.body.likes,
		name: "New User",
		timestamp: Date.now(),
	};
	console.log("new comment", newComment);
	const videos = readVideos();
	const singleVideo = videos.find((video) => video.id === req.params.videoId);
	singleVideo.comments.push(newComment);
	fs.writeFileSync("./data/video-details.json", JSON.stringify(videos));
	res.status(200).json(newComment);
});

//DELETE Endpoint for comments
router.delete("/:videoId/comments/:commentId"), (req, res) => {};

module.exports = router;
