import cloudinary from '../config/cloudinary';

export default {
    async uploadImage(req, res) {
        const result = await cloudinary.uploader.upload(
            req.files.image.path,
            { folder: `${ process.env.CLOUDINARY_MAIN_FOLDER }/${ req.body.folder }` }
        );
    
        return res.json({ url: result.secure_url });
    }
}