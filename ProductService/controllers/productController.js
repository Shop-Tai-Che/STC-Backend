const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getAll = catchAsync(async (req, res, next) => {
    const USER_ID = 2
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
            Love: true,
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

    const data = products.map(item => {
        const isLoved = item.Love && item.Love.some(loveItem => loveItem.user_id === USER_ID);
        return {
            ...item,
            tag_id: undefined,
            Love: undefined,
            isLoved
        };
    });
    res.status(200).json({
        data,
        page,
        pageSize,
        total
    });
})

exports.getMostLovedProducts = catchAsync(async (req, res, next) => {
    const USER_ID = 2
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;

    try {
        const products = await prisma.product.findMany({
            include: {
                tag: true,
                Love: true,
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

        const data = products.map(item => {
            const isLoved = item.Love && item.Love.some(loveItem => loveItem.user_id === USER_ID);
            return {
                ...item,
                tag_id: undefined,
                Love: undefined,
                isLoved
            };
        });

        res.status(200).json({
            data,
            page,
            pageSize
        });
    } catch (e) {
        next(new AppError(e, 500))
    }
})


exports.getById = catchAsync(async (req, res, next) => {
    const productId = parseInt(req?.params?.id || 0)

    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: productId
            },
            include: {
                tag: true,
                ProductMedia: {
                    select: {
                        url: true,
                        sequence: true,
                    }
                },
                Love: true
            },
        });

        product.tag_id = undefined

        res.status(200).json({
            data: product,
        });
    } catch (e) {
        next(new AppError(e, 500))
    }
})
