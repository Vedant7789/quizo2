import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { title } = req.body;
    const quiz = await prisma.quiz.create({
      data: { title, userId: session.user.id },
    });
    return res.status(201).json(quiz);
  }

  if (req.method === "GET") {
    const quizzes = await prisma.quiz.findMany({ where: { userId: session.user.id } });
    return res.status(200).json(quizzes);
  }

  return res.status(405).end();
}