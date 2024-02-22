var jwt = require('jsonwebtoken');

exports.checktoken = async (req,res,next) => {
    jwt.verify(req.headers.authorization,"cdmi",next);
}