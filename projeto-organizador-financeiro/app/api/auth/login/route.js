import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { email, password } = await request.json();
    await connectMongo();
    
    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json({ success: false, message: "Credenciais inválidas" }, { status: 400 });
        }

        // Criar o token de autorização
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ success: true, token, nome: user.nome });

    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return NextResponse.json({ success: false, message: "Erro ao autenticar usuário" }, { status: 500 });
    }
}

