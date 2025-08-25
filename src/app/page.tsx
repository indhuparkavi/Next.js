"use client";

import Link from "next/link";

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="mt-2">
        <Link href="/pages/users/list" className="text-blue-600 underline">
          Go to /skills to manage skills
        </Link>
      </p>
    </div>
  );
}
