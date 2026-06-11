import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@/src/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";

// ==========================================
// 1. ХЭРЭГЛЭГЧ ЗАХИАЛГА ӨГӨХ (POST)
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, totalPrice } = body;

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Захиалгын мэдээлэл дутуу байна." },
        { status: 400 },
      );
    }

    const newOrder = await prisma.$transaction(async (tx) => {
      // 1. FoodOrder үүсгэх
      const order = await tx.foodOrder.create({
        data: {
          userId: userId,
          totalPrice: parseFloat(totalPrice),
          status: "PENDING",
        },
      });

      // 2. Чиний FoodOrderItem модельд тааруулж дата бэлдэх
      const orderItemsData = items.map((item: any) => ({
        orderId: order.id,
        foodId: item.id,
        quantity: parseInt(item.quantity) || 1,
      }));

      // 3. Бөөнөөр нь хадгалах (foodOrderItem)
      await tx.foodOrderItem.createMany({
        data: orderItemsData,
      });

      return order;
    });

    return NextResponse.json(
      { message: "Амжилттай", orderId: newOrder.id },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("❌ БЭКЭНД АЛДАА:", error);
    return NextResponse.json(
      { error: "Захиалга хадгалж чадсангүй.", details: error.message },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. АДМИН БҮХ ЗАХИАЛГЫГ ТАТАЖ ХАРАХ (GET)
// ==========================================
// app/api/orders/route.ts-ийн GET хэсэг
export async function GET(request: Request) {
  try {
    // URL-аас userId байгаа эсэхийг уншина (Жишээ нь: /api/orders?userId=xyz)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Хэрэв userId ирсэн байвал зөвхөн тэр хэрэглэгчийн захиалгыг,
    // байхгүй бол админд зориулж БҮХ захиалгыг татна
    const whereCondition = userId ? { userId: userId } : {};

    const orders = await prisma.foodOrder.findMany({
      where: whereCondition,
      include: {
        user: true,
        foodOrderItems: {
          include: {
            food: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Шинэ захиалга дээрээ харагдана
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Захиалга татахад алдаа гарлаа:", error);
    return NextResponse.json({ error: "Татаж чадсангүй." }, { status: 500 });
  }
}
