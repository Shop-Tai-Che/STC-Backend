const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;

    const filteredProducts = await prisma.product.findMany();
    const total = filteredProducts.length;

    const products = await prisma.product.findMany({
        orderBy: {
            created_at: 'desc'
        },
        include: {
            tag: true,
            ProductMedia: {
                select: {
                    url: true,
                    sequence: true,
                }
            },
            _count: {
                select: { Love: true },
            },
        },
        skip: page * pageSize,
        take: pageSize
    });

    res.status(200).json({
        status: 'success',
        data: products,
        page,
        pageSize,
        total
    });
})

exports.getMostLovedProducts = catchAsync(async (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;

    try {
        const products = await prisma.product.findMany({
            include: {
                tag: true,
                ProductMedia: {
                    select: {
                        url: true,
                        sequence: true,
                    }
                },
                _count: {
                    select: { Love: true },
                },
            },
            skip: page * pageSize,
            take: pageSize
        });

        products.sort((a, b) => {
            return b._count.Love - a._count.Love;
        });

        res.status(200).json({
            status: 'success',
            data: products,
            page,
            pageSize
        });
    } catch (e) {
        next(new AppError(e, 500))
    }
})
