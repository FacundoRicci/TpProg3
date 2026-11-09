import Banner from '../Components/Banner';
import GridCardServicio from '../Components/GridCardServicio';
import Contacto from '../Components/Contacto';
import Nosotros from '../Components/Nosotros';
import TurnosProfesional from '../Components/TurnosProfesional';
import Admin from './Admin.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';


function Home() {
    const { usuario } = useUsuario();

    if (usuario?.rol === 'ADMINISTRADOR') {
        return <Admin />;
    }

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
