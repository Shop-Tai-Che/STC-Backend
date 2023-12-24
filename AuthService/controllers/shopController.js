const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.countProductsAndReviews = catchAsync(async (req, res, next) => {
    const shopId = req?.params?.id || ''

    const user = await prisma.user.findFirstOrThrow({
        where: {
            zalo_id: shopId
        },
        include: {
            Product: {
                select: {
                    _count: {
                        select: { Love: true, Review: true },
                    },
                }
            },
            _count: {
                select: { Product: true },
            },
        }
    })

    const totalLoveCount = user.Product.reduce(
        (acc, curr) => acc + curr["_count"]["Love"],
        0
    );
    const totalReviewCount = user.Product.reduce(
        (acc, curr) => acc + curr["_count"]["Review"],
        0
    );

    const data = {
        count_products: user._count.Product,
        count_loves: totalLoveCount,
        count_reviews: totalReviewCount,
    }

    res.status(200).json(data);
})
