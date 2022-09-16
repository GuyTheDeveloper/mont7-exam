import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    let products = read("products");
    let subCategories = read("sub-categories");
    let { productId } = req.params;
    let { categoryId, subCategoryId, model, productName } = req.query;

    if (req.url == "/products") {
      return res.send([]);
    }
    //the best buggy code of the year
    let product = products.filter((product) => {
      let byProductId = productId ? product.productId == productId : true;
      let bySubCategoryId = subCategoryId
        ? product.subCategoryId == subCategoryId
        : true;
      let byModel = model
        ? product.model.toLowerCase().includes(model.toLowerCase())
        : true;
      let byName = productName
        ? product.productName.toLowerCase().includes(productName.toLowerCase())
        : true;

      return byProductId && bySubCategoryId && byModel && byName;
    });

    if (categoryId) {
      let helper = subCategories.filter(
        (subCategory) => subCategory.categoryId == categoryId
      );

      product = products.filter((product) =>
        helper.some(
          (subCategory) => subCategory.subCategoryId == product.subCategoryId
        )
      );
    }
    return res.send(product);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const POST = (req, res) => {
  try {
    let products = read("products");
    let { subCategoryId, model, productName, color, price } = req.body;

    let newProduct = {
      productId: products.length ? products.at(-1)?.productId + 1 : 1,
      subCategoryId,
      model,
      productName,
      color,
      price,
    };

    products.push(newProduct);
    write("products", products);

    return res.status(200).json({
      status: 200,
      message: "Product successfully added",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const PUT = (req, res) => {
  try {
    let products = read("products");
    let { productId } = req.params;
    let { productName, model, price, subCategoryId, color } = req.body;

    let product = products.find((product) => product.productId == productId);
    if (!product) {
      throw new Error("Product Not Found");
    }

    product.subCategoryId = subCategoryId || product.subCategoryId;
    product.productName = productName || product.productName;
    product.model = model || product.model;
    product.price = price || product.price;
    product.color = color || product.color;

    write("products", products);
    return res
      .status(200)
      .json({ status: 200, message: "Succesfully edited", data: product });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

const DELETE = (req, res) => {
  try {
    let products = read("products");
    let { productId } = req.params;
    let productIndex = products.findIndex(
      (product) => product.productId == productId
    );

    if (productIndex == -1) {
      throw new Error("Product Not Found");
    }

    let splicedProduct = products.splice(productIndex, 1);
    write("products", products);

    return res.status(200).json({
      status: 200,
      message: "Product successfully deleted",
      data: splicedProduct,
    });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

export default { GET, POST, PUT, DELETE };
