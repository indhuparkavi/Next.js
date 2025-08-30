import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="mt-2">
        <Link href="/users/list" className="text-blue-600 underline">
          Go to users list
        </Link>
        <ToastContainer />
      </p>
    </div>
  );
}
