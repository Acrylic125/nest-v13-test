import SearchTodos from "@/components/SearchTodos";
import prisma from "@/utils/db";

export default async function Page() {
  const data = await searchData("");

  async function searchData(search: string) {
    "use server";

    const todos = prisma.todo.findMany({
      where: {
        title: {
          contains: search,
        },
      },
    });
    return todos;
  }

  return (
    <main>
      <h1>Search</h1>
      <SearchTodos initialTodos={data} onSearch={searchData} />
      {data.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </main>
  );
}
