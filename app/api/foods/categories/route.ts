import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  headers();
  const result = await prisma.foodCategory.findMany({});
  return NextResponse.json(result);
};
export const POST = async (req: NextRequest) => {
  const body: Prisma.FoodCategoryCreateInput = await req.json();
  const result = await prisma.foodCategory.create({ data: body });
  return NextResponse.json(result);
};
