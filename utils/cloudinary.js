import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (image) => {
	await cloudinary.uploader.upload(image, {
		folder: 'moviehubz',
		upload_preset: 'movie',
		width: '40px',
		crop: 'scale',
	});
};
