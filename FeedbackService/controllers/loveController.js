const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.loveProduct = catchAsync(async (req, res, next) => {
    const userId = +req.body.user_id;
    const productId = +req.body.product_id;

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!product) {
        return res.status(404).json({
            error: 'Product not found',
        });
    }

    const loved = await prisma.love.findFirst({
        where: {
            user_id: userId,
            product_id: productId,
        },
    });

    if (loved) {
        await prisma.love.delete({
            where: {
                id: loved.id,
            },
        });

        return res.status(200).json({
            message: 'Product unliked successfully',
        });
    }

    const love = await prisma.love.create({
        data: {
            user_id: userId,
            product_id: productId,
        },
    });

    res.status(200).json({
        message: 'Product liked successfully',
        love,
    });
});
