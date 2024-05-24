import mongoose from "mongoose";
import taskModel from "../../model/task.js";
import historyModel from "../../model/history.js";
import { socketPublishMessage } from "../../service/socket.js";

export const get = async (req, res) => {
  try {
    const { body } = req;
    const tasks = await getAllTask(body);
    res.status(200).json(tasks);
  } catch (error) {
    throw error;
  }
};

export const create = async (req, res) => {
  try {
    const { body } = req;

    taskModel.create(body).then(async (insertTask, err) => {
      if (!err) {
        console.log("insertTask", insertTask);
        await historyModel.create({
          taskId: insertTask._id,
          action: "CREATED",
        });

        await socketPublishMessage(order.FbPageId, {
          type: "insertTask",
          data: insertTask,
        });
        res.status(200).json({
          data: insertTask,
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
    const { _id } = req.body;

    const checkTask = await taskModel.findById({ _id });
    if (!checkTask) {
      res.status(400).json("task not found");
    }
    taskModel
      .findOneAndUpdate({ _id }, req.body, { new: true })
      .then(async (UpdatedTask, err) => {
        if (!err) {
          console.log("UpdatedTask", UpdatedTask);

          await historyModel.create({
            taskId: _id,
            action: "UPDATED",
          });

          await socketPublishMessage(order.FbPageId, {
            type: "updateTask",
            data: UpdatedTask,
          });
          res.status(200).json({
            data: UpdatedTask,
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

export const destroy = async (req, res) => {
  try {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json("Invalid Id");
    }
    const task = await taskModel.findById(_id);

    if (!task) {
      res.status(400).json("Invalid Task");
    }

    await historyModel.create({
      taskId: _id,
      action: "DELETED",
    });

    await socketPublishMessage(order.FbPageId, {
      type: "delete",
      data: _id,
    });

    await taskModel.deleteOne({ _id });
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    throw error;
  }
};

const getAllTask = async (filter = null) => {
  try {
    console.log("filter", filter);
    let dataQuery = [
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedUser",
          foreignField: "_id",
          as: "User",
        },
      },
      {
        $unwind: {
          path: "$User",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category",
        },
      },
      {
        $unwind: {
          path: "$Category",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const tasks = await taskModel.aggregate(dataQuery);

    return tasks;
  } catch (error) {
    throw error;
  }
};
