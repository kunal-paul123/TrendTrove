const crypto = require("crypto");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../config/s3");

exports.generateUploadUrl = async (req, res, next) => {
    try {
        const fileType = req.query.fileType;
        if (!fileType) return res.status(400).json({ error: "fileType is required" });

        const filExtension = fileType.split('/')[1];
        const key = `products/${crypto.randomUUID()}.${filExtension}`; // filename

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        })

        const uploadUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300
        })

        res.status(200).json({
            success: true,
            uploadUrl,
            key,
            fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to generate upload URL",
        })
    }
}

