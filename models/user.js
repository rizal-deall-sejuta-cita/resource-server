const { ObjectId } = require('bson')

const { getDb } = require('../config/db')
const { isValidUser, trimUser } = require('../helpers/userValidation')
const { hashPassword } = require('../helpers/bcrypt');

class User {
    static async findAll() {
        try {
            let options = {
                sort: { username: 1 },
                projection: { password: 0 }
            }
            const users =  await getDb().collection('users').find({}, options).toArray()
            return Promise.resolve(users)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async findById(id) {
        try {
            const user = await getDb().collection('users').findOne({ _id: ObjectId(id) })
            return Promise.resolve(user)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async insertOne(payload) {
        try {
            let notValid = isValidUser(payload)
            if (notValid) {
                throw ({
                    name: 'BadRequest',
                    message: notValid
                })
            }
            payload.password = hashPassword(payload.password)
            payload.role = 'user'

            await getDb().collection('users').insertOne(payload)
            return Promise.resolve({
                success: `Successfully added user with username ${payload.username}`
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async updateOne(id, payload) {
        try {
            let user = trimUser(payload)
            if (user === null) {
                throw ({
                    name: "BadRequest",
                    message: "There is no update on user"
                })
            }
            if (user.password) {
                user.password = hashPassword(user.password)
            }
            const { value } = await getDb().collection('users').findOneAndUpdate({ _id: ObjectId(id)}, {$set: {...user}}, { projection: { _id: 1, username: 1 } })
            return Promise.resolve(value)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async deleteOne(id) {
        try {
            const { value } = await getDb().collection('users').findOneAndDelete({ _id: ObjectId(id) })
            return Promise.resolve(value)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

module.exports = User
