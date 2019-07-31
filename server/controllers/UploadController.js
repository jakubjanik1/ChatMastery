const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.path,
        { folder: `${ process.env.CLOUDINARY_MAIN_FOLDER }/${ req.body.folder }` }
    );

    return res.json({ url: result.url });
}