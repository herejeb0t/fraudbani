import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Sin token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; // aquí guardamos el payload del JWT
    next(); // ✅ deja continuar a la ruta
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export default auth