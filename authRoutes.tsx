import {Router} from 'express',
import {register, login, me} from '../controller/authController';
import { adminMiddleware, authMiddleWare } from './auth';

const router = Router();

//as rotas publicas
router.post('/register', register);
router.post('/login', login);
//rota autenticada pra qualquer usuario logado
router.get('/me', authMiddleWare, me);
//essa é pro ADMIN
router.delete('/admin/deletar-reserva/:id', authMiddleWare, adminMiddleware, (req, res) =>{
    json({message: "reserva foi deletada com sucesso por um admin"});
});
export default router;