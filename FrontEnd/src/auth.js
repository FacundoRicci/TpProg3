// Usuarios de prueba hasta que exista el BackEnd
const usuarios = [
    { email: "admin@turnos.com", password: "admin123", nombre: "Administrador" },
    { email: "facu@turnos.com", password: "facu123", nombre: "Facundo" },
];

const CLAVE = "usuario";

export function login(email, password) {
    const usuario = usuarios.find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!usuario) return null;

    const sesion = { email: usuario.email, nombre: usuario.nombre };
    localStorage.setItem(CLAVE, JSON.stringify(sesion));
    return sesion;
}

export function logout() {
    localStorage.removeItem(CLAVE);
}

export function getUsuario() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE));
    } catch {
        return null;
    }
}
