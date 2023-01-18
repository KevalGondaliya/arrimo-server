const { promisify } = require("util");
const jwt = require("jsonwebtoken");

module.exports = {
  protect: async (req, res, next) => {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        let token = req.headers.authorization.split(" ")[1];
        if (!token)
          res
            .status(401)
            .json({ status: 401, message: "Token dose not exits" });

        const decode = await promisify(jwt.verify)(
          token,
          "5135s4f3s5r3dfef4s3e2fd1fw3e5f1csd321vcs3e5f1e51fcs3e51fs3e5"
        );
        if (!decode)
          res
            .status(401)
            .json({ status: 401, message: "Unauthorized! token expired" });
        else req.user = decode;
        next();
      } else {
        res.status(401).json("unauthorized");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};
