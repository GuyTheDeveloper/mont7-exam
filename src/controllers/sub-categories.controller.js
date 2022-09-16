import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    let subCategories = read("sub-categories");
    let products = read("products");
    let { subCategoryId } = req.params;
    subCategories = subCategories.filter((subCategory) => {
      let byId = subCategoryId
        ? subCategory.subCategoryId == subCategoryId
        : true;

      subCategory.products = products.filter(
        (product) =>
          product.subCategoryId == subCategory.subCategoryId &&
          delete product.subCategoryId
      );
      delete subCategory.categoryId;
      return byId;
    });
    return res.send(subCategories);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const POST = (req, res) => {
  try {
    let subCategories = read("sub-categories");
    let { categoryId, subCategoryName } = req.body;

    let findDuplicate = subCategories.find(
      (subCategory) => subCategory.subCategoryName == subCategoryName
    );

    if (findDuplicate) {
      throw new Error("This sub_category already exist");
    }

    let newSubCategory = {
      subCategoryId: subCategories.length
        ? subCategories.at(-1)?.subCategoryId + 1
        : 1,
      categoryId,
      subCategoryName,
    };

    subCategories.push(newSubCategory);
    write("sub-categories", subCategories);

    return res.status(200).json({
      status: 200,
      message: "SubCategory successfully added",
      data: newSubCategory,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const DELETE = (req, res) => {
  try {
    let subCategories = read("sub-categories");
    let { subCategoryId } = req.params;

    let subCategoryIndex = subCategories.findIndex(
      (subCategory) => subCategory.subCategoryId == subCategoryId
    );

    if (subCategoryIndex == -1) {
      throw new Error("subCategory Not Found");
    }

    let splicedSubCategory = subCategories.splice(subCategoryIndex, 1);
    write("sub-categories", subCategories);

    return res.status(200).json({
      status: 200,
      message: "SubCategory successfully deleted",
      data: splicedSubCategory,
    });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

const PUT = (req, res) => {
  try {
    let subCategories = read("sub-categories");
    let { subCategoryId } = req.params;
    let { categoryId, subCategoryName } = req.body;

    let subCategory = subCategories.find(
      (subCategory) => subCategory.subCategoryId == subCategoryId
    );

    if (!subCategory) {
      throw new Error("SubCategory Not Found ");
    }

    subCategory.categoryId = categoryId || subCategory.categoryId;

    subCategory.subCategoryName =
      subCategoryName || subCategory.subCategoryName;

    write("sub-categories", subCategories);

    return res
      .status(200)
      .json({ status: 200, message: "Succecfully edited", data: subCategory });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

export default { GET, POST, DELETE, PUT };
