const button = document.querySelector(".btn");
button.addEventListener("click", e => {
   e.preventDefault();
   const rubro = document.querySelector("#rubro").value;
   const empresa = document.querySelector("#empresa").value;
   const descripcion = document.querySelector("#descripcion").value;
   const metodo_de_pago = document.querySelector("#metedoDePago").value;
   const medio_de_pago = document.querySelector("#medioDePago").value;
   const moneda = document.querySelector("#moneda").value;
   const importe = document.querySelector("#importe").value;
   const estado = document.querySelector("#estado").value;
   console.log(rubro, empresa, descripcion, medio_de_pago, metodo_de_pago, moneda, importe, estado);
});
 
