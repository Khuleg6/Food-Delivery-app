import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// ==========================================
// 1. БҮХ ХООРЛЫГ ТАТАХ (GET)
// ==========================================
export const GET = async () => {
  headers();
  const result = await prisma.food.findMany({ include: { category: true } });
  return NextResponse.json(result);
};

// ==========================================
// 2. ШИНЭ ХООЛ ҮҮСГЭХ (POST)
// ==========================================
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

// ==========================================
// 3. ХОЛНЫ МЭДЭЭЛЭЛ ЗАСАХ (PUT) -> 🌟 ШИНЭЭР НЭМЭВ!
// ==========================================
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id, foodName, price, ingredients, image, categoryId } = body;

    // ID байхгүй бол алдаа буцаана
    if (!id) {
      return NextResponse.json(
        { error: "Хоолны ID (id) шаардлагатай." },
        { status: 400 },
      );
    }

    // Prisma ашиглан хоолны мэдээллийг шинэчлэх
    const updatedFood = await prisma.food.update({
      where: { id: id },
      data: {
        foodName: foodName,
        price: parseFloat(price) || 0, // Найдвартай тоо руу хөрвүүлнэ
        ingredients: ingredients,
        image: image,
        // Хэрэв категори өөрчлөгдсөн бол шинэ категоритой нь холбоно
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
      include: {
        category: true, // Шинэчлэгдсэн категорийг хамт буцаана
      },
    });

    return NextResponse.json({
      message: "Амжилттай шинэчлэгдлээ",
      updatedFood,
    });
  } catch (error: any) {
    console.error("❌ PUT BACKEND ERROR:", error);
    return NextResponse.json(
      { error: "Сервер дээр алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
};

// ==========================================
// 4. ХООЛ УСТГАХ (DELETE)
// ==========================================
export const DELETE = async (request: Request) => {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Food ID required" }, { status: 400 });
    }

    const deletedfood = await prisma.food.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "Successfully Deleted", deletedfood });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};
