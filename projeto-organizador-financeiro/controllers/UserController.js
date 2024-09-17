import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

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
            password: senhaHash 
        });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: "Erro ao registrar usuário.", error });
    }
};




import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Verificar se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, usuario.password);
        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Definir URL de redirecionamento
        const redirectUrl = '/transacoes'; // URL para a página de transações

        res.status(200).json({ message: "Login bem-sucedido.", token, redirectUrl });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: "Erro ao realizar login.", error });
    }
};



export const atualizarPerfil = async (req, res) => {
    try {
        const { nome, email } = req.body;
        const usuarioAtualizado = await User.findByIdAndUpdate(req.user._id, { nome, email }, { new: true });

        res.status(200).json({ message: "Perfil atualizado com sucesso!", usuarioAtualizado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar perfil.", error });
    }
};


export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário.", error });
    }
};



