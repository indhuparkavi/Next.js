const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSkills() {
    const res = await fetch(`${baseUrl}/service/skills`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const skills = await res.json();
    return skills;
}