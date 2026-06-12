import { prisma } from "@/app/lib/prisma"; // Өөрийн prisma замаар солиорой
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    // 💡 ЧУХАЛ ЗАСВАР: Next.js-ийн хувилбараас хамаарч params-ийг найдвартай авах
    const resolvedParams = await params;
    const orderId = resolvedParams.id;

    const body = await request.json();
    const { status } = body; // Урд талаас "DELIVERED" эсвэл "CANCELED" ирнэ

    if (!orderId) {
      return NextResponse.json(
        { error: "Захиалгын ID олдсонгүй." },
        { status: 400 },
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Шинэ статус (status) илгээгээгүй байна." },
        { status: 400 },
      );
    }

    // Prisma дээр захиалгыг шинэчлэх
    const updatedOrder = await prisma.foodOrder.update({
      where: {
        id: orderId,
      },
      data: {
        status: status, // Хэрэв датабааз дээр чинь Enum бол яг зөв string утга очих ёстой
      },
    });

    return NextResponse.json({
      message: "Захиалга амжилттай шинэчлэгдлээ",
      updatedOrder,
    });
  } catch (error: any) {
    console.error("❌ BACKEND PUT ERROR:", error);

    // Алдааны дэлгэрэнгүйг урд тал руу харуулах
    return NextResponse.json(
      {
        error: "Сервер дээр алдаа гарлаа.",
        message: error.message,
        code: error.code, // Prisma алдааны код
      },
      { status: 500 },
    );
  }
}
