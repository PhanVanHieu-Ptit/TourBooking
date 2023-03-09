import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import TourDetail from './pages/tour-detail';
// import HomePage from './pages/home/index';
import axios from './utils/axiosConfig';
import SignIn from './pages/sign-in';

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path='/' element={<HomePage />} /> */}
                {/* <Route path='/tour-detail' element={<TourDetail />} /> */}
                <Route path='/sign-in' element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
