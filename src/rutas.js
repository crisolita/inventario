import EditarExistencia, {
  querySchemaEditExistencia,
} from "./EditarExistencia.js";
import EliminarProducto, {
  querySchemaDeleteProducto,
} from "./EliminarProducto.js";
import NuevoProducto, { querySchemaProducto } from "./NuevoProducto.js";
import Registro, { querySchemaRegistro } from "./Registro.js";
import Joivalidator from "express-joi-validation";
import Login, { querySchemaLogin } from "./Login.js";
const validator = Joivalidator.createValidator();
import { verifyToken } from "./middleware/auth.js";
import MostrarProductos from "./MostrarProductos.js";
import inventario from "./inventario.js";
import NuevaExistencia from "./NuevaExistencia.js";
const rutas = [
  {
    method: "post",
    route: "/api/registro",
    handler: Registro,
    querySchema: querySchemaRegistro,
  },
  {
    method: "post",
    route: "/api/productos",
    handler: NuevoProducto,
    querySchema: querySchemaProducto,
    auth: true,
  },
  {
    method: "delete",
    route: "/api/productos/eliminar",
    handler: EliminarProducto,
    querySchema: querySchemaDeleteProducto,
    auth: true,
  },
  {
    method: "put",
    route: "/api/productos/existencia",
    handler: EditarExistencia,
    querySchema: querySchemaEditExistencia,
    auth: true,
  },
  {
    method: "post",
    route: "/api/login",
    handler: Login,
    querySchema: querySchemaLogin,
  },
  {
    method: "get",
    route: "/api/productos",
    handler: MostrarProductos,
    auth: true,
  },
  {
    method: "get",
    route: "/api/inventario",
    handler: inventario,
    auth: true,
  },
  {
    method: "post",
    route: "/api/productos/existencia",
    handler: NuevaExistencia,
    auth: true,
  },
];

export function registraRutas(app) {
  rutas.forEach(({ method, route, handler, querySchema, auth }) => {
    if (querySchema) {
      app[method](
        route,
        auth ? verifyToken : (req, res, next) => next(),
        validator.body(querySchema),
        handler
      );
    } else {
      app[method](
        route,
        auth ? verifyToken : (req, res, next) => next(),
        handler
      );
    }
  });
}
