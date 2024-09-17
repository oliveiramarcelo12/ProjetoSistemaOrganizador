// pages/api/auth/register.js
import { User } from '@/models/User';
import connectMongo from "@/utils/dbConnect";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectMongo();  // Certifique-se de conectar ao MongoDB

    const data = await request.json();

    try {
        // Verificar se o e-mail já existe
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "E-mail já cadastrado." }, { status: 400 });
        }

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Criar novo usuário
        const user = await User.create(data);
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return NextResponse.json({ success: false, message: "Erro ao registrar usuário.", error }, { status: 500 });
    }
}
