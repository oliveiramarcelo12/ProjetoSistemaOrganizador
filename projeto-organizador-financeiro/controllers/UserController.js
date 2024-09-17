import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        // Definir se o usuário é admin ou colaborador com base no tipo
        const isAdmin = tipo === 'admin';
        const isColaborador = tipo === 'colaborador';

        // Verificar se o e-mail já existe
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        // Criptografar a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Criar novo usuário
        const novoUsuario = new User({ 
            nome, 
            email, 
            password: senhaHash, 
            isAdmin, 
            isColaborador 
        });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: "Erro ao registrar usuário.", error });
    }
};




// Realizar login do usuário
export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Verificar se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: "Login bem-sucedido.", token });
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar login.", error });
    }
};

// Atualizar informações do perfil do usuário
export const atualizarPerfil = async (req, res) => {
    try {
        const { nome, email } = req.body;
        const usuarioAtualizado = await User.findByIdAndUpdate(req.user._id, { nome, email }, { new: true });

        res.status(200).json({ message: "Perfil atualizado com sucesso!", usuarioAtualizado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar perfil.", error });
    }
};

// Deletar um usuário (apenas administrador)
export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar se o usuário é administrador
        if (req.user.tipo !== 'admin') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário.", error });
    }
};

// Listar todos os usuários (apenas administrador)
export const listarUsuarios = async (req, res) => {
    try {
        // Verificar se o usuário é administrador
        if (req.user.tipo !== 'admin') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar usuários.", error });
    }
};
