import { query } from "./db.js";
import Joi from "joi";
export const querySchemaExistencia = Joi.object({
  producto_id: Joi.string().required(),
  serial: Joi.string().required(),
  descripcion: Joi.string().required(),
  bien_publico: Joi.string().required(),
});
export default async function (req, res) {
  try {
    const { producto_id, descripcion, serial, bien_publico } = req.body;
    await query(
      `INSERT INTO existencia_productos (producto_id,descripcion,serial,bien_publico) VALUES ("${producto_id}","${descripcion}","${serial}","${bien_publico}") ;`
    );
    const list = await query(`SELECT * FROM existencia_productos;`);
    return res.json({ data: list });
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
