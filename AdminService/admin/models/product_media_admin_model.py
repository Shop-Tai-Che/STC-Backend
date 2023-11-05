from fastapi import Depends, Request
from sqladmin import ModelView
from product.models.product_media_model import ProductMedia
from service.firebase_util import upload_image
import wtforms

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

    form_overrides = dict(url=wtforms.FileField)

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

    async def on_model_change(self, data, model, is_created):
        if 'url' in data:
            result = await upload_image(data['url'])

            data['url'] = result
