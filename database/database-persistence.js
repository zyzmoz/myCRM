
const createDatabase = (conn) => {
  conn.query("create table customers ( " +
    "id integer not null primary key auto_increment," +
    "doc_id varchar(15)," +
    "cpf_cnpj varchar(20)," +
    "name varchar(60)," +
    "phone varchar(20)," +
    "mobile varchar(20)," +
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

}

module.exports = createDatabase;