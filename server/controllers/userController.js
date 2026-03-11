import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getUser = async (req , res) => {
    try{
        const userId = req.user.userId;
    if(!userId) return res.status(401).json({message: 'Không tìm thấy user!'});
    const user = await prisma.users.findUnique({where: {id : userId}, select: {email : true, name : true, avatar : true, created_at : true,updated_at : true }})
    if(!user) return res.status(404).json({message: "User không tồn tại"});
    return res.status(200).json({user});
    } catch(err){
        res.status(500).json({message: 'Có lỗi server!', err});
    }
}
export const updateUser = async (req,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(404).json({message: 'Không tìm thấy user!'});
        const {name,avatar} = req.body;
        if(!name && !avatar) return res.status(400).json({message: "Không có dữ liệu cập nhật"});

        const updatedUser = await prisma.users.update({where: {id: userId},data: {name,avatar}, select: {email : true, name : true, avatar : true, created_at : true,updated_at : true }});
        return res.status(200).json({message: 'Update user thành công!', updatedUser});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}