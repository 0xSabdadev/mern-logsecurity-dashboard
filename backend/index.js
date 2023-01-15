import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import db from './config/Database.js'
import SequelizeStore from 'connect-session-sequelize'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/UserRoute.js'
import AuthRoute from './routes/AuthRoute.js'

dotenv.config()
const app = express()

//!masukkan session ke db (membuat store dulu)
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db,
})

// ;(async () => {
//     await db.sync()
// })()

//session
app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        //!session akan disimpan ke db
        store: store,
        cookie: {
            secure: 'auto',
        },
    }),
)
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
)
app.use(express.json())
app.use(UserRoute)
app.use(ProductRoute)
app.use(AuthRoute)

// !buat kolom sesssion
// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on 'http://localhost:${process.env.APP_PORT}'`)
})
