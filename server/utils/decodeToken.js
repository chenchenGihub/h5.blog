/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-14 20:16:03
 * @LastEditTime: 2019-04-14 20:47:24
 */
const jwt = require('jsonwebtoken');

exports.decodedToken = async (token, cert) => {
    const decoded = await jwt.verify(token, cert);
    return decoded
}