import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);
        const user = await prisma.user.findFirst({
            where: { id: userId },
            include: { address: true }
        });
        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}

//PATCH
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);
        const { name, email, address, skills } = await req.json();
        let addressInfo;
        if (!address?.id && (address?.st || address?.city || address?.country)) {
            return NextResponse.json({
                error: 'Bad request',
                details: 'Address id is missing'
            }, { status: 400 });
        }

        if (address?.id) {
            addressInfo = await prisma.address.update({
                where: { id: address.id },
                data: {
                    ...(address?.st && { st: address.st }),
                    ...(address?.city && { st: address.city }),
                    ...(address?.country && { st: address.country })
                }
            })
        }
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(skills && { skills }),
                ...(addressInfo?.id && { addressId: addressInfo.id }),
            },
            include: { address: true }
        });
        console.log(user, 'useruser');

        return NextResponse.json(
            user, { status: 200 }
        );
    } catch (err) {
        NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);
        await prisma.user.delete({
            where: { id: userId },
            include: { address: true }
        });
        return NextResponse.json({ status: 200 });
    } catch (err) {
        NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}