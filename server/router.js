import user from "./api/user/index.js";
import task from "./api/task/index.js";
import category from "./api/category/index.js";

const AllRoutes = (app) => {
  app.use("/api/user", user);
  app.use("/api/task", task);
  app.use("/api/category", category);
};
export default AllRoutes;
