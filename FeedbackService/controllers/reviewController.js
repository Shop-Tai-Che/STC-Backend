const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getReviewByProductId = catchAsync(async (req, res, next) => {
    const productId = +req.query.productId

    let reviews = await prisma.review.findMany({
        where: {
            product_id: productId
        },
        include: {
            ReviewMedia: {
                select: {
                    url: true
                }
            },
            Reply: {
                select: {
                    user_id: true,
                    comment: true,
                    created_at: true,
                    updated_at: true
                }
            }
        }
    })

    reviews = reviews.map(item => {
        return {
            ...item,
            product_id: undefined,
            // user_id: undefined
        }
    })

    res.status(200).json({
        reviews
    });
})

exports.createReview = catchAsync(async (req, res, next) => {
    const data = req.body

    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: data.product_id
            }
        })

        if (!product) {
            res.status(501).json({
                error: 'Product not found'
            });
        }

        const review = await prisma.review.create({
            data
        })

        res.status(200).json({
            review
        });
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
})
