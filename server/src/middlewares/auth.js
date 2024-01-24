import "dotenv/config";
import jwt from "jsonwebtoken";

const checkAuthentication = (req, res, next) => {
    try {
        //validate headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            res.locals.statusText = { error: "Token is required" };
            return res.status(401).json(res.locals.statusText);
        }

        //validate token
        req.auth = jwt.verify(token, process.env.JWT_SECRET || "az_AZ");
        
        next();
    } catch (error) {
        res.locals.statusText = { error: `Token is invalid: ${error.message}` };
        return res.status(401).send(res.locals.statusText);
    }
};

export const auth = { checkAuthentication };
