const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const fs = require("fs");
const path = require("path");

exports.generateSignedUrl = (filePath) => {
    const privateKey = fs.readFileSync("private_key.pem");

    const url = `https://${process.env.CLOUDFRONT_DOMAIN}/${filePath}`;

    const signedUrl = getSignedUrl({
        url,
        keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
        privateKey: privateKey,
        dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })

    return signedUrl;
}

