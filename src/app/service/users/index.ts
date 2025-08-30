import { User } from "@/app/types/user";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function getUsers() {
    const res = await fetch("/service/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const users = await res.json();
    return users;
}

export async function getUser(id: string) {
    const res = await fetch(`${baseUrl}/service/users/${id}`, {
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

export async function updateUser(payload: User, id: number) {
    try {
        const res = await fetch(`/service/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        console.log(res);

        return await res.json();
    } catch (err) {
        console.log(err, 'erer');
        throw err;
    }
}

export async function deleteUser(id: number) {
    await fetch(`${baseUrl}/service/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}