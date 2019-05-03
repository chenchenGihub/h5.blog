/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-14 17:16:49
 * @LastEditTime: 2019-04-14 21:20:05
 */

const jwt = require('jsonwebtoken');

exports.createToken = async (payload,secretOrPrivateKey,expires,unit) => {
   

    const token = await jwt.sign(payload, secretOrPrivateKey, {
        // algorithm:algorithm,
            expiresIn: expires+unit
        });

    return token
}