import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.email) {
    return NextResponse.json(
      { message: "Имэйл шаардлагатай! " },
      { status: 400 },
    );
  }
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailregex.test(body.email)) {
    return NextResponse.json(
      { message: "Буруу Имэйл оруулсан байна!" },
      { status: 400 },
    );
  }
  if (!body.otp) {
    return NextResponse.json({ message: "OTP шаардлагатай!" });
  }
  const otpRegex = /\d{4}/;
  if (!otpRegex.test(body.otp)) {
    return NextResponse.json({ message: "OTP буруу байна!" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    return NextResponse.json(
      { message: "Хэрэглэгч олдсонгүй" },
      { status: 404 },
    );
  }

  try {
    const payload = jwt.verify(user.otp!, "nuuts") as { otp: string };
    if (payload.otp !== body.otp) {
      return NextResponse.json(
        { message: "OTP буруу байна!" },
        { status: 404 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "OTP хугацаа дууссан байна!" },
      { status: 404 },
    );
  }
  const accessToken = jwt.sign(user, "nuutsOTP", { expiresIn: "1h" });

  return NextResponse.json({ message: "Амжилттай!", accessToken });
};
