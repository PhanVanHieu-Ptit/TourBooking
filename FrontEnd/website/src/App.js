import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TourDetail from './pages/tour-detail';
import HomePage from './pages/home/index';
import DefaultLayout from './layouts/client';
import axios from './utils/axiosConfig';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <DefaultLayout>
                <HomePage />
              </DefaultLayout>
            }
          />
          <Route
            path='/tour-detail'
            element={
              <DefaultLayout>
                <TourDetail />
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
