

const insert = async (event, user, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {


    mysqlConnection.query('', [], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
  mainWindow.webContents.send('users:update:complete', query);
}

module.exports = {
  insert
}