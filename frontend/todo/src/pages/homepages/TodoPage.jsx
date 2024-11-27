import { useState, useEffect, useRef } from "react";
import { getAllTodos } from "../../services/TodoServices";
import { addTodo } from "../../services/TodoServices";
import { markasCompletedDb } from "../../services/TodoServices";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export default function TodoPage() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        const todoList = todos.todo_list.map((todo) => ({
          todo_id: todo.todo_id,
          task: todo.task,
          user_id: todo.user_id,
          completed: todo.completed,
          created_at: todo.created_at,
        }));
        setTodo(todoList);
        toast.success("Todos fetched successfully");
      } catch (error) {
        toast.error("Error fetching todos");
        console.log(error.message);
      }
    };

    fetchTodos();
  }, []);

  const todoRef = useRef();

  const todoSubmit = async (e) => {
    const id = uuidv4();
    console.log(id)
    e.preventDefault();
    const newtodo = {
      task: todoRef.current.value,
      user_id: "",
      todo_id: id,
      completed: false,
      created_at: new Date().toISOString(),
    }

    try {
      setTodo([
        ...todos,
        newtodo
      ]);
      await addTodo(newtodo);
    } catch (error) {
      toast.error("Error adding todo");
      console.log(error.message);
    }
  };

  const markasCompleted = (index) => {
    setTodo((prev) =>
      prev.map(
        (todo, i) => {
          if (i === index) {
            handeCompleted(todo.todo_id, !todo.completed);
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }
        // i === index ? { ...todo, completed: !todo.completed }  : todo
      )
    );
  };

  const handeCompleted = async (todo_id, isCompleted) => {
    console.log(todo_id)
    try {
      const response = await markasCompletedDb(todo_id, isCompleted);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold flex justify-center mb-2">To Do</h1>
      </header>

      <section>
        <div className="flex justify-center">
          <ul
            className={`${
              todos.length != 0 ? "block" : "hidden"
            } bg-blue-200 w-2/3 p-3 rounded-md`}
          >
            {todos.map((todo, index) => {
              return (
                <li
                  key={index}
                  className={`flex  justify-between ${
                    todo.completed ? "line-through" : ""
                  } mb-2`}
                >
                  <p className="text-lg font-semibold">{todo.task} </p>
                  <span>
                    <input
                      className="mx-3"
                      type="checkbox"
                      name=""
                      id=""
                      checked={todo.completed}
                      onChange={() => markasCompleted(index)}
                    />
                    <button className="bg-blue-300 p-1 rounded-lg hover:bg-blue-400 text-sm">
                      delet
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <form className="flex justify-center" onSubmit={todoSubmit}>
          <input
            type="text"
            ref={todoRef}
            className="border border-gray-300 w-full mx-5 p-3 mt-2"
          />
          <button
            type="submit"
            className="bg-blue-300 p-1 rounded-lg hover:bg-blue-400 text-sm"
          >
            Add
          </button>
        </form>
      </section>
    </>
  );
}
