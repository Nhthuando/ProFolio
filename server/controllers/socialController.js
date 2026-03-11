import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSocials = async (req , res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Id portfolio không hợp lệ!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Portfolio không tồn tại hoặc không thuộc sở hữu user!"});
        const socials = await prisma.social_links.findMany({where: {portfolio_id : portfolioId}});
        return res.status(200).json({socials});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const getSocial = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Id portfolio không hợp lệ!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Portfolio không tồn tại hoặc không thuộc sở hữu user!"});
        const socialId = parseInt(req.params.socialId);
        if(isNaN(socialId)) return res.status(400).json({message: "Id Social không hợp lệ!"});
        const social = await prisma.social_links.findFirst({where: { id: socialId,portfolio_id: portfolioId}});
        if(!social) return res.status(404).json({message: "Social không tồn tại hoặc không thuộc user!"});
        return res.status(200).json({social});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const createSocial = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const {platform, url} = req.body;
        if(!platform || !url) return res.status(400).json({message: "Nhập thiếu các trường bắt buộc!"});
        const social = await prisma.social_links.create({data: {portfolio_id: portfolioId, ...req.body}});
        return res.status(201).json({message: "Tạo thành công!", social});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const updateSocial = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const socialId = parseInt(req.params.socialId);
        if(isNaN(socialId)) return res.status(400).json({message: "Social không hợp lệ!"});
        const social = await prisma.social_links.findFirst({where: {id: socialId,portfolio_id: portfolioId}});
        if (!social)return res.status(404).json({message: "Social không tồn tại!" });
        const {platform, url} = req.body;
        const updData = {};
        if(platform !== undefined) updData.platform = platform;
        if(url !== undefined) updData.url = url;
        const updatedSocial = await prisma.social_links.update({where: {id: socialId}, data: updData});
        return res.status(200).json({message: "Update thành công!", updatedSocial});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});
    }
}

export const deleteSocial = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const socialId = parseInt(req.params.socialId);
        if(isNaN(socialId)) return res.status(400).json({message: "Social không hợp lệ!"});
        const social = await prisma.social_links.findFirst({where: {id:  socialId,portfolio_id: portfolioId}});
        if (!social)return res.status(404).json({message: "Social không tồn tại!" });
        const deletedSocial = await prisma.social_links.delete({where: {id: socialId}});
        return res.status(200).json({message: "Đã xóa Social!", deletedSocial});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});        
    }
}