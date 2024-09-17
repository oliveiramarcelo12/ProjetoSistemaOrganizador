import { atualizarTransacao, deletarTransacao } from "@/controllers/TransacaoController"
import { NextResponse } from "next/server"


export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const transacao = await atualizarTransacao(params.id, data);
        if (!transacao) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        return NextResponse.json({ success: true, data: transacao });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}


export async function DELETE({params}) {
    try {
        const transacao = await deletarTransacao(params.id);
        if (!transacao) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        return NextResponse.json({success: true, message: "Deletado com Sucesso"});
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}


