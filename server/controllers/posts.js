import Post from '../models/Post.js';

import User from '../models/User.js';

/**CREATE */

export const createPost = async (req, res) => {
	try {
		//Get data fro body
		const { userId, description, picturePath } = req.body;
		//find the user by the ID
		const user = await User.findById(userId);

		//create a new post and save
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});

		await newPost.save();
		//Find all post and return
		const post = await Post.find();
		res.status(201).json(post);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

/**READ */

export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/**UPDATE */

export const likePost = async (req, res) => {
	try {
		//Id of Post
		const { id } = req.params;
		//ID of user that likes post
		const { userId } = req.body;

		const post = await Post.findById(id);
		//Declare constant to store the user id of who liked post
		const isLiked = post.likes.get(userId);

		//If user has liked post, delete likes
		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
