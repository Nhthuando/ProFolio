import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const sentContact = async (req , res) => {
    try{
        const slug = req.params.slug;
        const portfolio = await prisma.portfolios.findUnique({ where: { slug } })
        if(!portfolio || !portfolio.is_published) return res.status(404).json({message: "Không tìm thấy portfolio hoặc portfolio chưa được publish"});
        const { name, email, message } = req.body;
        if(!name || !email || !message) return res.status(400).json({message: "Vui lòng điền đầy đủ thông tin"});
        const newContact = await prisma.contacts.create({data: {name,email,message,portfolio_id: portfolio.id}})
        return res.status(201).json({message: "Gửi liên hệ thành công!", newContact});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const getContacts = async (req,res) => {
    try{
        const userId = req.user?.userId;    
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}})
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        const contacts = await prisma.contacts.findMany({where: {portfolio_id: portfolio.id}, orderBy: {created_at: 'desc'}})
        return res.status(200).json(contacts);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }   
}

export const markContactRead = async (req,res) => { 
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}})
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        const contactId = parseInt(req.params.id);
        const contact = await prisma.contacts.findUnique({where: {id: contactId}})
        if(!contact || contact.portfolio_id !== portfolio.id) return res.status(404).json({message: "Không tìm thấy liên hệ"});
        const updatedContact = await prisma.contacts.update({where: {id: contactId}, data: {is_read: true}})
        return res.status(200).json({message: "Đã đánh dấu đã đọc!", updatedContact});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }   
}

export const deleteContact = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}})
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        const contactId = parseInt(req.params.id);
        const contact = await prisma.contacts.findUnique({where: {id: contactId}})
        if(!contact || contact.portfolio_id !== portfolio.id) return res.status(404).json({message: "Không tìm thấy liên hệ"});
        await prisma.contacts.delete({where: {id: contactId}})
        return res.status(200).json({message: "Đã xóa liên hệ!"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }   
}

