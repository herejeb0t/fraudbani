import jwt from 'jsonwebtoken'

const jwtGen = (uid = '', exp, key) => {
    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, key, {
            expiresIn: exp
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