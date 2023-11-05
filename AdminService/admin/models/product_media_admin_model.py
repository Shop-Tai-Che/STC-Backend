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

    column_searchable_list = [ProductMedia.id]
    column_sortable_list = [ProductMedia.id]

    column_list = [ProductMedia.id, ProductMedia.product, ProductMedia.sequence, ProductMedia.url]
    
    column_labels = {
        'id': 'ID',
        'url': 'URL',
        'user_id': 'User ID',
        'product_id': 'Product ID',
        'product': 'Product',
        'images': 'Images'
    }

