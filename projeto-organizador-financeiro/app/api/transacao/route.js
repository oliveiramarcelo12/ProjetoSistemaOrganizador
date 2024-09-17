import { listarTransacoes,criarTransacao } from "@/controllers/TransacaoController";
import { NextResponse } from "next/server";


export async function GET(userId) {
    try {
        const transacao = await listarTransacoes(userId);
        return NextResponse.json({
            success:true,
            data:transacao
        });
    } catch (error) {
        console.error(error,"Route");
        return NextResponse.json(
            {success:false},
            {status:400}
        );
    }
}


export async function POST(request) {
    try {
        const data = await request.json();
        const task = await criarTransacao(data);
        return NextResponse.json({
            success:true,
            data:transacao
        })
    } catch (error) {
        console.error(error,"Route");
        return NextResponse.json(
            {success:false},
            {status:400}
        );
    }
   
}
