import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  headers();
  const result = await prisma.food.findMany({ include: { category: true } });
  return NextResponse.json(result);
};
export const POST = async (req: NextRequest) => {
  const { categoryId, ...restBody }: Prisma.FoodUncheckedCreateInput =
    await req.json();
  const result = await prisma.food.create({
    data: {
      ...restBody,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    include: {
      category: true,
    },
  });
  return NextResponse.json(result);
};
