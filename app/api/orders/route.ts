import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // 🌟 Зөвхөн глобал prisma-гаа ашиглана, хуучин ашиглаагүй PrismaClient-ийг устгав

// ==========================================
// 1. ХЭРЭГЛЭГЧ ЗАХИАЛГА ӨГӨХ (POST)
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 🌟 ЗАСВАР: Урд талаас илгээсэн address-ийг задалж авна
    const { userId, items, totalPrice, address } = body;

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Захиалгын мэдээлэл дутуу байна." },
        { status: 400 },
      );
    }

    const newOrder = await prisma.$transaction(async (tx) => {
      // 🌟 ШИНЭ: Хэрэглэгч хаягаа оруулсан бол түүнийг нь датабааз дээр нь хадгалж шинэчилнэ
      if (address && address.trim() !== "") {
        await tx.user.update({
          where: { id: userId },
          data: { address: address },
        });
      }

      // 1. FoodOrder үүсгэх
      const order = await tx.foodOrder.create({
        data: {
          userId: userId,
          totalPrice: parseFloat(totalPrice),
          status: "PENDING",
        },
      });

      // 2. FoodOrderItem модельд тааруулж дата бэлдэх
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
// 2. АДМИН БҮХ ЗАХИАЛГЫГ ТАТАЖ ХАРАХ / ХЭРЭГЛЭГЧ ӨӨРИЙНХИЙГӨӨ ХАРАХ (GET)
// ==========================================
export async function GET(request: Request) {
  try {
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
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Захиалга татахад алдаа гарлаа:", error);
    return NextResponse.json({ error: "Татаж чадсангүй." }, { status: 500 });
  }
}
