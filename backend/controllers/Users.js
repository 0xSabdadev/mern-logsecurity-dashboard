import Users from '../models/UserModel.js'
import argon2 from 'argon2'

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role'],
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                //ambil input dr uri
                uuid: req.params.id,
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const createUser = async (req, res) => {
    //ambil input dr user
    const {name, email, password, confPassword, role} = req.body
    if (password !== confPassword)
        return res.status(400).json({msg: 'Password dan Confirm Password tidak cocok!'})
    //hash
    const hashPassword = await argon2.hash(password)
    try {
        //masukkan data ke db
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        })
        res.status(201).json({msg: 'Register Berhasil'})
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}
export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id,
        },
    })
    if (!user) return res.status(404).json({msg: 'User tidak ditemukan!'})
    //get inputan user
    const {name, email, password, confPassword, role} = req.body
    let hashPassword
    //jika user tidak edit field password, maka password ttp pass yg lama,
    //kalo update pass, brari di hash dulu lg
    if ((password === '') | (password === null)) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }
    if (password !== confPassword)
        return res.status(400).json({msg: 'Password dan Confirm Password tidak cocok!'})
    //kirim update data ke db
    try {
        await Users.update(
            {
                name: name,
                email: email,
                password: hashPassword,
                role: role,
            },
            {
                where: {
                    id: user.id,
                },
            },
            res.status(200).json({msg: 'Update Data Berhasil'}),
        )
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}
export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id,
        },
    })
    if (!user) return res.status(404).json({msg: 'User tidak ditemukan!'})
    try {
        await Users.destroy(
            {
                where: {
                    id: user.id,
                },
            },
            res.status(200).json({msg: 'Delete Data Berhasil'}),
        )
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}
