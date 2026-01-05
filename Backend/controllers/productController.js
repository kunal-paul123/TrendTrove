const Product = require("../models/productModel");
const User = require("../models/userModel");
const ApiFeatures = require("../utils/apifeatures");
const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudinary");

//create product --Admin
exports.createProduct = wrapAsync(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Ecommerce/products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = wrapAsync(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;

  // console.log("Products from DB:", products);
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

//get all products(Admin)
exports.getAdminProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// get product details
exports.getProductDetails = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product --Admin
exports.updateProduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  //Images start here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images && images.length > 0) {
    //Delete images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      try {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      } catch (err) {
        console.log("Failed to delete Cloudinary image:", err);
      }
    }

    //upload new images
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Ecommerce/products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  // Delete all images associated with the product from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    } catch (err) {
      console.log("Failed to delete Cloudinary image:", err);
    }
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//create new review or update the review
exports.createProductReview = wrapAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user?.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Review Created",
  });
});

//get all reviews of a product
exports.getAllReviews = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete review
exports.deleteReviews = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ExpressError(404, "Product not found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});
