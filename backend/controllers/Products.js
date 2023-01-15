import Products from '../models/ProductModel'
import Users from '../models/UserModel'

export const getProducts = async (req, res) => {
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
    }
}
export const getProductsById = async (req, res) => {}
export const createProduct = async (req, res) => {}
export const updateProduct = async (req, res) => {}
export const deleteProduct = async (req, res) => {}
