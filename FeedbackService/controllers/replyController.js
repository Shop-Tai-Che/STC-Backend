const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.createReply = catchAsync(async (req, res, next) => {
    const data = req.body

    const review = await prisma.review.findFirstOrThrow({
        where: {
            id: data.product_id
        }
    })

    if (!review) {
        res.status(501).json({
            error: 'Review not found'
        });
    }

    const reply = await prisma.reply.create({
        data
    })

    res.status(200).json({
        reply
    });
})
