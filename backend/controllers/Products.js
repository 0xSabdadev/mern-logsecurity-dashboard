import Products from '../models/ProductModel.js'
import Users from '../models/UserModel.js'

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
export const getProductsById = async (req, res) => {}
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
