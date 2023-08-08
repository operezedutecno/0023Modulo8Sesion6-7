const express = require("express")
const jwt = require("node.jwt")
const app = express()
const port = 3000

app.use(express.json())
app.listen(port, () => console.log("Servicio ejecutando"))

const secret = jwt.secret("bootcamp0023")

const usuarios = [
    { id: 1, user: "lgonzalez", password: "123456", tipo: "admin"},
    { id: 2, user: "jgutierrez", password: "654321", tipo: "user"},
    { id: 3, user: "mrodriguez", password: "123456", tipo: "user"}
]

app.post("/login", (req, res) => {
    console.log(req.body);
    const {user, password} = req.body
    const datosUsuario = usuarios.find(item => item.user === user && item.password === password)
    if(!datosUsuario) {
        return res.status(403).json({ success: false, message: "Usuario y/o contraseña incorrectos"})
    }

    const token = jwt.encode(datosUsuario, secret)
    res.json({ success: true, message: "Autenticación exitosa", token: token})
})


app.post("/datos-usuario", (req, res) => {
    const token = req.headers.authorization
    const datos = jwt.decode(token, secret)
    if(datos.code !== '000') {
        return res.status(403).json({ success: false, message: "token inválido"})
    }
    res.json({ success: true, message: "Datos de usuario", data: datos.payload })
})