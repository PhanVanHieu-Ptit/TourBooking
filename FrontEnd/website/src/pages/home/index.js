import './style.css';
import SearchTour from './SearchTour';
import FeaturedTour from './FeaturedTour';
import MainBackground from '../../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import helloSvg from '../../assets/svg/hello.svg';
function HomePage() {
    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <img src={helloSvg} className='main-heading' />
                <SearchTour></SearchTour>
                <FeaturedTour></FeaturedTour>
            </main>
        </DefaultClientLayout>
    );
}

export default HomePage;
