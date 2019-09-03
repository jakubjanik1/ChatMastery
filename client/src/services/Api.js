import axios from 'axios';

export default(controller) => {
    return axios.create({
        baseURL: (process.env.NODE_ENV == 'development' ? `http://localhost:8080/${ controller }` : `${ controller }`)
    });
};