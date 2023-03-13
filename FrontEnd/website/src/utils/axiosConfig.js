import axios from 'axios';
import {Hypnosis} from 'react-cssfx-loading';
import {useState} from 'react';
import {toast} from 'react-toastify';

var displayLoading, setDisplayLoading;
function AxiosLoading() {
    const [isLoading, setIsLoading] = useState(false);
    setDisplayLoading = setIsLoading;
    displayLoading = isLoading;
    return (
        <>
            {displayLoading && (
                <div div className='loading-overlay'>
                    <Hypnosis color='var(--gold)' width='35px' height='35px' />
                </div>
            )}
        </>
    );
}

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    function (config) {
        setDisplayLoading(true);
        config.headers.Authorization = `${localStorage.getItem('Authorization')}`;
        return config;
    },
    function (error) {
        // Do something with request error
        setDisplayLoading(false);
        return toast.error(error.message);
    },
);
instance.interceptors.response.use(
    async function (response) {
        console.log(response);
        setTimeout(() => setDisplayLoading(false), 500);
        // console.log(response.headers.get('Authorization'));
        if (response.headers.get('Authorization')) {
            response.data = {...response.data, Authorization: response.headers.get('Authorization')};
        }
        response.data.data.forEach((e, i) => {
            for (let prop in e) {
                if (typeof e[prop] == 'string') {
                    if (e[prop].includes('.000Z')) {
                        response.data.data[i][prop] = e[prop].replace('T', ' ').replace('.000Z', '');
                    }
                }
            }
        });
        if (response.data.status) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        return response.data;
    },
    function (error) {
        setDisplayLoading(false);
        return toast.error(error.message);
    },
);

export {instance as axios, AxiosLoading};
