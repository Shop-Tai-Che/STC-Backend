from fastapi import Depends, Request
from sqladmin import ModelView
from product.models.product_media_model import ProductMedia

class ProductMediaAdmin(ModelView, model=ProductMedia):
    name = "Product Media"
    icon = "fa-solid fa-photo-film"
    page_size_options = [25, 50, 100, 200]
    category = "PRODUCT"

    can_create = True
    can_edit = True
    can_delete = True
    can_view_details = True
    can_export = False

    column_list = [ProductMedia.id, ProductMedia.url, ProductMedia.sequence]
    
    column_labels = {
        'id': 'ID',
        'url': 'URL',
        'user_id': 'User ID',
        'product_id': 'Product ID',
        'images': 'Images'
    }

