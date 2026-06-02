import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  headers();
  const result = await prisma.foodCategory.findMany({
    include: {
      _count: {
        select: {
          foods: true,
        },
      },
    },
  });
  return NextResponse.json(result);
};
export const POST = async (req: NextRequest) => {
  const body: Prisma.FoodCategoryCreateInput = await req.json();
  const result = await prisma.foodCategory.create({ data: body });
  return NextResponse.json(result);
};
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Фронтендээс ирэх body-г уншина
    const { id, categoryName } = body;

    if (!id || !categoryName) {
      return NextResponse.json(
        { message: "ID эсвэл Нэр дутуу байна." },
        { status: 400 },
      );
    }

    const result = await prisma.foodCategory.update({
      where: { id: id },
      data: { categoryName: categoryName },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Засахад алдаа гарлаа" },
      { status: 500 },
    );
  }
};
export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json(); // 👈 URL-аас биш, шууд Body-оос id-г авна!
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID дутуу байна." }, { status: 400 });
    }

    const result = await prisma.foodCategory.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Амжилттай устлаа", result });
  } catch (error) {
    return NextResponse.json(
      { message: "Устгахад алдаа гарлаа" },
      { status: 500 },
    );
  }
};
