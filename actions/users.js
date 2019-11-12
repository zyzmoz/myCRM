const query = async (event, str, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from users', (error, results) => {
      if (error) throw error;
      resolve(results);
    });
  });
  mainWindow.webContents.send('users:query:complete', query);
};
const sha1 = require('crypto-js/sha1');

const get = async (event, id, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from users where id = ?', [id], (error, results) => {
      if (error) throw error;
      resolve(results[0]);
    });
  });
  mainWindow.webContents.send('users:get:complete', query);
};

const remove = async (event, id, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('delete from users where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('users:delete:complete', query);

};

const create = async (event, user, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    const password = sha1(user.password).toString();
    mysqlConnection.query('insert into USERS (name, email, phone, mobile, user, password, manager)' +
      'values (?,?,?,?,?,?,?)', [
        user.name, user.email, user.phone, user.mobile, user.user, password, user.manager

      ], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
  });
  mainWindow.webContents.send('users:create:complete', query);
};

const update = async (event, user, mainWindow, mysqlConnection) => {
  var query = await new Promise((resolve) => {
    let password = '';
    if (user.password1 !== '') {
      password = sha1(user.password1).toString();
    } else {
      password = user.password
    }

    mysqlConnection.query('update USERS set name = ?, email = ?, phone = ?, mobile = ?,' +
      'user = ?, password = ?, manager = ? where id = ?', [
        user.name, user.email, user.phone, user.mobile, user.user, password, user.manager,
        user.id
      ], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
  });
  mainWindow.webContents.send('users:update:complete', query);
};

const login = async (event, userData, mysqlConnection, mainWindow) => {
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
};

module.exports = {
  query,
  get,
  update, 
  remove,
  create, 
  login
}