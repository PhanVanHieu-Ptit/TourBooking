import request from '../untils';

export const userLogin = async (data, path) => {
    console.log('data: ', data);
    try {
        const result = await request('/account/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
        console.log('result: ', result);
        return result.data;
    } catch (error) {
        console.log(error);
        return error.reponse.data;
    }
};

export const userRegister = async (data) => {
    console.log('data: ', data);
    try {
        const result = await request('/account/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
        console.log('result: ', result);
        return result.data;
    } catch (error) {
        console.log(error);
        return error.reponse.data;
    }
};

export const userForgotPass = async (data) => {
    console.log('data: ', data);
    try {
        const result = await request('/account/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });
        console.log('result: ', result);
        return result.data;
    } catch (error) {
        console.log(error);
        return error.reponse.data;
    }
};
