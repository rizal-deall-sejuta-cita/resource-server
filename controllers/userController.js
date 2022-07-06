const User = require('../models/user');

class UserController {
    static async findAll(req, res, next) {
        try {
            const users = await User.findAll()
            res.status(200).json({ users })
        } catch (err) {
            next(err)
        }
    }

    static async findById(req, res, next) {
        try {
            const userId = req.headers['x-user-id']
            const role = req.headers['x-user-role']
            const id = req.params.id
            if (role !== 'admin' && userId !== id) {
                throw ({
                    name: "Forbidden",
                    message: "Access not granted"
                })
            }

            const user = await User.findById(id)
            if (!user) {
                throw ({
                    name: "NotFound",
                    message: "User not Found"
                })
            }
            res.status(200).json({ user })
        } catch (err) {
            next(err)
        }
    }

    static async createUser(req, res, next) {
        try {
            let { username, email, password, firstName, lastName } = req.body
            const result = await User.insertOne({ username, email, password, firstName, lastName })
            res.status(201).json({ result })
        } catch (err) {
            next(err)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = req.params.id
            const { username, email, password, firstName, lastName } = req.body
            const result = await User.updateOne(id, { username, email, password, firstName, lastName })
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `User with id:${id} not found`
                })
            }
            res.status(200).json({
                success: `User with id ${id} has been updated.`
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const id = req.params.id
            const result = await User.deleteOne(id)
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `User with id:${id} not found`
                })
            }
            res.status(200).json({
                success: `User with id ${id} has been deleted.`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
