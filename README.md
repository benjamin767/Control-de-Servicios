Control de Servicios: 
Es una aplicacion de escritorio para poder llevar un control de las boletas de servicios (internet, agua, luz, gas, etc). 
En el cual tiene una api con rutas para manipular datos de una BBDD. 
Si bien es un aplicacion de escritorio no realice los pasos para crear el installer correspondiente, 
asi que esta aplicacion funciona solo si lo usuamos en su formato de desarrollo que lo voy a explicar mas abajo.

La aplicacion esta compuesta principalmente por las siguientes tecnologias: 
Back-End: 
  - Express.JS
  - PostgreSQL con Sequelize
  - Googleapis
Front-End:
  - Electron.JS
  - Bootstrap 5

Antes de empezar a utilizar la aplicacion, se debe configurar en la carpeta api (back-end) el archivo .env con lo siguientes datos: 
  - DB_USER: Se debe tener instalado la bbdd de PostgreSQL para ingresar usuario del mismo
  - DB_NAME: El nombre de la bbdd
  - DB_HOST: Por lo general utilizamos el "localhost"
  - DB_PASSWORD: La contraseña de la BBDD PostgreSQL
  - EMAIL_USER: Una direccion de correo electronico GMAIL
  - EMAIL_PASS: Aqui debemos ir a la configuraciones de la cuenta GMAIL para crear un Password para aplicaciones
  - REFRESH_TOKEN: Es un token otorgado por las aplicaciones de Google Cloud
  - CLIENT_ID: El client ID de la aplicaion de Google Cloud
  - CLIENT_SECRET: Tambien es otorgado por la aplicacion de Google Cloud 
  - REDIRECT_URL: es el redireccionamiento luego de conectar con Google por defecto es: http://localhost:5899/google/redirect
  - API_KEY: Se debe crear junto con la plicacion que devuelve los datos como: REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET
*Si algunos de estos datos se les dificulta conseguirlos hablenme por <a href="https://www.linkedin.com/in/benjamin-mi%C3%B1o-814842170/">Linkedin</a> y les envio los datos que requieran para configurar el archivo .env*

Una vez configurado el archivo .env, iniciamos la api abriendo una terminal en la direccion ubicacion/de/la/carpeta/Api/src, con el comando "npm start" damos inico a la API

La aplicacion es simple, abrimos una terminal en la direccion "ubicacion/de/la/carpeta/Client/src" y con el comando "npm start" damos inicio a la APP.
Para programar los recordatorios de google calendar y gmail, se debe cargar los datos de la boleta que desean llevar un control, 
para esto conectamos la app con una cuenta de Google para utilizar calendario y gmail, puesto que asi nos permite programar un evento para recordar 
el vencimiento de la boleta y un mail que llegara un dia antes del vencimiento.
Los datos que la APP te pide para cargar una boleta son los siguientes: 
  - Numero de boleta
  - Empresa: se debe crear dentro del menu superior de "file" y luego elegir "Agregar una nueva Empresa"
  - Rubro: se debe crear dentro del menu superior de "file" y luego elegir "Agregar un nuevo Rubro"
  - Una descripcion si se quiere
  - Las formas de pago
  - Importe
  - Estado
Una vez rellenado el formulario con los datos correspondientes se debe dar a guardar y asi creamos el recordatorio y programamos un mail para que nos llegue un dia antes del vencimiento.
