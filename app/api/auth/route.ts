import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateOtp = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.email) {
    return NextResponse.json(
      { message: "Email is Required " },
      { status: 400 },
    );
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(body.email)) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  let user = await prisma.user.findUnique({ where: { email: body.email } });
  const otp = generateOtp();
  const token = jwt.sign({ otp }, "nuuts", { expiresIn: "5m" });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: body.email,
        otp: token,
      },
    });
  } else {
    user = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        otp: token,
      },
    });
  }
  await resend.emails.send({
    from: "noreply@resend.dev",
    to: body.email,
    subject: "Таны нэг удаагын нэвртэх код",
    html: `<p>Код: <strong>${otp}</strong>!</p>`,
  });
  return NextResponse.json({ message: "Success! Check your email" });
};
