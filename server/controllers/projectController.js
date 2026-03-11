import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProject = async (req ,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(401).json({message: 'Không lấy được user id!'});
        const allProject = await prisma.projects.findMany({where: {portfolios: {user_id : userId}}});
        return res.status(200).json({allProject});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}

export const getProject = async (req,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(401).json({message: 'Không lấy được user id!'});
        const projectId = parseInt(req.params.id);
        if(isNaN(projectId)) return res.status(404).json({message: 'Không tồn tại project!'});
        const existingProject = await prisma.projects.findFirst({
            where: { id:projectId ,portfolios: { user_id: userId}}
        });
        if (!existingProject) return res.status(404).json({ message: 'Không tồn tại project!' });
        const project = await prisma.projects.findUnique({where: {id: projectId}});
        return res.status(200).json({project});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}

export const createProject = async (req,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(401).json({message: 'Không lấy được user id!'});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}});
        if(!portfolio) return res.status(400).json({message: 'Không tìm thấy portfolio!'});
        const portfolio_id = portfolio.id;
        const {title, description, thumbnail, demo_url, github_url, tags,order_index} = req.body;
        if(!portfolio_id || !title || !tags ){
            return res.status(400).json({message: 'Các trường bắt buộc đang trống!'});
        }
        const project = await prisma.projects.create({data: {portfolio_id, title, description, thumbnail, demo_url, github_url, tags, order_index}});
        return res.status(201).json({project});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}

export const updateProject = async (req,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(401).json({message: 'Không lấy được user id!'});
        const projectId = parseInt(req.params.id);
        if(isNaN(projectId)) return res.status(404).json({message: 'Không tồn tại project!'});
        const existingProject = await prisma.projects.findFirst({
            where: { id:projectId ,portfolios: { user_id: userId}}
        });
        if (!existingProject) return res.status(404).json({ message: 'Không tồn tại project!' });
        const {title,description,thumbnail, demo_url, github_url,tags, order_index} = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
        if (demo_url !== undefined) updateData.demo_url = demo_url;
        if (github_url !== undefined) updateData.github_url = github_url;
        if (tags !== undefined) updateData.tags = tags;
        if (order_index !== undefined) updateData.order_index = order_index;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu để cập nhật!' });
        }
        const updProject = await prisma.projects.update({where: {id : projectId}, data: updateData});
        return res.status(200).json({updProject});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!', err});
    }
}

export const deleteProject = async (req,res) => {
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(401).json({message: 'Không lấy được user id!'});
        const projectId = parseInt(req.params.id);
        if(isNaN(projectId)) return res.status(404).json({message: 'Không tồn tại project!'});
        const existingProject = await prisma.projects.findFirst({
            where: { id:projectId ,portfolios: { user_id: userId}}
        });
        if (!existingProject) return res.status(404).json({ message: 'Không tồn tại project!' });
        await prisma.projects.delete({where: {id: projectId}});
        return res.status(200).json({message: 'Đã xóa project!'});
    }catch(err){
        return res.status(500).json({message: 'Có lỗi server!'})
    }
}