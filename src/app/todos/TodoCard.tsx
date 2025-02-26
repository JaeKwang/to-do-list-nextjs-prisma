import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface TodoCardProps {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoCard({ todo, todos, setTodos }: TodoCardProps) {
  const deleteTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.success) {
        setTodos(todos.filter((v) => v.id !== todo.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li>
        <div className="flex flex-row justify-between gap-20 rounded-md bg-gray-200 items-center">
            <span className="ml-2">{todo.content}</span>
            <button 
                className="rounded-md bg-red-400 py-2 px-4"
                onClick={() => deleteTodo()}
            >
                삭제
            </button>
        </div>
    </li>
  );
}