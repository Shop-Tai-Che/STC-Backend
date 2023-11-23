from fastapi import Depends, Request
from sqladmin import ModelView
from order.models.order_model import Order


class OrderAdmin(ModelView, model=Order):
    name = "Order"
    icon = "fa-solid fa-money-bills"
    page_size_options = [25, 50, 100, 200]
    category = "ORDER"

    can_edit = True
    can_delete = True
    can_view_details = True

    column_list = [Order.id, Order.product,
                   Order.user_id, Order.status, Order.created_at]
    form_excluded_columns = [Order.created_at]

    column_labels = {
        'id': 'ID',
        'user_id': 'User ID',
        'product_id': 'Product ID',
        'payment_method': 'Payment mothod',
        'ship_fee': 'Ship fee',
        'address': 'Address',
        'note': 'Note',
        'amount': 'Amount',
        'shop_id': 'Shop ID',
        'total_price': 'Total price',
        'status': 'STATUS'
    }
