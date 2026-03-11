import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    try{
        const tokenHeader = req.header('authorization');
        if(!tokenHeader) return res.status(401).json({message: 'Không tìm thấy token!'});
        if(!tokenHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Token không hợp lệ!'});
        const token = tokenHeader.split(' ')[1];
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: 'Token hết hạn hoặc có lỗi token!', err});
    }
}