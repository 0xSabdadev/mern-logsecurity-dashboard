import Products from '../models/ProductModel.js'
import Users from '../models/UserModel.js'
import {Op} from 'sequelize'

export const getProducts = async (req, res) => {
    try {
        let response
        //jika admin, bisa melihat semua product
        //jika user, hanya bisa melihat product yg dia inputkkan
        if (req.role == 'admin') {
            response = await Products.findAll({
                //karena ada relasi product dan user yg dibuat, jgn lipa diinclude
                attributes: ['uuid', 'name', 'price'],
                include: [
                    {
                        model: Users,
                        attributes: ['name', 'email'],
                    },
                ],
            })
        } else {
            response = await Products.findAll({
                //hanya melihat produk yg diin[ut (beraerti produk yg sesuai uuid nya)]
                attributes: ['uuid', 'name', 'price'],
                where: {
                    userId: req.userId,
                },
                include: [
                    {
                        model: Users,
                        attributes: ['name', 'email'],
                    },
                ],
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const getProductsById = async (req, res) => {
    try {
        //cek product nya ada pa ga
        const product = await Products.findOne({
            where: {
                uuid: req.params.id,
            },
        })
        if (!product) return res.status(404).json({msg: 'Produk tidak ditemukan'})
        let response
        if (req.role == 'admin') {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    id: product.id,
                },
                include: [
                    {
                        model: Users,
                        attributes: ['name', 'email'],
                    },
                ],
            })
        } else {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    //user tidak bisa mengambol data produk dr admin/selain user itu
                    //maka yg di get harus where req.userId dan product.id
                    [Op.and]: [{id: product.id}, {userId: req.userId}],
                    // userId: req.userId,
                },
                include: [
                    {
                        model: Users,
                        attributes: ['name', 'email'],
                    },
                ],
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const createProduct = async (req, res) => {
    const {name, price} = req.body
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId,
        })
        res.status(201).json({msg: 'Product created'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const updateProduct = async (req, res) => {}
export const deleteProduct = async (req, res) => {}
