import jwt from 'jsonwebtoken'

const jwtGen = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, process.env.KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token!')
            } else {
                resolve(token)
            }
        })
    })
}

export default jwtGen