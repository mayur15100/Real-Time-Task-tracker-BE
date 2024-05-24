import userModel from "../../model/user.js";
export const get = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    throw error;
  }
};
