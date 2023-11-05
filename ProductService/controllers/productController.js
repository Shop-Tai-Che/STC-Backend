const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;

    const filteredProducts = await prisma.product.findMany();
    const total = filteredProducts.length;

    const products = await prisma.product.findMany({
        orderBy: {
            created_at: 'desc'
        },
        include: {
            tag: true,
            Love: true,
            ProductMedia: {
                select: {
                    url: true, 
                    sequence: true,
                }
            }
        },
        skip: page * limit,
        take: limit
    });

    const productsWithLoveCount = products.map(product => ({
        ...product,
        loveCount: product.Love.length,
        media: product.ProductMedia,
        ProductMedia: undefined, 
        Love: undefined
    }));

    res.status(200).json({
        status: 'success',
        data: productsWithLoveCount,
        page, 
        limit, 
        total
    });
})

