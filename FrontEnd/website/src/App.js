import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './components/style/global.css';
import TourDetail from './pages/tour-detail';
import HomePage from './pages/home/index';
import {AxiosLoading} from './utils/axiosConfig';
import SignIn from './pages/sign-in';
import {ToastContainer} from 'react-toastify';
import ManageTour from './pages/manage-tour/index';
import ManageStaff from './pages/manage-staff/index';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/tour-detail/:idTour' element={<TourDetail />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/manage-staff' element={<ManageTour />} />
                    <Route path='/manage-tour' element={<ManageStaff />} />
                    <Route path='/sign-up' element={<SignIn initFormType='register' />} />
                </Routes>
            </Router>
            <ToastContainer position='top-left' autoClose={1000} />
            <AxiosLoading />
        </>
    );
}

export default App;
