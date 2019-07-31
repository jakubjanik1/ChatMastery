import Api from './Api';

export default {
    uploadImage(image, folder) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('folder', folder);

        return Api().post('/upload/image', formData);
    }
}