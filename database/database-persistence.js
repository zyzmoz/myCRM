const sha1 = require('crypto-js/sha1');
const createDatabase = (conn) => {
  conn.query("create table customers ( " +
    "id integer not null primary key auto_increment," +
    "doc_id varchar(15)," +
    "cpf_cnpj varchar(20)," +
    "name varchar(60)," +
    "email varchar(60)," +
    "phone varchar(60)," +
    "mobile varchar(60)," +
    "address varchar(60)," +
    "neighborhood varchar(60)," +
    "city varchar(60)," +
    "state varchar(2)," +
    "zipCode varchar(15)," +
    "birthdate date," +
    "fidelity varchar(200)," +
    "obs varchar(1000))", (error, res) => {
      if (error) {
        console.log(error);
        conn.rollback();

      }

      conn.commit((err) => {
        if (err) {
          console.log(err);
          conn.rollback();
        }
      })
    });
  
  conn.query("create table users ("+
    "id integer not null primary key auto_increment,"+
    "name varchar(60),"+
    "email varchar(60),"+
    "user varchar(60),"+
    "password varchar(60),"+
    "admin char(1))", (error, res) => {
      if (error) {
        console.log(error);
        conn.rollback();

      }

      conn.commit((err) => {
        if (err) {
          console.log(err);
          conn.rollback();
        }

        const password = sha1("Admin").toString();

        conn.query("insert into users (user, password, admin) values ('Admin', ?, 'S')", [password]);
      })
    });
}

module.exports = createDatabase;