const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const prisma = require('../prisma/prisma');

exports.getAllByUserId = catchAsync(async (req, res, next) => {
    const userId = +req.query.userId
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;

    const filteredOrders = await prisma.order.findMany({
        where: {
            user_id: userId
        }
    });
    const total = filteredOrders.length;

    let orders = await prisma.order.findMany({
        where: {
            user_id: userId
        },
        include: {
            Product: {
                select: {
                    title: true,
                    price: true,
                    ProductMedia: {
                        select: {
                            url: true,
                            sequence: true
                        }
                    }
                }
            },
        },
        skip: page * pageSize,
        take: pageSize
    });

    orders = orders.map((e) => {
        return {
            ...e,
            user_id: undefined
        }
    })

    res.status(200).json({
        data: orders,
        page,
        pageSize,
        total
    });
})

exports.getOrderById = catchAsync(async (req, res, next) => {
    const orderId = +req?.params?.id

    const orders = await prisma.order.findFirstOrThrow({
        where: {
            id: orderId
        },
        include: {
            Product: {
                select: {
                    title: true,
                    price: true,
                    ProductMedia: {
                        select: {
                            url: true,
                            sequence: true
                        }
                    }
                }
            },
        }
    });

    res.status(200).json({
        data: orders,
    });
})

exports.createOrder = catchAsync(async (req, res, next) => {
    const data = req.body

    const product = await prisma.product.findFirstOrThrow({
        where: {
            id: data.product_id
        }
    })

    if (product?.amount <= 0) {
        return res.status(501).json({
            error: 'Out of stock'
        });
    }

    if (!data.ship_fee) data.ship_fee = 20000

    data.total_price = data.ship_fee + data.amount * product.price

    const order = await prisma.order.create({
        data
    })

    await prisma.product.update({
        where: {
            id: data.product_id
        },
        data: {
            amount: {
                decrement: 1
            }
        }
    });

    res.status(200).json({
        order
    });
})

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = +req.params.id
        const { newStatus } = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus },
        });

        res.status(200).json({ updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
