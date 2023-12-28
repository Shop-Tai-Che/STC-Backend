const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getUserByZaloId = catchAsync(async (req, res, next) => {
    const zaloId = req?.params?.id || ''

    const user = await prisma.user.findFirst({
        where: {
            zalo_id: zaloId
        },
        include: {
            ShopInfo: {
                select: {
                    name: true,
                    avatar: true,
                    active: true
                }
            }
        }
    })

    if (!user) {
        next(new AppError("Not found", 400))
    }

    res.status(200).json(user);
})

exports.createUser = catchAsync(async (req, res, next) => {
    const data = req.body

    const user = await prisma.user.create({
        data
    })

    res.status(200).json(user);
})
