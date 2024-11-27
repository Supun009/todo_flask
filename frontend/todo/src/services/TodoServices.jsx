import axiosInstance from "./AxiosInsance";

export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos/get-todos");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};

export const addTodo = async (task) => {
  try {
    const response = await axiosInstance.post("/todos/add-todo", { task });
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};
export const currentuser = (username, password) =>
  axiosInstance.post("/auth/currentuser", { username, password });
