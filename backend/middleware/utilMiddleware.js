

export function notFound(req, res) {
    res.status(404).json({ status: false, msg: "Page not found" })
}

export function errorHandle(err, req, res, next) {
    res.status(500).json({ status: false, msg: "Internal server error" })
}