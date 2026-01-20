const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const { generateUploadUrl } = require("../controllers/s3Controller");
const { generateProductImageUrl } = require("../controllers/cloudFrontController");

router.get("/s3/upload-url", isAuthenticatedUser, authorizeRoles("admin"), generateUploadUrl);
router.get("/image/signed-url", generateProductImageUrl);

module.exports = router;
