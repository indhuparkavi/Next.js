"use client";

import { User } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/service/users");
      if (!res.ok) throw new Error("Failed to fetch Users");
      const data = await res.json();
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching Users:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="mx-auto p-4">
        <h1 className="text-2xl mb-8">Users</h1>
        <div className="mt-1 flex">
          <button className="bg-blue-500 text-white px-4 py-2 rounded justify-end">
            <Link href={"/pages/users/create"}>create</Link>
          </button>
        </div>
        <div className="flex flex-col" data-aos="fade-up">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Skills
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.address.st}
                          {user.address.city}
                          {user.address.country}
                        </td>
                        <td>
                          {user.skills?.map((skill) => (
                            <span>{skill}</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
