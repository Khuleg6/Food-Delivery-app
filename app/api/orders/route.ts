import { NextResponse } from "next/server";
// Prisma client-ийн зөв замаа өөрийнхөөрөө шалгаарай
import { PrismaClient } from "@/src/generated/prisma/client";

const prisma = new PrismaClient({} as any);

// Next.js-д POST хүсэлтийг ингэж хүлээж авдаг
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, totalPrice } = body;

    // Баталгаажуулалт (Validation)
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Захиалгын мэдээлэл дутуу байна." },
        { status: 400 },
      );
    }

    // Database Transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      // 1. FoodOrder хүснэгтэд захиалга үүсгэх
      const order = await tx.foodOrder.create({
        data: {
          userId: userId,
          totalPrice: totalPrice,
          status: "PENDING",
        },
      });

      // 2. Бэлдсэн хоолнуудыг FoodOrderItem бүтцэд тааруулж массив бэлдэх
      const orderItemsData = items.map((item: any) => ({
        orderId: order.id,
        foodId: item.id,
        quantity: item.quantity,
      }));

      // 3. Бэлдсэн хоолнуудаа FoodOrderItem хүснэгт рүү бөөнөөр нь оруулах
      await tx.foodOrderItem.createMany({
        data: orderItemsData,
      });

      return order;
    });

    return NextResponse.json(
      {
        message: "Хоолны захиалга амжилттай баталгаажлаа.",
        orderId: newOrder.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Захиалга хадгалахад алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Захиалгыг өгөгдлийн санд хадгалахад алдаа гарлаа." },
      { status: 500 },
    );
  }
}
