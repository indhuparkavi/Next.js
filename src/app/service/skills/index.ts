export async function getSkills() {
    const res = await fetch("/service/skills", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const skills = await res.json();
    return skills;
}