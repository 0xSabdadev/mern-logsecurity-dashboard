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
                include: [
                    {
                        model: Users,
                    },
                ],
            })
        } else {
            response = await Products.findAll({
                //hanya melihat produk yg diin[ut (beraerti produk yg sesuai uuid nya)]
                where: {
                    userId: req.userId,
                },
                include: [
                    {
                        model: Users,
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
export const createProduct = async (req, res) => {}
export const updateProduct = async (req, res) => {}
export const deleteProduct = async (req, res) => {}
