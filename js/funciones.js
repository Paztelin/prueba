setTimeout(() => {
    // Ya se ha cargado header.html, así que puedes asignar eventos
    const boton = document.querySelector('#step1 button');
    if (boton) {
        boton.onclick = mostrarConfirmacion;
    }
}, 300); // espera 300ms (puedes ajustar si hace falta)

function mostrarConfirmacion() {
    const contenedor = document.getElementById("step1");

    // Elimina el botón actual
    contenedor.innerHTML = "";

    // Crear el mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = "¿Deseas iniciar el proceso de pago de propinas?";
    contenedor.appendChild(mensaje);

    // Botón "Sí"
    const botonSi = document.createElement("button");
    botonSi.textContent = "Sí";
    botonSi.style.marginRight = "10px";
    botonSi.onclick = function () {
        contenedor.innerHTML = ""; // Limpia la confirmación
        iniciarProceso(); // Función siguiente
    };
    contenedor.appendChild(botonSi);

    // Botón "No"
    const botonNo = document.createElement("button");
    botonNo.textContent = "No";
    botonNo.onclick = function () {
    };
    contenedor.appendChild(botonNo);
}

function iniciarProceso() {
    // Aquí pones lo que sigue después del "Sí"
    const contenedor = document.getElementById("step1");
    const mensaje = document.createElement("p");
}