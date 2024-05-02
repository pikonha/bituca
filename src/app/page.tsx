"use client";
import React, { useState } from "react";
import { useTodoList } from "../hooks";
import { Todo } from "../@types";

export default function Home() {
  const { todos, addTodo, deleteTodo } = useTodoList();
  const [todo, setTodo] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    datetime: "",
    duration: "",
    completed: false,
  });

  // State variable to store error messages
  const [errors, setErrors] = useState<
    Record<keyof Omit<Todo, "id" | "completed">, string>
  >({
    title: "",
    description: "",
    datetime: "",
    duration: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleAddTodo = () => {
    let errors: Omit<Todo, "id" | "completed"> = {
      title: "",
      description: "",
      datetime: "",
      duration: "",
    };

    let isValid = true;
    if (!todo.title) {
      errors.title = "Title is a required field";
      isValid = false;
    }
    if (!todo.description) {
      errors.description = "Description is a required field";
      isValid = false;
    }
    if (!todo.datetime) {
      errors.datetime = "Datetime is a required field";
      isValid = false;
    }
    if (!todo.duration) {
      errors.duration = "Duration is a required field";
      isValid = false;
    }
    setErrors(errors);

    if (!isValid) return;

    addTodo(todo);
    setTodo({
      title: "",
      description: "",
      datetime: "",
      duration: "",
      completed: false,
    });
  };

  return (
    <div className="text-3xl">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-slate-100">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Create new todo
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="title"
                className="leading-7 text-sm text-gray-600"
              >
                Title
              </label>
              <input
                onChange={onChange}
                value={todo.title}
                type="text"
                id="title"
                name="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autoComplete="off"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">
                Description
              </label>
              <input
                onChange={onChange}
                value={todo.description}
                type="text"
                id="description"
                name="description"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autoComplete="off"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="datetime"
                className="leading-7 text-sm text-gray-600"
              >
                Datetime
              </label>
              <input
                onChange={onChange}
                value={todo.datetime}
                type="datetime-local"
                id="datetime"
                name="datetime"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autoComplete="off"
              />
              {errors.datetime && (
                <p className="text-red-500 text-sm mt-1">{errors.datetime}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="duration"
                className="leading-7 text-sm text-gray-600"
              >
                Duration
              </label>
              <input
                onChange={onChange}
                value={todo.duration}
                type="text"
                id="duration"
                name="duration"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autoComplete="off"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>
            <button
              onClick={handleAddTodo}
              className="text-white bg-green-800 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-green-600 rounded text-lg"
            >
              Add Todo
            </button>
          </div>
        </div>
        <div className="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-slate-100">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Todos
          </h2>
          {todos.map((todo) => (
            <div key={todo.id} className="border-b border-gray-300 mb-4 pb-4">
              <p className="text-lg font-medium">{todo.title}</p>
              <p className="text-sm text-gray-500 mb-2">{todo.description}</p>
              <p className="text-xs text-gray-400 mb-2">{todo.datetime}</p>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 text-xs focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
