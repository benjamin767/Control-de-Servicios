const button = document.querySelector(".btn");
const nombre = document.querySelector("#nombre");

button.addEventListener("click", e => {
    e.preventDefault();
    fetch("http://localhost:5899/rubro", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value
            })
    })
})