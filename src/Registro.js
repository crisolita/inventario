import { query } from "./db.js";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import "dotenv";

export const querySchemaRegistro = Joi.object({
  usuario: Joi.string().required(),
  password: Joi.string().min(8).required(),
  documento: Joi.number().required(),
});
export default async function (req, res) {
  try {
    const { usuario, password, documento } = req.body;
    let [exist] = await query(
      `SELECT usuario FROM usuarios WHERE documento = ${documento};`
    );

    if (exist) {
      return res.status(401).json({ data: "Este usuario ya esta registrado" });
    } else {
      //Encrypt user password
      const encryptedPassword = await bcryptjs.hash(password, 8);
      // Create token
      const token = jsonwebtoken.sign(
        { user_id: documento, usuario },
        "fgvirvfbwoifjwiUFEOUFNiufhshsfwhenysbsfsysjssgyssshsiwhajjajajjaajsbwvtryfneofkirfgeiufe",
        {
          expiresIn: "200h",
        }
      );

      await query(
        `INSERT INTO usuarios (usuario,password,documento,token) VALUES ("${usuario}","${encryptedPassword}","${documento}","${token}");`
      );
      //return new User
      [exist] = await query(
        `SELECT * FROM usuarios WHERE documento = ${documento};`
      );

      return res.json({ data: exist });
    }
  } catch (e) {
    return res.status(500).json({ data: e.message });
  }
}
