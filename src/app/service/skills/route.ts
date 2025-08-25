import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        const skills = await prisma.skill.findMany();
        return NextResponse.json(skills);
    } catch (err) {
        NextResponse.json({
            error: 'Internal server error',
        }, { status: 500 });
    }
}
