import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { error } from "console";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  headers();
  const result = await prisma.food.findMany({ include: { category: true } });
  return NextResponse.json(result);
};
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
export const DELETE = async (request : Request)=>{
  try{
    const body = await request.json();
  const {id} = body
if(!id){
  return NextResponse.json({error: 'Food ID required'},{status:400});
}
const deletedfood = await prisma.food.delete({
  where:{
    id: id,
  }
})  
return NextResponse.json({message: "Successfully Deleted", deletedfood});
}catch(error){
  console.error("Error", error);
  return NextResponse.json({error: "server error"},{status: 500});
}
}