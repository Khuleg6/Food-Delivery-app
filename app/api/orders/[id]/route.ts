import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { status } = body; // PENDING, DELIVERED, CANCELED

    const updatedOrder = await prisma.foodOrder.update({
      where: { id: params.id },
      data: { status: status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Статус өөрчлөхөд алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Захиалгын төлөвийг шинэчилж чадсангүй." },
      { status: 500 },
    );
  }
}
