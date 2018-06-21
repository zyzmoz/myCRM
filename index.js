const electron = require('electron');
const mysql = require('mysql');
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
    webPreferences: { backgroundThrottling: false }
  });
  mysqlConnection.connect();
  createDatabase(mysqlConnection);
  
  console.log('Environment', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080');
  }
  

});

ipcMain.on('customers:query', async (event, str) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('SELECT * FROM CUSTOMERS', (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('customers:query:complete', query);

});