import Banner from '../Components/Banner';
import GridCardServicio from '../Components/GridCardServicio';
import Contacto from '../Components/Contacto';
import Nosotros from '../Components/Nosotros';
import TurnosProfesional from '../Components/TurnosProfesional';
import { getUsuario } from '../auth.js';


function Home() {
    const usuario = getUsuario();

    if (usuario?.rol === 'PROFESIONAL') {
        return <TurnosProfesional profesionalId={usuario.profesional_id} />;
    }

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
