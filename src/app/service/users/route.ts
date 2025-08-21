import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET all users
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

// POST create user
export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        },
    });
    return NextResponse.json(user);
}
