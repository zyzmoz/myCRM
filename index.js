const electron = require('electron');
const mysql = require('mysql');
const request = require('request');
const sha1 = require('crypto-js/sha1');


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
  // mysqlConnection.connect();


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
    mysqlConnection.query('update CUSTOMERS set doc_id =?, cpf_cnpj=?, name=?, birthdate=?, phone=?, mobile=?, email=?, ' +
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

ipcMain.on('customers:delete', async (event, id) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('delete from CUSTOMERS where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('customers:delete:complete', query);

});

ipcMain.on('users:query', async (event, str) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from users', (error, results) => {
      if (error) throw error;
      resolve(results);
    });
  });
  mainWindow.webContents.send('users:query:complete', query);
});

ipcMain.on('users:get', async (event, id) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from users where id = ?', [id], (error, results) => {
      if (error) throw error;
      resolve(results[0]);
    });
  });
  mainWindow.webContents.send('users:get:complete', query);
});

ipcMain.on('users:delete', async (event, id) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('delete from users where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('users:delete:complete', query);

});

ipcMain.on('auth:login', async (event, userData) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from USERS where user = ?', [userData.usr], (error, results, fields) => {
      if (error) throw error;
      let auth = { authenticated: false, error: 'User not found' };
      if (results.length > 0) {
        if (results[0].password === sha1(userData.pwd).toString()) {
          auth = { ...auth, ...results[0], authenticated: true, error: null };
        } else {
          auth = { ...auth, error: 'Wrong password' };
        }
      }
      resolve(auth);
    });
  });

  mainWindow.webContents.send('auth:login:complete', query);

});
