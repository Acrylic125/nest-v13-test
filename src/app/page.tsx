import Image from "next/image";

async function getData() {
  const res = await fetch("https://api.github.com/users/Acrylic125");
  const json = await res.json();
  return json;
}

async function TestComponent({ test }: { test: string }) {
  return <div>{test}</div>;
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <div>Hello</div>
      {data.url}
      {/* @ts-expect-error Async Server Component */}
      <TestComponent test="lol" />
    </main>
  );
}
