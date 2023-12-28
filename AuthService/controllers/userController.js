const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getUserByZaloId = catchAsync(async (req, res, next) => {
    const zaloId = req?.params?.id || ''

    try {
        const user = await prisma.user.findFirstOrThrow({
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
    } catch (e) {
        return res.status(404).json("Not found")
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
