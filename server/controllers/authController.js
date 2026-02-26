import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export const dangky = async (req, res) => {
    try{
        const { email, password, full_name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Thiếu email hoặc mật khẩu' });
        }

        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userFullName = full_name?.trim() || email.split('@')[0];
        const newUser = await prisma.users.create({
            data: {
                id: randomUUID(),
                full_name: userFullName,
                email,
                password_hash: hashedPassword,
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                avatar_url: true,
                created_at: true,
            }
        });

        res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
                    }
};


export const dangnhap = async (req, res) => {
    try {
        const { email, password } = req.body;  
        if (!email || !password) {
            return res.status(400).json({ message: 'Thiếu email hoặc mật khẩu' });
        }
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email không tồn tại' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }
        res.status(200).json({ message: 'Đăng nhập thành công', user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            avatar_url: user.avatar_url,
            created_at: user.created_at,
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }      
};