'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TransacaoPage() {
  const [transacao, setTransacao] = useState([]);
  const [newTransacao, setNewTransacao] = useState('');
  const [editTransacaoId, setEditTransacaoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const atualizarTransacao = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        return;
    }

    try {
        const response = await fetch(`/api/transacao/${editTransacaoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: editTitle }),
        });

        if (response.ok) {
            const data = await response.json();
            setTransacao(transacao.map((transacao) => 
                (transacao._id === data.data._id ? data.data : transacao))
            );
            setEditTransacaoId(null);
            setEditTitle('');
            setError(null);
        } else {
            setError("Erro ao atualizar transação");
        }
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        setError('Erro ao atualizar transação');
    }
  };

  const deletarTransacao = async (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        return;
    }

    try {
        const response = await fetch(`/api/transacao/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setTransacao(transacao.filter((transacao) => transacao._id !== id));
            setError(null);
        } else {
            setError("Erro ao excluir transação");
        }
    } catch (error) {
        console.error('Erro ao excluir transação:', error);
        setError('Erro ao excluir transação');
    }
  };

  // Restante do componente
}
