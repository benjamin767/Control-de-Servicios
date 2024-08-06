const button = document.querySelector(".btn");
const nombre = document.querySelector("#nombre");
const modalText = document.querySelector(".modal-body");

button.addEventListener("click", e => {
    e.preventDefault();
    fetch("http://localhost:5899/empresa", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value
            })
    }).then(res => {
        if (res.status === 400 || res.status === 404) modalText.textContent = "Ups, algo salio mal :|";
        else modalText.textContent = "Empresa creada y guardada! :)";
    }).catch(error => {
        modalText.textContent = "Ups, algo salio mal :|";
        console.log(error);
    });
})

document.getElementById("advertenciaModal").addEventListener("hidden.bs.modal", function() {
    // Vaciar los campos del formulario
    const formulario = document.querySelector("form");
    const campos = formulario.querySelectorAll("input, select");
    campos.forEach(function(campo) {
       campo.value = '';
    });
    modalText.textContent = "Cargando solicitud...";
});