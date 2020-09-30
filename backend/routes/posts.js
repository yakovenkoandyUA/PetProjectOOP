const { Router } = require('express');
const router = Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		res.json({ error });
	}
});

// Submit a posts
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
	});
	try {
		const savedPosts = await post.save();
		res.json(savedPosts);
	} catch (error) {
		res.json({ message: error });
	}
});

//GET specific posts
router.get('/:postId', async (req, res) => {
	try {
		const post = Post.findById(req.params.postId);
		res.json(post);
	} catch (error) {
		res.json({ error });
	}
});

// DELETE POSTS
router.delete('/:postId', async (req, res) => {
	try {
		const removePost = await Post.remove({ _id: req.params.postId });
		res.json(removePost);
	} catch (error) {
		res.json({ message: error });
	}
});

// UPDATE

module.exports = router;
