const button = document.querySelector(".btn");
const rubro = document.querySelector("#rubro");
const empresa = document.querySelector("#empresa");
const descripcion = document.querySelector("#descripcion");
const metodo_de_pago = document.querySelector("#metedoDePago");
const medio_de_pago = document.querySelector("#medioDePago");
const moneda = document.querySelector("#moneda");
const importe = document.querySelector("#importe");
const estado = document.querySelector("#estado");
const vencimiento = document.querySelector("#vencimiento");
const periodo = document.querySelector("#periodo");

document.addEventListener('DOMContentLoaded', async () => {
   try {
      const responseRubros = await fetch('http://localhost:5899/rubro');
      let rubros = await responseRubros.json();
      const responseEmpresa = await fetch("http://localhost:5899/empresa");
      let empresas = await responseEmpresa.json();

      empresas = empresas.map((empresa) => {
         let option =  document.createElement('option');
         option.value = empresa.nombre;
         option.textContent = empresa.nombre;
         console.log(option);
         return option;
      });

      rubros = rubros.map((rubro) => {
         let option =  document.createElement('option');
         option.value = rubro.nombre;
         option.textContent = rubro.nombre;
         console.log(option);
         return option;
      });
      
      empresas = empresas.map(elemento => elemento.outerHTML).join('');
      empresa.insertAdjacentHTML('beforeend', empresas);
      rubros = rubros.map(elemento => elemento.outerHTML).join('');
      rubro.insertAdjacentHTML('beforeend', rubros);
   } catch (error) {
      console.error(error);
   }
 });

button.addEventListener("click", e => {
   e.preventDefault();
   fetch("http://localhost:5899/services", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
         rubro: rubro.value,
         empresa: empresa.value,
         descripcion: descripcion.value,
         periodo: periodo.value,
         metodo_de_pago: metodo_de_pago.value,
         medio_de_pago: medio_de_pago.value,
         vencimiento: vencimiento.value,
         moneda: moneda.value,
         importe: importe.value,
         estado: estado.value
      }),
   }).then(() => console.log("Estamos bien, estamos bien"))
   .catch(() => console.log(error.message));
});