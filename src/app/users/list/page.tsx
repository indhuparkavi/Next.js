"use client";

import { deleteUser, getUsers } from "@/app/service/users";
import { User } from "@/app/types/user";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error("Error fetching Users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      toast.success("Deleted successfully");
      await fetchUsers();
    } catch (err) {
      console.error("Fails to delete", err);
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
        {loading ? (
          <div> Loading...</div>
        ) : (
          <div className="flex flex-col" data-aos="fade-up">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 h-full">
                    <thead>
                      <tr
                        key={"header"}
                        className="bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Address</th>
                        <th className="px-6 py-3">Skills</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-zinc-900">
                      {users.map(({ name, email, address, skills, id }) => (
                        <tr key={id}>
                          <td className="px-6 py-3">{name}</td>
                          <td className="px-6 py-3">{email}</td>
                          <td className="px-6 py-3">
                            {address.st},&nbsp;{address.city},&nbsp;
                            {address.country}
                          </td>
                          <td className="px-6 py-3">
                            {skills?.map((skill) => (
                              <span key={skill}>{skill},&nbsp;</span>
                            ))}
                          </td>
                          <td className="px-6 py-3">
                            <button
                              onClick={() => route.push(`/users/update/${id}`)}
                            >
                              <Pencil className="text-blue-600 pr-1" />
                            </button>
                            <button onClick={() => handleDelete(id)}>
                              <Trash className="text-red-600 pl-1" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
