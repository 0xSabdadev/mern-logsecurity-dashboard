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

//method info user dan cek user
export const validateUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg: 'Mohon login ke akun'})
    }
    //find user
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId,
        },
    })
    if (!user) return res.status(404).json({msg: 'User tidak ditemukan'})
    res.status(200).json(user)
}

export const Logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(400).json({msg: 'Tidak dapat Logout'})
        res.status(200).json({msg: 'Logout Gagal'})
    })
}
