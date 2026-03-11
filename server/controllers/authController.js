import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const register = async (req,res) => {
    try{
        const {email,password, name} = req.body;
        const existUser = await prisma.users.findUnique({where: {email}});
        if(existUser) return res.status(400).json({message: 'Tài khoản đã tồn tại!', email});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
        data: {email, password: hashedPassword, name}
        })
        return res.status(201).json({message: 'Tạo tài khoản thành công!', user:{id: user.id, email, name}});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi Server!', err});
    }
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await prisma.users.findUnique({where: {email}});
        if(!user) return res.status(401).json({message: 'Tài khoản hoặc mật khẩu không chính xác!'});
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) return res.status(401).json({message: 'Tài khoản hoặc mật khẩu không chính xác!'});
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
        return res.status(200).json({message: 'Đăng nhập thành công!', token,  user: {
    id: user.id,
    email: user.email,
    name: user.name
}});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}