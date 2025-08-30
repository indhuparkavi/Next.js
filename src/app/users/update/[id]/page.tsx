import { getSkills } from "@/app/service/skills";
import { getUser } from "@/app/service/users";
import Form from "@/app/users/components/Form";

export default async function UpateCreate({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const skills = await getSkills();
  const user = await getUser(id);

  return (
    <div className="p-6 text-center max-w-4xl m-auto">
      <h1 className="text-2xl font-bold mb-10">Update User</h1>
      <Form skills={skills} user={user} />
    </div>
  );
}
