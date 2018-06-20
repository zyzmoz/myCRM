const electron = require('electron');
const mysql = require('mysql');
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
    height: 600,
    width: 800,
    webPreferences: { backgroundThrottling: false }
  });
  mysqlConnection.connect();
  // mysqlConnection.query('CREATE TABLE CUSTOMERS (ID integer not null primary key AUTO_INCREMENT )', (error, res)=> {
  //   if (error){
  //     console.log(error);
  //     mysqlConnection.rollback();   
  //     throw error;         
  //   }

  //   mysqlConnection.commit((err) => {
  //     if (err){
  //       console.log(err);
  //       mysqlConnection.rollback();      
  //     }  
  //   })
  // })
  mainWindow.loadURL('http://localhost:8080' || `file://${__dirname}/dist/index.html`);
});

ipcMain.on('customers:query', async (event, str) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('SELECT * FROM CUSTOMERS', (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('customers:query:complete', query);

})