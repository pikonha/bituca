import { useEffect, useState } from "react";
import { Todo } from "../@types";

const SERVER_URL = "http://127.0.0.1:3001";

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const request = async () => await fetchTodos();
    request();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (newTodo: Omit<Todo, "id">) => {
    try {
      const response = await fetch(`${SERVER_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      await fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(`${SERVER_URL}/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      await fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return {
    todos,
    isLoading,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodoList;
