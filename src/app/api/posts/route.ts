import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      youtubeUrl: data.youtubeUrl || null,
      categoryId: data.categoryId,
    },
  });
  return NextResponse.json(newPost);
}