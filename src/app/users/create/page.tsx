"use client";

import { User } from "@/app/types/user";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "@/constant/regex";
import { Skill } from "@prisma/client";
import { getSkills } from "@/app/service/skills";
import { createUser } from "@/app/service/users";
import Select from "react-select";
import { useRouter } from "next/navigation";

export default function UserCreate() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    (async () => {
      const skills = await getSkills();
      setSkills(skills);
    })();
  }, []);

  async function onSubmit(data: User) {
    try {
      await createUser(data);
      reset();
      router.push("list");
    } catch (err) {
      console.error("Component error:", err);
    }
  }

  return (
    <div className="p-6 text-center max-w-4xl m-auto">
      <h1 className="text-2xl font-bold mb-10">Users</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="mb-8">
          <input
            placeholder="Name"
            {...register("name", { required: true })}
            className="border p-2 rounded-t-2xl w-full"
          />
          {errors.name && <span>Name is required</span>}
        </div>
        <div className="mb-8">
          <input
            {...register("email", {
              required: true,
              pattern: EMAIL_PATTERN,
            })}
            className="border p-2 rounded-t-2xl w-full"
            placeholder="Email"
          />
          {errors.email && <span>Please enter valid email</span>}
        </div>
        <div className="mb-8">
          <input
            {...register("address.st", { required: true })}
            className="border p-2 rounded-t-2xl w-full"
            placeholder="Street"
          />
          {errors.address?.st && <span>Street is required</span>}
        </div>
        <div className="mb-8">
          <input
            {...register("address.city", { required: true })}
            className="border p-2 rounded-t-2xl w-full"
            placeholder="City"
          />
          {errors.address?.city && <span>This field is required</span>}
        </div>
        <div className="mb-8">
          <input
            {...register("address.country", { required: true })}
            className="border p-2 rounded-t-2xl w-full"
            placeholder="Country"
          />
          {errors.address?.country && <span>This field is required</span>}
        </div>
        <div>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                options={skills}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                isMulti
                value={skills.filter((s) => field.value?.includes(s.name))} // map field value back to options
                onChange={(selected) => {
                  field.onChange(selected.map((s) => s.name)); // store only names in form state
                }}
              />
            )}
          />
        </div>
        <button className="mt-10 bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
