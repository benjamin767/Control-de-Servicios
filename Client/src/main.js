const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");
const { electron } = require("process"); 

if(process.env.NODE_ENV != "production") {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    });
}

let mainWindow

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Control de Servicios",
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/views/index.html`);

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
        app.quit();
    });
});

const templateMenu = [
    {
        label: "file",
        submenu: [
            {
                label: "Crear boleta nueva",
                accelerator: "Ctrl+N",
                click() {
                    createNewTicketWindow()
                }
            },
            {
                label: "Conectar con Google",
                accelerator: "Ctrl+G",
                click() {
                    connectionWithGoogle()
                }
            },
            {
                label: "Agregar una nueva Empresa",
                accelerator: "Ctrl+E",
                click() {
                    createEmpresa()
                }
            },
            {
                label: "Agregar un nuevo Rubro",
                accelerator: "Ctrl+R",
                click() {
                    createRubro()
                }
            },
            {
                label: "Salir",
                accelerator: process.platform === "darwin" ? "command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    },
];

function createNewTicketWindow() {
    // newTicketWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/newTicket.html"),
        protocol: "file",
        slashes: true,
    }));
}

function createEmpresa() {
    // newTicketWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/newEmpresa.html"),
        protocol: "file",
        slashes: true,
    }));
}

function createRubro() {
    // newTicketWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/newRubro.html"),
        protocol: "file",
        slashes: true,
    }));
}

function connectionWithGoogle() {
    mainWindow.loadURL('http://localhost:5899/google');
}

if(process.platform === "darwin") {
    templateMenu.unshift({
        label: app.getName()
    })
}

if(process.env.NODE_ENV !== "production") {
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide Dev Tools",
                accelerator: "Ctrl+D",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: "reload",
            }
        ]
    });
}