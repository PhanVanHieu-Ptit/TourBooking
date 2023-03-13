import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './components/style/global.css';
import TourDetail from './pages/tour-detail';
import HomePage from './pages/home/index';
import {AxiosLoading} from './utils/axiosConfig';
import SignIn from './pages/sign-in';
import {ToastContainer} from 'react-toastify';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/tour-detail/:idTour' element={<TourDetail />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignIn initFormType='register' />} />
                </Routes>
            </Router>
            <ToastContainer />
            <AxiosLoading />
        </>
    );
}

export default App;
