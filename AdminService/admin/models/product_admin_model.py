from fastapi import Depends, Request
from sqladmin import ModelView
from product.models.product_model import Product

class ProductAdmin(ModelView, model=Product):
    name = "Product"
    icon = "fa-solid fa-shirt"
    page_size_options = [25, 50, 100, 200]
    category = "PRODUCT"

    can_create = True
    can_edit = True
    can_delete = True
    can_view_details = True
    can_export = False

    column_searchable_list = [Product.id, Product.title]
    column_sortable_list = [Product.id, Product.title]

    column_list = [Product.id, Product.title, Product.price, Product.tag]
    form_excluded_columns = [Product.created_at, Product.updated_at, Product.loves, Product.images]
    
    column_labels = {
        'id': 'ID',
        'title': 'Title',
        "price": "Price",
        "description": "Description",
        "amount": "Amount",
        "shop_id": "Shop ID",
        "tag_id": "Tag ID",
        "discount": "Discount",
        "discount_start": "Discount start",
        "discount_end": "Discount end",
        "tag": "Tag",
    }

