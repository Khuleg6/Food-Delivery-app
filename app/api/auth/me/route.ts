import { NextRequest, NextResponse, userAgent } from "next/server";
import jwt from "jsonwebtoken";
export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid Token" });
  }
  const [_, token] = authorization.split(" ");
  try {
    const payload = jwt.verify(token, "nuutsOTP");
    return NextResponse.json({ message: "success", user: payload });
  } catch {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }
};
