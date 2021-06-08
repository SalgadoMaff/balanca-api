const bcrypt = require('bcrypt')
const User = require('../model/User')

module.exports = async () => {
    console.log('Executing migrations...')
    await createDefaultUser()
}

const createDefaultUser = async () => {
    try {
        const users = await User.find()

        if (users.length < 1) {
            const username = process.env.DEFAULT_USER_USERNAME
            const password = process.env.DEFAULT_USER_PASSWORD
            
            _validateEnviromentVariables(username, password)
            
            const passwordEncrypted = await bcrypt.hash(password, 11)

            const user = await User.create({
                name: 'Administrador',
                username,
                password: passwordEncrypted,
                role: 'ADMIN'
            })
            console.log(`User '${user.name}' with role '${user.role}' has been created.`)
        }
    } catch (error) {
        throw new Error(`Error when execute 'createDefaultUser': ${error}`)
    }
}

const _validateEnviromentVariables = (username, password) => {
    if (!username) {
        throw new Error(`Enviroment variable 'DEFAULT_USER_USERNAME' not found.`)
    }
    if (!password) {
        throw new Error(`Enviroment variable 'DEFAULT_USER_PASSWORD' not found.`)
    }
}