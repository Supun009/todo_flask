import axiosInstance from "./AxiosInsance";


export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos/get-todos");
    if (response.status === 200) {
      console.log(response.data)
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

export const addTodo = async (newtodo) => {
  try {
    const response = await axiosInstance.post("/todos/add-todo", { newtodo });
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
export const markasCompletedDb = async(todo_id, isCompleted) => {
  console.log(todo_id)
  try {
    return await axiosInstance.post(`/todos/comleted/${todo_id}`, {isCompleted});
   
  } catch (error) {
    return "Something went wrong";
  }
}


