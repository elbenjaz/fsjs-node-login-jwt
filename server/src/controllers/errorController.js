
const error404 = async(req, res) => {
    res.locals.statusText = { error: "Resource not found" };
    res.status(404).json(res.locals.statusText);
};

export const errorController = { error404 };
