import { getConnection } from "../database/database.js";
import { request, response } from "express";
import { v4 as uuidv4 } from 'uuid';

const getCate = async (req = request, res = response) => {
    try {

        //creacion de la la conexion
        const connection = await getConnection();

        const [cate] = await connection.query('SELECT * FROM categorias')

        res.status(200).json({ ok: true, result: cate, msg: 'Approved' });

    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Some error' })
    }
};

const createCate = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const { nombre } = req.body;
        const id = uuidv4();
        if (!nombre) {
            return res.status(400).json({ ok: false, msg: 'Falta el nombre de la categoría' });
        }

        const [nomE] = await connection.query('SELECT id FROM categorias WHERE nombre = ?',
            [nombre]
        );
        if (nomE.length > 0) {
            res.status(400).json({ msg: 'Categoría ya existe', id: existing[0].id });
        } else {
            const [cate] = await connection.query('INSERT INTO categorias (id,nombre) VALUES (?,?)', [id, nombre])

            res.status(200).json({ msg: 'Creado con exito' });
        }

    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Error al crear categoría',  })
    }
}

export const cateController = { getCate, createCate };