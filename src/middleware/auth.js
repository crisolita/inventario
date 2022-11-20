import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Token requerido.");
  }
  try {
    const decoded = jsonwebtoken.verify(
      token,
      "fgvirvfbwoifjwiUFEOUFNiufhshsfwhenysbsfsysjssgyssshsiwhajjajajjaajsbwvtryfneofkirfgeiufe"
    );
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token inválido.");
  }
  return next();
};
