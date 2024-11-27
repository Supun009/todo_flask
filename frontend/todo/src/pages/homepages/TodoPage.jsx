import { useState, useEffect, useRef } from "react";
import {getAllTodos} from "../../services/TodoServices";
import {addTodo} from "../../services/TodoServices";

export default function TodoPage() {
  const [todos, setTodo] = useState([
    // {
    //   task: "Complete the React tutorial",
    //   user_id: "user123",
    //   completed: false,
    //   created_at: "2024-11-27T08:00:00Z",
    // },
    // {
    //   task: "Buy groceries",
    //   user_id: "user456",
    //   completed: false,
    //   created_at: "2024-11-26T10:00:00Z",
    // },
    // {
    //   task: "Write blog post on React",
    //   user_id: "user789",
    //   completed: false,
    //   created_at: "2024-11-28T09:00:00Z",
    // },
    // {
    //   task: "Complete the assignment for school",
    //   user_id: "user321",
    //   completed: false,
    //   created_at: "2024-11-27T12:00:00Z",
    // },
    // {
    //   task: "Complete the assignment for school",
    //   user_id: "user321",
    //   completed: false,
    //   created_at: "2024-11-27T12:00:00Z",
    // },
    // {
    //   task: "Complete the assignment for school",
    //   user_id: "user321",
    //   completed: false,
    //   created_at: "2024-11-27T12:00:00Z",
    // },
  ]);

  useEffect(() => {
    const fetchTodos = async () => {
        try {
            const todos = await getAllTodos();
          const todoList = todos.todo_list.map((todo) => ({
            task: todo.task,
            user_id: todo.user_id,
            completed: todo.completed,
            created_at: todo.created_at
          }));
          setTodo(todoList);
        } catch (error) {
            console.log(error.message)
        }
    }
    
    fetchTodos();
  },[]);


  const todoRef = useRef()

  const todoSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await addTodo(todoRef.current.value);
      console.log(response);
      setTodo([...todos, 
        {
      task: todoRef.current.value,
      user_id: "",
      completed: false,
      created_at: new Date().toISOString(),
    },

      ]);
    } catch (error) {
      console.log(error.message)
    }
  }


  const markasCompleted = (index) => {
    setTodo((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold flex justify-center mb-2">To Do</h1>
      </header>

      <section>
        <div className="flex justify-center">
          <ul className="bg-blue-100 w-2/3 p-3 rounded-md">
            {todos.map((todo, index) => {
              return (
                <li
                  key={index}
                  className={`flex  justify-between ${
                    todo.completed ? "line-through" : ""
                  } mb-2`}
                >
                  <p className="text-lg font-semibold">{todo.task}</p>
                  <span >
                    <input
                      className="mx-3"
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => markasCompleted(index)}
                    />
                    <button className="bg-blue-300 p-1 rounded-lg hover:bg-blue-400 text-sm">delet</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <form className="flex justify-center" onSubmit={todoSubmit}>
        <input type="text" ref={todoRef} className="border border-gray-300 w-full mx-5 p-3 mt-2"/>
            <button type="submit" className="bg-blue-300 p-1 rounded-lg hover:bg-blue-400 text-sm">Add</button>
        </form>
      </section>
    </>
  );
}
