from fastapi import Depends, Request
from sqladmin import ModelView
from love.models.love_model import Love

class LoveAdmin(ModelView, model=Love):
    name = "Love"
    icon = "fa-solid fa-thumbs-up"
    page_size_options = [25, 50, 100, 200]
    category = "LOVE"

    can_edit = True
    can_delete = True
    can_view_details = True

    column_list = [Love.id, Love.product, Love.user_id, Love.created_at]
    form_excluded_columns = [Love.created_at]
    
    column_labels = {
        'id': 'ID',
        'product': 'Product',
        'user_id': 'User ID',
        'product_id': 'Product ID',
    }

