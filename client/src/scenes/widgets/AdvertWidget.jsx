import React from 'react';
import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;
	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant='h5' fontWeight='500'>
					Sponsored
				</Typography>
				<Typography color={medium}>Create Ad</Typography>
			</FlexBetween>
			<img
				width='100%'
				height='auto'
				alt='advert'
				src='https://www.nairaland.com/attachments/4301959_untitled_jpegf00b416e41190686e1165a3b44a1bf51'
				style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
			/>

			<Typography color={main}>Kemi Cosmetics</Typography>
			<Typography color={medium}>KemiCosmetics.com</Typography>
			<Typography color={medium} m='0.5rem 0'>
				Your path way to a stunning and immaculate beauty{' '}
			</Typography>
		</WidgetWrapper>
	);
};

export default AdvertWidget;
