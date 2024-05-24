import categoryModel from "../../model/category.js";

export const get = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).json(category);
  } catch (error) {
    throw error;
  }
};

export const create = async (req, res) => {
  try {
    const { body } = req;

    const checkCategory = await categoryModel.findOne({ name: body.name });
    if (checkCategory) {
      res.status(400).json("Name Already Excited");
    }
    categoryModel.create(body).then(async (insertCategory, err) => {
      if (!err) {
        console.log("insertCategory", insertCategory);
        res.status(200).json({
          data: insertCategory,
          result: "Save Successfully",
        });
      } else {
        console.log("error", err);
        res.status(400).json(err.toString());
      }
    });
  } catch (error) {
    throw error;
  }
};

export const update = async (req, res) => {
  try {
    const { name, _id } = req.body;

    const checkCategory = await categoryModel.findById({ _id });
    if (!checkCategory) {
      res.status(400).json("category not found");
    }
    categoryModel
      .findOneAndUpdate(
        { _id },
        {
          name,
        },
        { new: true }
      )
      .then(async (updateCategory, err) => {
        if (!err) {
          console.log("updateCategory", updateCategory);
          res.status(200).json({
            data: updateCategory,
            result: "Update Successfully",
          });
        } else {
          console.log("error", err);
          res.status(400).json(err.toString());
        }
      });
  } catch (error) {
    throw error;
  }
};
