import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// PUT    /api/experiences/:id    — update
// DELETE /api/experiences/:id    — xóa

export const getAllExperiences = async (req , res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(404).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const experience = await prisma.experiences.findMany({where: {portfolio_id : portfolioId}});
        return res.status(200).json({experience});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Có lỗi server!'});
    }
}

export const getExperience = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(404).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const expId = parseInt(req.params.expId);
        if(isNaN(expId)) return res.status(404).json({message: "Experience không hợp lệ!"});
        const experience = await prisma.experiences.findFirst({where: {id: expId, portfolio_id: portfolioId}});
        if(!experience ) return res.status(404).json({message: "Experience không thuộc về user!"});
        return res.status(200).json({experience});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const createExperience = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const {company,position,description,start_date, end_date ,is_current} = req.body;
        if(!company || !position || !start_date) return res.status(400).json({message: "Nhập thiếu các trường bắt buộc!"});
        if (is_current === false && !end_date) return res.status(400).json({ message: 'Thiếu ngày kết thúc!' });
        const experience = await prisma.experiences.create({data: {portfolio_id: portfolioId, ...req.body}});
        return res.status(201).json({message: "Tạo thành công!", experience});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const updateExperience = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const expId = parseInt(req.params.expId);
        if(isNaN(expId)) return res.status(400).json({message: "Experience không hợp lệ!"});
        const experience = await prisma.experiences.findFirst({where: {id: expId,portfolio_id: portfolioId}});
        if (!experience)return res.status(404).json({message: "Experience không tồn tại!" });
        const {company,position,description,start_date, end_date ,is_current} = req.body;
        const updData = {};
        if(company !== undefined) updData.company = company;
        if(position !== undefined) updData.position = position;
        if(description !== undefined) updData.description = description;
        if(start_date !== undefined) updData.start_date = start_date;
        if(end_date !== undefined) updData.end_date = end_date;
        if(is_current !== undefined) updData.is_current = is_current;
        if (is_current === false && !end_date) return res.status(400).json({ message: 'Thiếu ngày kết thúc!' });
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu để cập nhật!' });
        }
        const updatedExp = await prisma.experiences.update({where: {id: expId}, data: updData});
        return res.status(200).json({message: "Update thành công!", updatedExp});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});
    }
}

export const deleteExperience = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const expId = parseInt(req.params.expId);
        if(isNaN(expId)) return res.status(400).json({message: "Experience không hợp lệ!"});
        const experience = await prisma.experiences.findFirst({where: {id: expId,portfolio_id: portfolioId}});
        if (!experience)return res.status(404).json({message: "Experience không tồn tại!" });
        const deletedExp = await prisma.experiences.delete({where: {id: expId}});
        return res.status(200).json({message: "Đã xóa experience!", deletedExp});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});        
    }
}