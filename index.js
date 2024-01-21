// BASE DE DATOS
const BBDD = [
    {
        usuario: "aure",
        contraseña: "1234"
    },
    {
        usuario: "valetin",
        contraseña: "091290"
    },
    {
        usuario: "benjapuente",
        contraseña: "211120"
    },
    {
        usuario: "leoenla",
        contraseña: "gatito123"
    }
];

// VARIABLES DOM
const botonIniciar = document.getElementById("login-button");
const contenedor = document.getElementById("contenedor");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

//VERIFICAMOS SI YA EXISTE UN LOGEO
const isLog = JSON.parse(localStorage.getItem("isLog")) || {};

//FUNCION PARA PINTAR HTML
const miCuenta = (usuario) => {
    contenedor.innerHTML = `<h1>Bienvenido de nuevo, ${usuario}.</h1>`;
};

//EJECUCION DE LA FUNCION SI EL LOGEO ESTÁ VERIFICADO
isLog.usuario && miCuenta(isLog.usuario)

//EVENTO PARA EL BOTÓN DE INICIO DE SESION
botonIniciar.addEventListener("click", () => {
    const usuario = usernameInput.value;
    const contraseña = passwordInput.value;
    //METODO PARA ENCONTRAR COINCIDENCIAS EN EL ARRAY DE OBJETOS
    const Existe = BBDD.find((miembro) => {
        return miembro.usuario === usuario && miembro.contraseña === contraseña;
    });
    //CONDICIONAL EN EL CASO DE HABER ENCONTRADO O NO LA COINCIDENCIA
    if (Existe) {
        localStorage.setItem("isLog", JSON.stringify({ usuario: usuario }));
        miCuenta(usuario);
    } else {
        contenedor.innerHTML = '<h1>Usuario no encontrado</h1>';
    }
});