import User from '../models/User.js';

/* READ*/
// Get single user
export const getUser = async (req, res) => {
	try {
		// deconstruct id from the parameters
		const { id } = req.params;

		//Find a user by the ID
		const user = await User.findById(id);

		//Return user
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
export const getUserFriends = async (req, res) => {
	try {
		// deconstruct id from the parameters
		const { id } = req.params;
		//Find a user by the ID
		const user = await User.findById(id);

		//Use 'promise all' as we are going to be making multiple calls to the api and map through all the friends list the user has
		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		// Deconstruct data we want to send to front end
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
/**UPDATE */

export const addRemoveFriend = async (req, res) => {
	try {
		// deconstruct id from the parameters
		const { id, friendId } = req.params;
		//Get current user information
		const user = await User.findById(id);
		//Get friends information
		const friend = await User.findById(friendId);

		//If friend id is included in the main user friends ID
		if (user.friends.includes(friendId)) {
			//Remove from friends users  list
			user.friends = user.friends.filter((id) => id !== friendId);
			// Remove User from their friends list
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			//Add friend
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		//Use 'promise all' as we are going to be making multiple calls to the api and map through all the friends list the user has
		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		// Deconstruct data we want to send to front end
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
