
//NOT FOUND ERROR HANDLER

export const notFound = (req, res, next) => {
    res.status(404)
    throw new Error(`Route not found:${req.originalUrl}`)
}



// EXPRESS ERROR HANDLER

export const expressErrorHandler = (error, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);
    res.json({
        message: error.message
    })
}