// utils/dbConnect.js
import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        // Substitua '<YOUR_MONGODB_URI>' pela URI real do MongoDB
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/projeto-organizador-financeiro';
        if (!uri) {
            throw new Error('A URI do MongoDB não está definida.');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o MongoDB:', error);
        throw error;
    }
};

export default connectMongo;
