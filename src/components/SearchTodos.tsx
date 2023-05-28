"use client";

import { Todo } from "@prisma/client";
import { useState, useTransition } from "react";

export default function SearchTodos({ initialTodos, onSearch }: { initialTodos: Todo[]; onSearch: (search: string) => Promise<Todo[]> }) {
  const [todos, setTodos] = useState(initialTodos);
  const [search, setSearch] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <input
        type="text"
        value={search}
        className="text-black"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
        onClick={async () => {
          startTransition(async () => {
            const todos = await onSearch(search);
            setTodos(todos);
          });
        }}
        disabled={pending}
      >
        Search
      </button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
}
