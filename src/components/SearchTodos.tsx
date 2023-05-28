"use client";

import { Todo } from "@prisma/client";
import { useState } from "react";

export default function SearchTodos({ initialTodos, onSearch }: { initialTodos: Todo[]; onSearch: (search: string) => Promise<Todo[]> }) {
  const [todos, setTodos] = useState(initialTodos);
  const [search, setSearch] = useState("");

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
        onClick={async () => {
          const todos = await onSearch(search);
          setTodos(todos);
        }}
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
