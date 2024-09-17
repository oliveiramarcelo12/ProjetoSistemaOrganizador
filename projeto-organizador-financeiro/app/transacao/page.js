"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TransacaoPage() {
  const [transacoes, setTransacoes] = useState([]);
  const [novaTransacao, setNovaTransacao] = useState({
    tipo: 'receita',
    valor: '',
    descricao: '',
    categoria: ''
  });
  const [editTransacaoId, setEditTransacaoId] = useState(null);
  const [editTransacao, setEditTransacao] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
  
        const response = await fetch('/api/transacao', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setTransacoes(data || []);
        } else if (response.status === 401) {
          router.push('/login');
        } else {
          setError('Erro ao obter transações');
        }
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
        setError('Erro ao buscar transações');
      }
    };
  
    fetchTransacoes();
  }, [router]);
  
  const addTransacao = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/transacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaTransacao),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Verifique se data tem a estrutura esperada
        if (data && data._id) {
          setTransacoes([...transacoes, data]);
          setNovaTransacao({
            tipo: 'receita',
            valor: '',
            descricao: '',
            categoria: ''
          });
          setError('');
          setSuccessMessage('Transação adicionada com sucesso!');
        } else {
          setError('Erro ao adicionar transação');
          setSuccessMessage('');
        }
      } else {
        const errorText = await response.text();
        setError(`Erro ao adicionar transação: ${errorText}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      setError('Erro ao adicionar transação');
      setSuccessMessage('');
    }
  };
  
  

  const updateTransacao = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/transacao`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...editTransacao, id: editTransacaoId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data._id) {
          setTransacoes(
            transacoes.map((item) =>
              item._id === data._id ? data : item
            )
          );
          setEditTransacaoId(null);
          setEditTransacao({});
          setSuccessMessage('Transação atualizada com sucesso!');
          setError('');
        } else {
          setError('Erro ao atualizar transação');
          setSuccessMessage('');
        }
      } else {
        setError('Erro ao atualizar transação');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      setError('Erro ao atualizar transação');
      setSuccessMessage('');
    }
  };

  const deleteTransacao = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/transacao?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTransacoes(transacoes.filter((item) => item._id !== id));
        setSuccessMessage('Transação excluída com sucesso!');
        setError('');
      } else {
        setError('Erro ao excluir transação');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      setError('Erro ao excluir transação');
      setSuccessMessage('');
    }
  };

  const startEditTransacao = (transacao) => {
    setEditTransacaoId(transacao._id);
    setEditTransacao(transacao);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <div className="transacao-page">
      <header className="header">
        <h1>Transações</h1>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </header>
      <div className="transacao-container">
        <h2 className="transacao-title">Gerenciar Transações</h2>
        <div className="add-transacao-container">
          <input
            type="text"
            placeholder="Valor"
            value={novaTransacao.valor}
            onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={novaTransacao.descricao}
            onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={novaTransacao.categoria}
            onChange={(e) => setNovaTransacao({ ...novaTransacao, categoria: e.target.value })}
          />
          <select
            value={novaTransacao.tipo}
            onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: e.target.value })}
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
          <button onClick={addTransacao}>Adicionar</button>
        </div>
  
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
  
        <ul className="transacao-list">
          {Array.isArray(transacoes) && transacoes.length > 0 ? (
            transacoes.map((item) => (
              <li key={item._id} className="transacao-item">
                {editTransacaoId === item._id ? (
                  <div className="edit-transacao-container">
                    <input
                      type="text"
                      value={editTransacao.valor}
                      onChange={(e) => setEditTransacao({ ...editTransacao, valor: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editTransacao.descricao}
                      onChange={(e) => setEditTransacao({ ...editTransacao, descricao: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editTransacao.categoria}
                      onChange={(e) => setEditTransacao({ ...editTransacao, categoria: e.target.value })}
                    />
                    <select
                      value={editTransacao.tipo}
                      onChange={(e) => setEditTransacao({ ...editTransacao, tipo: e.target.value })}
                    >
                      <option value="receita">Receita</option>
                      <option value="despesa">Despesa</option>
                    </select>
                    <button onClick={updateTransacao}>Salvar</button>
                  </div>
                ) : (
                  <div className="transacao-item-content">
                    <span>{item.valor} - {item.descricao} - {item.categoria}</span>
                    <div className="transacao-actions">
                      <button onClick={() => startEditTransacao(item)}>Editar</button>
                      <button onClick={() => deleteTransacao(item._id)}>Excluir</button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>Nenhuma transação disponível.</p>
          )}
        </ul>
      </div>
    </div>
  );
  
}
