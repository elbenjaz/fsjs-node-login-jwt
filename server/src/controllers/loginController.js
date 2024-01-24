import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import {usersModel} from '../models/usersModel.js';

const login = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await usersModel.getUser({ email });

        if (!user) {
            //res.locals.statusText = { error: "User or password is invalid", message: "User or password is invalid"};
            res.locals.statusText = { error: "User not found", message: "User not found"};
            return res.status(400).json(res.locals.statusText);
        }
      
        const passwordMatch = bcript.compareSync(req.body.password, user.password);

        if (!passwordMatch) {
            //res.locals.statusText = { error: "User or password is invalid", message: "User or password is invalid"};
            res.locals.statusText = { error: "Password is incorrect", message: "Password is incorrect"};
            return res.status(400).json(res.locals.statusText);
        }

        const expiresIn      = Number(process.env.JWT_EXPIRES_IN_SECONDS) || 600;
        const expirationDate = new Date(Date.now() + expiresIn * 1000).toISOString().slice(0, 19).replace('T', ' ');

        const token = jwt.sign({
            email : user.email,
            id    : user.user_id,
        }, process.env.JWT_SECRET || "az_AZ", { expiresIn: expiresIn });
    
        res.locals.statusText = {
            message : "Login successfully",
            email   : user.email,
            token,
            expiresIn,
            expirationDate
        };
        return res.status(200).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `Error: ${error.message}`, message: `Error: ${error.message}`};
        return res.status(500).json(res.locals.statusText);
    }
};

export const loginController = { login };
