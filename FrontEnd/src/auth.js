const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CLAVE = "usuario";

// Hace un pedido a la API y devuelve el JSON, o lanza un Error con el mensaje del BackEnd
export async function pedir(ruta, { method = "GET", datos } = {}) {
    let respuesta;
    try {
        respuesta = await fetch(`${API_URL}${ruta}`, {
            method,
            headers: datos ? { "Content-Type": "application/json" } : undefined,
            body: datos ? JSON.stringify(datos) : undefined,
        });
    } catch {
        throw new Error("No se pudo conectar con el servidor.");
    }

    const json = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok) {
        throw new Error(json.mensaje || "Ocurrió un error inesperado.");
    }
    return json;
}

export async function login(email, password) {
    const usuario = await pedir("/cuentas/login", {
        method: "POST",
        datos: {
            email: email.trim().toLowerCase(),
            password,
        },
    });

    localStorage.setItem(CLAVE, JSON.stringify(usuario));
    return usuario;
}

// Crea la cuenta y después inicia sesión automáticamente
export async function registrar(datos) {
    const email = datos.email.trim().toLowerCase();
    await pedir("/cuentas/registroCliente", { method: "POST", datos: { ...datos, email } });
    return login(email, datos.password);
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
