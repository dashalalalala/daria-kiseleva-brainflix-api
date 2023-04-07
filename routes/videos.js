const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid4 = require("uuid4");

function readVideos() {
	const videosJSON = fs.readFileSync("./data/videos.json");
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
		video: "http://localhost:8080/filler-video/BrainStation-Sample-Video.mp4",
		timestamp: req.body.timestamp,
		comments: [],
	};
	console.log("new video", newVideo);
	const videos = readVideos();
	videos.push(newVideo);
	fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
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
	const videos = readVideos();
	const singleVideo = videos.find((video) => video.id === req.params.videoId);
	singleVideo.comments.push(newComment);
	fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
	res.status(200).json(newComment);
});

//DELETE Endpoint for comments
router.delete("/:videoId/comments/:commentId", (req, res) => {
	const { commentId, videoId } = req.params;
	const videos = readVideos();
	const singleVideo = videos.find((video) => video.id === videoId);
	const signleCommentIndex = singleVideo.comments.findIndex(
		(comment) => comment.id === commentId
	);
	const filteredComment = singleVideo.comments.splice(signleCommentIndex, 1);

	console.log("commentId", commentId);
	console.log("filtered Comments", filteredComment);
	console.log("videos", videos);

	fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
	res.json(filteredComment);
});

module.exports = router;
