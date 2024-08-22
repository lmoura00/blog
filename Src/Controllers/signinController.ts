import { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const SECRET_KEY = "Do&A0:P50))wNg|Qb<l[Y9L]>3ZkM3";
export async function signinController(request: Request, response: Response) {
  const { email, password } = request.body;
  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!userExist) {
    return response.json({ erro: "Credenciais invalidas" });
  }
  const isValidPassword = await bcrypt.compare(password, userExist.password);
  if (!isValidPassword) {
    return response.json({ erro: "Credenciais invalidas" });
  }
  const token = await jwt.sign({
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
  }, SECRET_KEY);
  return response.json(token)
}
