/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-13 17:04:47
 * @LastEditTime: 2019-04-22 17:01:17
 */

const { decodedToken } = require('../utils/decodeToken');

const { secretKey } = require('../config');

exports.checkToken = async (req, res, next) => {

    let decoded = await decodedToken(req.headers.authorization, secretKey);

    next()
}