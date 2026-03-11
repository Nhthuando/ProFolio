    import { PrismaClient } from "@prisma/client";


    const prisma = new PrismaClient();

    export const getAllSkills = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
        return res.status(401).json({ message: "Không thể lấy thông tin user!" });
        }

        const portfolioId = Number(req.params.portfolioId);

        if (!Number.isInteger(portfolioId) || portfolioId <= 0) {
        return res.status(400).json({ message: "portfolioId không hợp lệ!" });
        }

        const portfolio = await prisma.portfolios.findFirst({
        where: {
            id: portfolioId,
            user_id: userId,
        },
        });

        if (!portfolio) {
        return res.status(404).json({
            message: "Không tìm thấy portfolio hoặc bạn không có quyền truy cập!",
        });
        }

        const skills = await prisma.skills.findMany({
        where: {
            portfolio_id: portfolioId,
        },
        orderBy: {
            order_index: "asc",
        },
        });

        return res.status(200).json({ skills });
    } catch (err) {
         console.log("Lỗi server! :" , err);
        return res.status(500).json({ message: "Có lỗi server!" });
    }
    };

    export const getSkill = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
        return res.status(401).json({ message: "Không thể lấy thông tin user!" });
        }

        const portfolioId = Number(req.params.portfolioId);
        const skillId = Number(req.params.skillId);

        if (!Number.isInteger(portfolioId) || portfolioId <= 0) {
        return res.status(400).json({ message: "portfolioId không hợp lệ!" });
        }

        if (!Number.isInteger(skillId) || skillId <= 0) {
        return res.status(400).json({ message: "skillId không hợp lệ!" });
        }

        const portfolio = await prisma.portfolios.findFirst({
        where: {
            id: portfolioId,
            user_id: userId,
        },
        });

        if (!portfolio) {
        return res.status(404).json({
            message: "Không tìm thấy portfolio hoặc bạn không có quyền truy cập!",
        });
        }

        const skill = await prisma.skills.findFirst({
        where: {
            id: skillId,
            portfolio_id: portfolioId,
        },
        });

        if (!skill) {
        return res.status(404).json({
            message: "Không tìm thấy skill trong portfolio này!",
        });
        }

        return res.status(200).json({ skill });
    } catch (err) {
     console.log("Lỗi server! :" , err);
        return res.status(500).json({ message: "Có lỗi server!" });
    }
    };


// PUT    /api/skills/:id    — update skill
// DELETE /api/skills/:id    — xóa skill
export const updateSkill = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: "Không thể lấy thông tin user!"});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: "PortfolioId không hợp lệ!"});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(404).json({message : "Không tồn tại portfolio hoặc portfolio không thuộc về user!"});
        const skillId = parseInt(req.params.skillId);
        if(isNaN(skillId)) return res.status(400).json({message:"SkillId không hợp lệ"});
        const skill = await prisma.skills.findFirst({where: {id: skillId, portfolio_id: portfolioId}});
        if(!skill) return res.status(404).json({message: "Không tìm thấy skill trong portfolio!"});
        const {name, level, category} = req.body;
        const updatedData = {};
        if(name !== undefined) updatedData.name = name;
        if(level !== undefined) updatedData.level = level;
        if(category !== undefined) updatedData.category = category;
        if(Object.keys(updatedData).length === 0) return res.status(400).json({ message:"Không có dữ liệu để cập nhật!"});
        const updatedSkill = await prisma.skills.update({where: {id: skillId}, data: updatedData});
        return res.status(200).json({message: "Đã cập nhật skill !", data : updatedSkill});
    }catch(err){
        console.log("Lỗi server! :" , err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}


export const createSkill = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: 'Không thể lấy thông tin user!'});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: 'Id portfolio không hợp lệ!'});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: 'Không tìm thấy portfolio hoặc portfolio không thuộc về user!'});
        const {name, level, category} = req.body;
        if(!name || level === undefined || !category ) return res.status(400).json({message: "Không nhập đủ các trường bắt buộc!"});
        const skill = await prisma.skills.create({data: {name, level, category, portfolio_id: portfolioId}});
        return res.status(201).json({message: 'Đã tạo skill thành công!', data: skill});
    }catch(err){
            console.log("Lỗi server! :" , err);
    return res.status(500).json({message: 'Có lỗi server!'});
    }
}

export const deleteSkill = async (req,res) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: 'Không thể lấy thông tin user!'});
        const portfolioId = parseInt(req.params.portfolioId);
        if(isNaN(portfolioId)) return res.status(400).json({message: 'Id portfolio không hợp lệ!'});
        const portfolio = await prisma.portfolios.findFirst({where: {id: portfolioId, user_id: userId}});
        if(!portfolio) return res.status(400).json({message: 'Không tìm thấy portfolio hoặc portfolio không thuộc về user!'});
        const skillId = parseInt(req.params.skillId);
        if(isNaN(skillId))  return res.status(400).json({message: 'Id skill không hợp lệ!'});
        const skill = await prisma.skills.findFirst({where: {id: skillId, portfolio_id: portfolioId}});
        if(!skill) return res.status(404).json({message: "Không tìm thấy skill trong portfolio!"});
        const deletedSkill = await prisma.skills.delete({where: {id:skillId}});
        return res.status(200).json({message: "Đã xóa skill!", data: deletedSkill});
    }catch(err){
        console.log("Lỗi server! ", err);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}