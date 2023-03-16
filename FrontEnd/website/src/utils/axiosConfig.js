import axios from 'axios';
import {Hypnosis} from 'react-cssfx-loading';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

var displayLoading, setDisplayLoading;
function AxiosLoading() {
    const [isLoading, setIsLoading] = useState(false);
    setDisplayLoading = setIsLoading;
    displayLoading = isLoading;
    return (
        <>
            {displayLoading && (
                <div className='loading-overlay'>
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
        console.log('Call API: ' + config.url);
        setDisplayLoading(true);
        config.headers.Authorization = localStorage.token;
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
        setTimeout(() => setDisplayLoading(false), 500);
        // console.log(response.headers.get('Authorization'));
        if (response.headers.get('Authorization')) {
            response.data = {...response.data, Authorization: response.headers.get('Authorization')};
        }

        //fix lại ngày
        if (response.data.data)
            response.data.data.forEach((e, i) => {
                for (let prop in e) {
                    if (typeof e[prop] == 'string') {
                        if (e[prop].includes('.000Z')) {
                            response.data.data[i][prop] = e[prop].replace('T', ' ').replace('.000Z', '');
                        }
                    }
                }
            });

        //toast message
        if (response.data.status) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        //token hết hạn thì rediect về trang đăng nhập
        if (response.data.message && response.data.message.includes('Token')) {
            window.location.href = '/sign-in';
        }
        return response.data;
    },
    function (error) {
        setDisplayLoading(false);
        return toast.error(error.message);
    },
);

export {instance as axios, AxiosLoading};