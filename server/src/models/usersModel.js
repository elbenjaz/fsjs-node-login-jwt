import pool from "../../database/connection.js";
import bcript from "bcryptjs";

const getUser = async ({ email }) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const usuario = await getUsers({ email });

    return usuario ? usuario[0] : false;
};

const getUsers = async ({ email }) => {
    try {
        const where = []
        const values = [];

        let sql = `
            SELECT 
                id,
                email,
                password,
                rol,
                lenguage
            FROM
                usuarios`;

        if (email) {
            where.push(`email = $${values.length + 1}`);
            values.push(email);
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }

        const users = await pool.query(sql, values);
        
        return users.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createUser = async ({ email, password, rol, lenguage }) => {
    if (!email || !password || !rol || !lenguage) {
        throw new Error("Required parameters are missing");
    }

    try {
        const sql = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";

        const result = await pool.query(sql, [
            email,
            bcript.hashSync(password),
            rol,
            lenguage
        ]);

        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const usersModel = { getUser, getUsers, createUser };
