import { query } from "./db.js";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import "dotenv";
export const querySchemaLogin = Joi.object({
  documento: Joi.number().required(),
  password: Joi.string().min(8).required(),
});
export default async function (req, res) {
  try {
    const { documento, password } = req.body;
    let [exist] = await query(
      `SELECT * FROM usuarios WHERE documento = ${documento};`
    );
    const usuario = exist.usuario;

    if (exist && (await bcryptjs.compare(password, exist.password))) {
      // Create token
      const token = jsonwebtoken.sign(
        { user_id: documento, usuario },
        "fgvirvfbwoifjwiUFEOUFNiufhshsfwhenysbsfsysjssgyssshsiwhajjajajjaajsbwvtryfneofkirfgeiufe",
        {
          expiresIn: "200h",
        }
      );
      const some = await query(
        `UPDATE usuarios SET token="${token}" WHERE documento=${documento};`
      );
      [exist] = await query(
        `SELECT * FROM usuarios WHERE documento = ${documento};`
      );
      res.status(200).json({ data: exist });
    } else {
      res.status(401).json({ data: "Usuario o contraseña inválido." });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
}
