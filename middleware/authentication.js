const jwt = require("jsonwebtoken")

function verifyAdmin(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        try {
            if (jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN))
                next()
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(498).send({
                    result: "Fail",
                    reason: "Token Expired. Please Login Again to Access this API"
                })
            }
            else {
                res.status(401).send({
                    result: "Fail",
                    reason: "You Are Not An Authorized Person to Access this API"
                })
            }
        }
    }
    else
        res.status(401).send({
            result: "Fail",
            reason: "You Are Not An Authorized Person to Access this API"
        })
}

function verifyBoth(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        try {
            if (jwt.verify(token, process.env.JWT_SECRET_KEY_BUYER))//token verification
                next()
        } catch (error) {
            try {
                if (jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN))
                    next()
            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    res.status(498).send({
                        result: "Fail",
                        reason: "Token Expired. Please Login Again to Access this API"
                    })
                }
                else {
                    res.status(401).send({
                        result: "Fail",
                        reason: "You Are Not An Authorized Person to Access this API"
                    })
                }
            }
        }
    }
    else
        res.status(401).send({
            result: "Fail",
            reason: "You Are Not An Authorized Person to Access this API"
        })
}
module.exports = {
    verifyAdmin: verifyAdmin,
    verifyBoth:verifyBoth
}