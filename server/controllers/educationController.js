import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET    /api/educations        — lấy tất cả
// GET    /api/educations/:id    — lấy 1
// POST   /api/educations        — tạo mới
// PUT    /api/educations/:id    — update
// DELETE /api/educations/:id    — xóa

export const getAllEducations = async (req , res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Id portfolio không hợp lệ!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Portfolio không tồn tại hoặc không thuộc sở hữu user!"});
        const educations = await prisma.educations.findMany({where: {portfolio_id : portfolioId}});
        return res.status(200).json({educations});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const getEducation = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Id portfolio không hợp lệ!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "Portfolio không tồn tại hoặc không thuộc sở hữu user!"});
        const educationId = parseInt(req.params.eduId);
        if(isNaN(educationId)) return res.status(400).json({message: "Id education không hợp lệ!"});
        const education = await prisma.educations.findFirst({where: { id: educationId,portfolio_id: portfolioId}});
        if(!education) return res.status(404).json({message: "Education không tồn tại hoặc không thuộc user!"});
        return res.status(200).json({education});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const createEducation = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const {school, major, degree, start_date, end_date, is_current} = req.body;
        if(!school || !start_date) return res.status(400).json({message: "Nhập thiếu các trường bắt buộc!"});
        if (is_current === false && !end_date) return res.status(400).json({ message: 'Thiếu ngày kết thúc!' });
        const education = await prisma.educations.create({data: {portfolio_id: portfolioId, ...req.body}});
        return res.status(201).json({message: "Tạo thành công!", education});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const updateEducation = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const educationId = parseInt(req.params.eduId);
        if(isNaN(educationId)) return res.status(400).json({message: "Education không hợp lệ!"});
        const education = await prisma.educations.findFirst({where: {id: educationId,portfolio_id: portfolioId}});
        if (!education)return res.status(404).json({message: "Education không tồn tại!" });
        const {school, major, degree, start_date, end_date, is_current} = req.body;
        const updData = {};
        if(school !== undefined) updData.school = school;
        if(major !== undefined) updData.major = major;
        if(degree !== undefined) updData.degree = degree;
        if(start_date !== undefined) updData.start_date = start_date;
        if(end_date !== undefined) updData.end_date = end_date;
        if(is_current !== undefined) updData.is_current = is_current;
        if (is_current === false && !end_date) return res.status(400).json({ message: 'Thiếu ngày kết thúc!' });
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu để cập nhật!' });
        }
        const updatedEdu = await prisma.educations.update({where: {id: educationId}, data: updData});
        return res.status(200).json({message: "Update thành công!", updatedEdu});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});
    }
}

export const deleteEducation = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không lấy được thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "Portfolio không hợp lê!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: "Không tìm thấy portfolio hoặc không thuộc về user!"});
        const educationId = parseInt(req.params.eduId);
        if(isNaN(educationId)) return res.status(400).json({message: "Education không hợp lệ!"});
        const education = await prisma.educations.findFirst({where: {id:  educationId,portfolio_id: portfolioId}});
        if (!education)return res.status(404).json({message: "Education không tồn tại!" });
        const deletedEdu = await prisma.educations.delete({where: {id: educationId}});
        return res.status(200).json({message: "Đã xóa Education!", deletedEdu});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});        
    }
}