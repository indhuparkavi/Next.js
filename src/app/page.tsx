"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/service/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/service/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <form onSubmit={addUser} className="my-4 flex gap-2">
        <input
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <p className="mt-2">
        <Link href="/pages/users/list" className="text-blue-600 underline">
          Go to /skills to manage skills
        </Link>
      </p>
    </div>
  );
}
