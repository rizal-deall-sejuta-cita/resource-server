const adminOnly = async (req, res, next) => {
    let admin = req.headers['x-user-role']
    if (!admin || admin !== 'admin') {
        next({
            name: 'Forbidden',
            message: 'Access not granted'
        })
    } else {
        next()
    }
}

module.exports = { adminOnly }