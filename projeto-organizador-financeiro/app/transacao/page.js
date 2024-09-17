'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TransacaoPage() {
  const [transacao, setTransacao] = useState([]);
  const [newTransacao, setNewTransacao] = useState('');
  const [editTransacaoId, setEditTransacaoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTransacao = async () => {
      console.log('Fetching transactions...');
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token, redirecting to login...');
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/transacao', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Transactions fetched:', data.data);
          setTransacao(data.data);
        } else {
          console.log('Failed to fetch transactions, redirecting to login...');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        router.push('/login');
      }
    };

    fetchTransacao();
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
        body: JSON.stringify({ title: newTransacao }),
      });

      if (response.ok) {
        const data = await response.json();
        setTransacao([...transacao, data.data]);
        setNewTransacao('');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransacao = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/transacao`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      setTransacao(transacao.filter((transacao) => transacao._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const startEditTransacao = (transacao) => {
    setEditTransacaoId(transacao._id);
    setEditTitle(transacao.title);
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
        body: JSON.stringify({ id: editTransacaoId, title: editTitle }),
      });

      if (response.ok) {
        const data = await response.json();
        setTransacao(
          transacao.map((transacao) => (transacao._id === data.data._id ? data.data : transacao))
        );
        setEditTransacaoId(null);
        setEditTitle('');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <header className="header">
        <h1>Transações</h1>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </header>
      <div className="transacao-container">
        <h2 className="transacao-title">To-Do List</h2>
        <div className="add-transacao-container">
          <input
            type="text"
            className="input-field"
            placeholder="Nova tarefa"
            value={newTransacao}
            onChange={(e) => setNewTransacao(e.target.value)}
          />
          <button className="add-button" onClick={addTransacao}>Adicionar Tarefa</button>
        </div>
        <ul className="transacao-list">
          {transacao.map((transacao) => (
            <li key={transacao._id} className="transacao-item">
              {editTransacaoId === transacao._id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button className="add-button" onClick={updateTransacao}>Salvar</button>
                </>
              ) : (
                <>
                  {transacao.title}
                  <button className="add-button" onClick={() => deleteTransacao(transacao._id)}>Excluir</button>
                  <button className="add-button" onClick={() => startEditTransacao(transacao)}>Editar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
