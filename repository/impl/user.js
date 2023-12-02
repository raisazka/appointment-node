import UserModel from "../model/user.js"

class UserRepository {
    add = (req) => {
        return UserModel.create({
            name: req.name,
            email: req.email,
            password: req.password
        })
    }

    getByID = (id) => {
        return UserModel.findOne({
            _id: id
        })
    }

    getByEmail = (email) => {
        return UserModel.findOne({
            email: email
        })
    }
}

export default UserRepository