"use client";

import { getUsers } from "@/app/service/users";
import { User } from "@/app/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error("Error fetching Users:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="mx-auto p-4">
        <h1 className="text-2xl mb-8">Users</h1>
        <div className="mt-1 flex">
          <button className="bg-blue-500 text-white px-4 py-2 rounded justify-end">
            <Link href={"/users/create"}>create</Link>
          </button>
        </div>
        <div className="flex flex-col" data-aos="fade-up">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 h-full">
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
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-zinc-900">
                    {users.map(({ name, email, address, skills, id }) => (
                      <tr>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>
                          {address.st},&nbsp;{address.city},&nbsp;
                          {address.country}
                        </td>
                        <td>
                          {skills?.map((skill) => (
                            <span>{skill},&nbsp;</span>
                          ))}
                        </td>
                        <td>
                          <button
                            onClick={() => route.push(`/users/create/${id}`)}
                          >
                            Edit
                          </button>
                          <button> Delete</button>
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
