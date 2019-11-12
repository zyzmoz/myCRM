const query = async (event, options, mysqlConnection, mainWindow) => {
  const { str, starting } = options;
  let query = await new Promise((resolve) => {
    if (str && str !== '') {
      mysqlConnection.query("SELECT * FROM CUSTOMERS where name like '%" + str + "%' limit 10 offset ?", [starting], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    } else {
      mysqlConnection.query('SELECT * FROM CUSTOMERS limit 10 offset ?', [starting], (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    }
  });

  let pages = await new Promise((resolve) => {
    if (str && str !== '') {
      mysqlConnection.query("SELECT count(id) as PAGES FROM CUSTOMERS where name like '%" + str + "%'", (error, results) => {
        if (error) throw error;
        const numPages = results[0].PAGES / 10;
        resolve(numPages);
      });
    } else {
      mysqlConnection.query("SELECT count(id) as PAGES FROM CUSTOMERS", (error, results) => {
        if (error) throw error;
        const numPages = results[0].PAGES / 10;
        resolve(numPages);
      });
    }
  });

  let response = {
    data: query,
    pages: pages
  }

  mainWindow.webContents.send('customers:query:complete', response);


};

const get = async (event, id, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('select * from CUSTOMERS where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results[0]);
    });
  });

  mainWindow.webContents.send('customers:get:complete', query);

};

const create = async (event, customer, mysqlConnection, mainWindow) => {
  let birthdate = customer.birthdate != '' ? customer.birthdate : null;
  var query = await new Promise((resolve) => {
    mysqlConnection.query('insert into CUSTOMERS (doc_id, cpf_cnpj, name, birthdate, phone, mobile, email, address, neighborhood, city, state, fidelity, obs, zipCode)' +
      'values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
      customer.doc_id, customer.cpf_cnpj, customer.name, birthdate, customer.phone,
      customer.mobile, customer.email, customer.address, customer.neighborhood, customer.city,
      customer.state, customer.fidelity, customer.obs, customer.zipCode
    ], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
  mainWindow.webContents.send('customers:create:complete', query);
};

const update = async (event, customer, mysqlConnection, mainWindow) => {
  let birthdate = customer.birthdate != '' ? customer.birthdate : null;
  var query = await new Promise((resolve) => {
    mysqlConnection.query('update CUSTOMERS set doc_id =?, cpf_cnpj=?, name=?, birthdate=?, phone=?, mobile=?, email=?, ' +
      'address=?, neighborhood=?, city=?, state=?, fidelity=?, obs=?, zipCode = ? where id=?', [
      customer.doc_id, customer.cpf_cnpj, customer.name, birthdate, customer.phone,
      customer.mobile, customer.email, customer.address, customer.neighborhood, customer.city,
      customer.state, customer.fidelity, customer.obs, customer.zipCode, customer.id
    ], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
  mainWindow.webContents.send('customers:update:complete', query);
};

const remove = async (event, id, mysqlConnection, mainWindow) => {
  var query = await new Promise((resolve) => {
    mysqlConnection.query('delete from CUSTOMERS where id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });

  mainWindow.webContents.send('customers:delete:complete', query);

};

module.exports = {
  query,
  get,
  update,
  remove,
  create
}