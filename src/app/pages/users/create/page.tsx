"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/service/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    redirect("/pages/users/list");
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
    </div>
  );
}
