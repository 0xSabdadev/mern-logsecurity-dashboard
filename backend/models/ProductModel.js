import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import Users from './UserModel.js'

const {DataTypes} = Sequelize

const Products = db.define(
    'products',
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //min 3 max 100 char
                len: [3, 100],
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    },
)

//set relasi (user bisa beli banyak produk)
Users.hasMany(Products)
//set foreign key
Products.belongsTo(Users, {foreignKey: 'userId'})

export default Products
