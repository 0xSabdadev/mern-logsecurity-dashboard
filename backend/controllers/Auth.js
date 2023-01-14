import Users from '../models/UserModel'
import argon2 from 'argon2'

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email,
        },
    })
    if (!user) return res.status(404).json({msg: 'User tidak ditemukan'})
    const match = await argon2.verify(user.password, req.body.password)
    if (!match) return res.status(400).json({mgs: 'Wrong Password'})
    //jika cocok, buat session user
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role
    res.status(200).json({uuid, name, email, role})
}
