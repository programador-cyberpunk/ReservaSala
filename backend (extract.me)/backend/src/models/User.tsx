// Modelo gerenciado pelo Prisma — ver prisma/schema.prisma
// Role: USER | ADMIN
// Campos: id, name, email, passwordHash, role, createdAt
import mongoose from 'mongoose';

export { };
const Userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true}, //evitar zika de conflitos de nomes
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    createdAt: { type: Date, default: Date.now},
});
export default mongoose.model('User', Userschema);
