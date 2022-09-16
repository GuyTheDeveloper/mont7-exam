import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    let categories = read("categories");
    let subCategories = read("sub-categories");
    let { categoryId } = req.params;
    categories = categories.filter((category) => {
      let byId = categoryId ? category.categoryId == categoryId : true;

      category.subCategories = subCategories.filter(
        (subCategory) =>
          subCategory.categoryId == category.categoryId &&
          delete subCategory.categoryId
      );
      return byId;
    });
    return res.send(categories);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const POST = (req, res) => {
  try {
    let categories = read("categories");
    let { categoryName } = req.body;

    let newCategory = {
      categoryId: categories.length ? categories.at(-1)?.categoryId + 1 : 1,
      categoryName,
    };

    categories.push(newCategory);
    write("categories", categories);

    res.status(201).json({
      status: 201,
      message: "Category successfully addedd",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const PUT = (req, res) => {
  try {
    let categories = read("categories");
    let { categoryId } = req.params;
    let { categoryName } = req.body;

    let category = categories.find(
      (category) => category.categoryId == categoryId
    );

    if (!category) {
      throw new Error("Category Not Found");
    }

    category.categoryName = categoryName || category.categoryName;
    write("categories", categories);

    return res.status(200).json({
      status: 200,
      message: "Category succecfully edited",
      data: category,
    });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

const DELETE = (req, res) => {
  try {
    let categories = read("categories");
    let { categoryId } = req.params;

    let categoryIndex = categories.findIndex(
      (category) => category.categoryId == categoryId
    );

    if (categoryIndex == -1) {
      throw new Error("Category Not Found");
    }

    let splicedCategory = categories.splice(categoryIndex, 1);
    write("categories", categories);

    return res.status(200).json({
      status: 200,
      message: "Category successfully deleted",
      data: splicedCategory,
    });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

export default { GET, POST, PUT, DELETE };
