import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'states';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);

	const getPosts = async () => {
		const response = await fetch(
			'https://socialmediabackend-843p.onrender.com/posts',
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};
	const getUsersPosts = async () => {
		const response = await fetch(
			`https://socialmediabackend-843p.onrender.com/posts/${userId}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	useEffect(() => {
		if (isProfile) {
			getUsersPosts();
		} else {
			getPosts();
		}
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{posts.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => (
					<PostWidget
						key={_id}
						postId={_id}
						postUserId={userId}
						name={`${firstName} ${lastName}`}
						description={description}
						location={location}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
				)
			)}
		</>
	);
};

export default PostsWidget;
