import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { userSchema } from "./validation";
import { error } from "console";

// GET all users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: { address: true }
        });
        return NextResponse.json(users);
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
            return NextResponse.json({
                error: 'Validation error',
                details: validate.error,
            }, { status: 400 });
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
