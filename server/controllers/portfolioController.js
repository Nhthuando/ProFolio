import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getPortfolio = async (req ,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}});
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        return res.status(200).json(portfolio);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}

export const createPortfolio = async(req,res) =>{
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const user = await prisma.users.findUnique({where: {id: userId}});
        const randomStr = Math.random().toString(36).substring(2, 6)
        const slug = user.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')+ '-' + randomStr
        const { title, description, avatar, is_published, template, theme_color} = req.body;
        if(!slug || !title) return res.status(404).json({message: "Các trường bắt buộc đang bị để trống!"});
        const portfolio = await prisma.portfolios.create({data: {user_id: userId, slug, title, description, avatar, is_published, template, theme_color }});
        return res.status(201).json({portfolio});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"});
    }
}

export const updatePortfolio = async (req,res) =>{
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}})
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        const {title, slug, description, avatar, is_published, template, theme_color} = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (slug !== undefined) updateData.slug = slug;
        if (avatar !== undefined) updateData.avatar = avatar;
        if (is_published !== undefined) updateData.is_published = is_published;
        if (template !== undefined) updateData.template = template;
        if (theme_color !== undefined) updateData.theme_color = theme_color;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu để cập nhật!' });
        }
        const updatedPortfolio = await prisma.portfolios.update({ where: { id: portfolio.id }, data: updateData })
        return res.status(200).json({updatedPortfolio});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"})
    }
}

export const publishPortfolio = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user"});
        const portfolio = await prisma.portfolios.findFirst({where: {user_id: userId}})
        if(!portfolio) return res.status(404).json({message: "User không có portfolio"});
        const updated = await prisma.portfolios.update({where: { id: portfolio.id },data: { is_published: !portfolio.is_published }})
        return res.status(200).json({ is_published: updated.is_published })
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"})
    }
}

export const getPublicPortfolio = async(req,res) =>{
    try{
        const slug = req.params.slug;
        const portfolio = await prisma.portfolios.findUnique({
    where: { slug },
    include: {
        projects: { orderBy: { order_index: 'asc' } },
        skills: { orderBy: { order_index: 'asc' } },
        experiences: { orderBy: { order_index: 'asc' } },
        educations: { orderBy: { order_index: 'asc' } },
        social_links: { orderBy: { order_index: 'asc' } }
    }
    })
        if(!portfolio || !portfolio.is_published) return res.status(404).json({message: "Portfolio không tồn tại hoặc không để chế độ publish"});
        return res.status(200).json(portfolio);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Có lỗi server"})
    }
}

export const deletePortfolio = async (req, res) => {
    try {
        const userId = req.user.userId
        const portfolio = await prisma.portfolios.findFirst({ where: { user_id: userId } })
        if (!portfolio) return res.status(404).json({ message: 'Không tìm thấy portfolio!' })
        await prisma.portfolios.delete({ where: { id: portfolio.id } })
        return res.status(200).json({ message: 'Đã xóa portfolio!' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Có lỗi server!' })
    }
}