import './style.css';
import MainBackground from '../../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import MainDetail from './MainDetail';
import Heading from './Heading';
import SubDetail from './SubDetail';

function TourDetail({children}) {
    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <MainDetail></MainDetail>
                <Heading></Heading>
                <SubDetail></SubDetail>
            </main>
        </DefaultClientLayout>
    );
}

export default TourDetail;
