import { User } from "@/app/types/user";

export async function getUsers() {
    const res = await fetch("/service/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const users = await res.json();
    return users;
}

export async function createUser(payload: User) {
    try {
        const res = await fetch("/service/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return await res.json();
    } catch (err) {
        throw err;
    }
}