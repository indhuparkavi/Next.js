"use client";

import { createUser, updateUser } from "@/app/service/users";
import { User } from "@/app/types/user";
import { Skill } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { EMAIL_PATTERN } from "@/constant/regex";

interface FormProps {
  skills: Skill[];
  user?: User;
}
export default function Form({ skills, user }: FormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  async function onSubmit(data: User) {
    try {
      const path = user ? "/users/list" : "list";
      if (user) {
        await updateUser(data, user.id);
      } else {
        await createUser(data);
      }
      reset();
      router.push(path);
    } catch (err) {
      console.error("Component error:", err);
    }
  }

  return (
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
              className="text-black"
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
        Save
      </button>
    </form>
  );
}
