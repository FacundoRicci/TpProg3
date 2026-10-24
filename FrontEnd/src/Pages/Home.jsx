import Banner from '../Components/Banner';
import GridCardServicio from '../Components/GridCardServicio';
import Contacto from '../Components/Contacto';
import Nosotros from '../Components/Nosotros';


function Home() {
    return (
        <>
        <Banner />
        <Nosotros />
        <GridCardServicio />
        <Contacto />
        </>
    )
}

export default Home;
