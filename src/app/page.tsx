'use client';

import { useState } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  timestamp: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchWeather = async () => {
    const res = await fetch("/api/weather");
    const data = await res.json();
    setWeatherData(data);
  };

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });

    if (res.ok) {
      setNewTodo("");
      fetchTodos();
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Next.js Serverless API Demo</h1>

        {/* Weather Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Weather API</h2>
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Get Weather
          </button>
          {weatherData && (
            <div className="mt-4 text-gray-700 dark:text-gray-300">
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Condition: {weatherData.condition}</p>
              <p>Humidity: {weatherData.humidity}%</p>
            </div>
          )}
        </section>

        {/* Todos Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Todos API</h2>
          <form onSubmit={addTodo} className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded mr-2"
              placeholder="New todo"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add Todo
            </button>
          </form>
          <button
            onClick={fetchTodos}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Fetch Todos
          </button>
          <ul className="mt-4 space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={async () => {
                    await fetch("/api/todos", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id: todo.id,
                        completed: !todo.completed,
                      }),
                    });
                    fetchTodos();
                  }}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Users Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Users API</h2>
          <button
            onClick={fetchUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Fetch Users
          </button>
          <div className="mt-4 grid gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border dark:border-gray-600 rounded">
                <p className="text-gray-700 dark:text-gray-300">Name: {user.name}</p>
                <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
                <p className="text-gray-700 dark:text-gray-300">Role: {user.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
