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
    webPreferences: { backgroundThrottling: false },
    resizable: false,
    maximizable: false,
    show: false
  });
  mainWindow.maximize();
  mainWindow.show();
  mysqlConnection.connect();
  createDatabase(mysqlConnection);
  

  console.log('Environment', process.env.NODE_ENV);
  // if (process.env.NODE_ENV === 'production') {
  //   mainWindow.setMenu(null);
  //   mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  // } else {
  //   mainWindow.loadURL('http://localhost:8080');    
  // }
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());


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

ipcMain.on('customers:get', async (event, id) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from CUSTOMERS where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results[0]);
    });
  });

  mainWindow.webContents.send('customers:get:complete', query);

});

ipcMain.on('customers:create', async (event, customer) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('insert into CUSTOMERS (doc_id, cpf_cnpj, name, birthdate, phone, mobile, email, address, neighborhood, city, state, fidelity, obs)' +
      'values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        customer.doc_id, customer.cpf_cnpj, customer.name, customer.birthdate, customer.phone, 
        customer.mobile, customer.email, customer.address, customer.neighborhood, customer.city, 
        customer.state, customer.fidelity, customer.obs
      ], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
  });
  mainWindow.webContents.send('customers:create:complete', query);
});

ipcMain.on('customers:update', async (event, customer) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('update CUSTOMERS set doc_id =?, cpf_cnpj=?, name=?, birthdate=?, phone=?, mobile=?, email=?, '+
        'address=?, neighborhood=?, city=?, state=?, fidelity=?, obs=? where id=?', [
        customer.doc_id, customer.cpf_cnpj, customer.name, customer.birthdate, customer.phone, 
        customer.mobile, customer.email, customer.address, customer.neighborhood, customer.city, 
        customer.state, customer.fidelity, customer.obs, customer.id
      ], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
  });
  mainWindow.webContents.send('customers:update:complete', query);
});