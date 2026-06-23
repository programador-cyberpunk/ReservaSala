import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { AuthRequest } from '../middlewares/auth';
import User from '../models/User/tsx';


export async function register = async (req: Request, res: Response) => {
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }
}
  //pra nao salvar a senha so com texto
export const register  async(req: , res: )=>{
  try{
    const {nome, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.reate({name, email, password: hashedPassword, role});
    res.status(201).json({message: "Usuario foi criado com suceso!"});    
  }catch(error: any){

  }
}
  // TODO (T01): implementar após configurar Prisma schema
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, role: true },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' }
    );

    return res.status(201).json({ token, user });
  } catch (error: any) {
    if(error.code === 1100) return res.status(400).json({error: "Este email ja foi cadastrado..."});
    res.status(500).json({error: "Erro no servidor...."});
  }
    const err = e as { code?: string };
    if (err.code === 'P2002') {//
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }
    return res.status(500).json({ error: 'Erro interno.' });
  


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' }
  );

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

// T07: retorna dados do usuário autenticado a partir do token
export async function me(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  return res.json(user);
}

//verificar se o usuario é um admin
export const VerificaAdmin = (req: AuthRequest, res: Response, next: Function) => {
  
}