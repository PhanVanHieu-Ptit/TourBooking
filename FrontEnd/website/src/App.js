import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TourDetail from './pages/tour-detail';
import HomePage from './pages/home/index';
import DefaultLayout from './layouts/client';
import axios from './utils/axiosConfig';

function App() {
  axios
    .get('/tour/list')
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

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
