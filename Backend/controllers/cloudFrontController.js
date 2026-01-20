const { generateSignedUrl } = require("../utils/cloudFrontSigner");

exports.generateProductImageUrl = (req, res) => {
    try {
        const key = req.query.key;
        if (!key) {
            return res.status(400).json({
                success: false,
                message: "image key is required"
            })
        }

        const signedUrl = generateSignedUrl(key);

        res.status(200).json({
            success: true,
            url: signedUrl
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "failed to generate signed url"
        })
    }
}

