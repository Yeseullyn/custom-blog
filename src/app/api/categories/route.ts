import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
  });
  return NextResponse.json(newCategory);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}