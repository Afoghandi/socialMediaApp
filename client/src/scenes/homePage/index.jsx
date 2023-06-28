import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

export const HomePage = () => {
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
	const { _id, picturePath } = useSelector((state) => state.user);
	return (
		<Box>
			<Navbar />

			<Box
				width='100%'
				padding='2rem 6%'
				display={isNonMobileScreens ? 'flex' : 'block'}
				justifyContent='space-between'
				gap='0.5rem'
			>
				<Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? '42%' : undefined}
					mt={isNonMobileScreens ? undefined : '2rem'}
				>
					<MyPostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} />
				</Box>
				{isNonMobileScreens && <box flexBasis='26%'></box>}
				<AdvertWidget />
				<Box m='2rem 0' />
				<FriendListWidget userId={_id} />
			</Box>
		</Box>
	);
};

export default HomePage;
