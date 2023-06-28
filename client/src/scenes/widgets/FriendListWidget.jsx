import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'states';
import WidgetWrapper from 'components/WidgetWrapper';

const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const getFriends = async () => {
		const response = await fetch(
			`http://localhost:5000/users/${userId}/friends`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};
	useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant='h5'
				fontWeight='500'
				sx={{ mb: '1.5rem' }}
			>
				{' '}
				Friends List
				{friends.map(
					({ _id, firstName, lastName, occupation, picturePath }) => (
						<Friend
							key={_id}
							friendId={_id}
							name={`${firstName} ${lastName}`}
							subtitle={occupation}
							userPicturePath={picturePath}
						/>
					)
				)}
			</Typography>
		</WidgetWrapper>
	);
};

export default FriendListWidget;
