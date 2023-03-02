import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.1.8:3000',
    responseType: 'json',
    withCredentials: true,
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    try {
        const result = await request(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: options,
        });
        console.log('result: ', result);
        return result;
    } catch (error) {
        console.log(error);
        return error.reponse.data;
    }
};

export default request;