import { getConnection } from "../database/database.js";
import { request, response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const getUsers = async (req = request, res = response) => {
    try {

        //creacion de la la conexion
        const connection = await getConnection();

        const [users, fields] = await connection.query('SELECT * FROM usuarios')

        res.status(200).json({ ok: true, result: users, msg: 'Approved' });

    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Some error' })
    }
};
const createUser = async (req = request, res = response) => {
    try {
        //creacion de la la conexion
        const connection = await getConnection();
        const id = uuidv4(); // genera un UUID
        const { nombre, email, password } = req.body; //cramos la constante nombre, email que vamos a insertar ala base de datos

        if (!nombre || !email || !password) { // si alguno de estos datos falta devuelve un error de que faltan datos
            return res.status(400).json({ ok: false, msg: "Faltan datos" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // creamos una constante el cual encriptara la contraseña

        await connection.query( //se realiza la consulta la cual ingresa los valores a la base de datos
            "INSERT INTO usuarios (id,nombre, email, password) VALUES (?, ?, ?,?)",
            [id, nombre, email, hashedPassword] //se ingresa el nombre, email y la contraseña encriptada
        );

        res.status(201).json({ ok: true, msg: "Usuario creado con contraseña segura" });

    } catch (err) {
        console.error(err); // Mostralo en consola
        res.status(500).json({
            ok: false,
            err: err.message || err, // Esto mostrará el error en la respuesta
            msg: "Error al crear usuario"
        });
    }
};

const updateUser = async (req = request, res = response) => {

}



export const usersController = { getUsers, createUser };