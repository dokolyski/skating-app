// import config from 'config/database.json'
import {Sequelize} from 'sequelize'
import * as path from "path";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../storage', 'database_test.sqlite'),
})

//Test the DB Connection
sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error: ', err))

export default sequelize