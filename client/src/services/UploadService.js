import Api from './Api';
const api = Api('upload');

export function uploadImage(image, folder) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('folder', folder);

    return api.post('/image', formData);
}