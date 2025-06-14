'use client';

import Image from "next/image";
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>

      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Next.js Serverless API Demo</h1>

        {/* Weather Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Weather API</h2>
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Get Weather
          </button>
          {weatherData && (
            <div className="mt-4">
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Condition: {weatherData.condition}</p>
              <p>Humidity: {weatherData.humidity}%</p>
            </div>
          )}
        </section>

        {/* Todos Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Todos API</h2>
          <form onSubmit={addTodo} className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="border p-2 rounded mr-2"
              placeholder="New todo"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Todo
            </button>
          </form>
          <button
            onClick={fetchTodos}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fetch Todos
          </button>
          <ul className="mt-4">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2">
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
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Users Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Users API</h2>
          <button
            onClick={fetchUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fetch Users
          </button>
          <div className="mt-4 grid gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
