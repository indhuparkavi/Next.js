import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { userSchema } from "./validation";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: { address: true }
        });
        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}

// POST create user
export async function POST(req: Request) {
    try {
        const { name, email, address, skills } = await req.json();
        const data = {
            name,
            email,
            address,
            skills
        };
        const validate = userSchema.safeParse(data);
        if (!validate.success) {
            throw new Error(JSON.stringify({
                type: 'ValidationError',
                details: validate.error.message,
            }))
        }

        const addressInfo = await prisma.address.create({
            data: address
        });

        const user = await prisma.user.create({
            data: {
                name,
                email,
                addressId: addressInfo.id,
                skills
            }, include: { address: true }
        });

        return NextResponse.json(
            user, { status: 201 }
        );
    } catch (err) {
        NextResponse.json({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}
