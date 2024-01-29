const jwt = require('jsonwebtoken')

exports.authjwt = (req, res, next) => {
    // console.log("body", req.body)
    // console.log("auth token", Object.keys(req.body)[0]);

    if (Object.keys(req.body)[0]) {
        //console.log('from auth',Object.keys(req.body)[0]);
        jwt.verify(Object.keys(req.body)[0], process.env.secret, (err) => {
            if (err) {
                res.status(403).json({ flag: 0, message: "Token not present" })
            }
            else {
                next()
            }
        })
    } else {
        res.status(401).json({ flag: -1, message: "Please Login" })
    }
}

