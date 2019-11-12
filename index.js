const electron = require('electron');
const mysql = require('mysql');
const request = require('request');
const customers = require('./actions/customers');
const orders = require('./actions/orders');
const users = require('./actions/users');


const createDatabase = require('./database/database-persistence');
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myCRM'
};

const mysqlConnection = mysql.createConnection(mysqlConfig);

const { app, BrowserWindow, ipcMain } = electron;


let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: { backgroundThrottling: false },
    resizable: false,
    maximizable: false,
    show: false
  });
  mainWindow.maximize();
  mainWindow.show();
  createDatabase(mysqlConnection);  


  request('http://localhost:8080', (err, resoponse, body) => {
    if (!err && resoponse.statusCode == 200) {
      mainWindow.loadURL('http://localhost:8080/');
      mainWindow.webContents.openDevTools();


    } else {
      mainWindow.setMenu(null);
      mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    }
  });

  mainWindow.on('closed', () => app.quit());
});

//Customers
ipcMain.on('customers:query', async (event, options) => customers.query(event, options, mysqlConnection, mainWindow));

ipcMain.on('customers:get', async (event, id) => customers.get(event, id, mysqlConnection, mainWindow ));

ipcMain.on('customers:create', async (event, customer) => customers.create(event, customer, mysqlConnection, mainWindow));

ipcMain.on('customers:update', async (event, customer) => customers.update(event, customer, mysqlConnection, mainWindow));

ipcMain.on('customers:delete', async (event, id) => customers.remove(event, id, mysqlConnection, mainWindow));

//Users
ipcMain.on('users:query', async (event, str) => users.query(event, str, mysqlConnection, mainWindow));

ipcMain.on('users:delete', async (event, id) => users.remove(event, id, mysqlConnection, mainWindow));

ipcMain.on('users:create', async (event, user) => users.create(event, user, mysqlConnection, mainWindow));

ipcMain.on('users:update', async (event, user) => users.update(event, user, mysqlConnection, mainWindow));

ipcMain.on('auth:login', async (event, userData) => users.login(event, userData, mysqlConnection, mainWindow));

//Orders
ipcMain.on('orders:insert', async (event, orderData) => orders.insert(event, orderData, mysqlConnection, mainWindow));
