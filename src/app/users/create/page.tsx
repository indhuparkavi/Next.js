import { getSkills } from "@/app/service/skills";
import Form from "../components/Form";

export default async function UserCreate() {
  const skills = await getSkills();

  return (
    <div className="p-6 text-center max-w-4xl m-auto">
      <h1 className="text-2xl font-bold mb-10">Create User</h1>
      <Form skills={skills} />
    </div>
  );
}
