import MainBackground from '../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import MainDetail from './MainDetail';
import Heading from './Heading';
import SubDetail from './SubDetail';
import {useParams} from 'react-router-dom';
import {useState, useEffect, useMemo} from 'react';
import {getTour} from '../../utils/services';
function TourDetail({children}) {
    const {idTour} = useParams();
    const [tour, setTour] = useState([]);
    useEffect(() => {
        getTour(idTour).then((rs) => setTour(rs.data));
    }, []);
    const memoizedOptions = useMemo(() => tour, [tour]);
    console.log(memoizedOptions);
    if (memoizedOptions.length == 0) {
        return <p>Không tìm thấy tour</p>;
    }
    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <MainDetail memoizedOptions={memoizedOptions[0]}></MainDetail>
                <Heading memoizedOptions={memoizedOptions[0]}></Heading>
                <SubDetail memoizedOptions={memoizedOptions[0]}></SubDetail>
            </main>
        </DefaultClientLayout>
    );
}

export default TourDetail;
