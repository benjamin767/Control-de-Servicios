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
        width: 400,
        height: 330,
        title: "Control de Servicios"
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true,
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

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
    const newTicketWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: "Cargar una nueva Boleta"
    });
    // newTicketWindow.setMenu(null);
    newTicketWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/newTicket.html"),
        protocol: "file",
        slashes: true,
    }));
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