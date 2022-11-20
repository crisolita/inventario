import mysql from "mysql";
import util from "util";

export const database = mysql.createConnection({
  database: "ccrinventory",
  host: "192.168.100.132",
  user: "root",
  password: "example",
  multipleStatements: true,
});

database.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

export const query = util.promisify(database.query.bind(database));

export const usuarios = [
  {
    id: 1,
    usuario: "Crisol",
    password: "123456",
    documento: "2222244444",
  },
];

export const productos = [
  {
    id: 1,
    marca: "Cisco",
    modelo: "1234",
    descripcion: "asdfg",
    cantidad: 2,
  },
  {
    id: 2,
    marca: "Cisc999o",
    modelo: "129934",
    descripcion: "asd99fg",
    cantidad: 20,
  },
  {
    id: 3,
    marca: "Cisc999o",
    modelo: "129934",
    descripcion: "asd99fg",
    cantidad: 20,
  },
  {
    id: 4,
    marca: "Cisc999o",
    modelo: "129934",
    descripcion: "asd99fg",
    cantidad: 20,
  },
  {
    id: 5,
    marca: "Cisc999o",
    modelo: "129934",
    descripcion: "asd99fg",
    cantidad: 20,
  },
];
