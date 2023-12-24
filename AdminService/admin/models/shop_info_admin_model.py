from fastapi import Depends, Request
from sqladmin import ModelView
from user.models.shop_info_model import ShopInfo


class ShopInfoAdmin(ModelView, model=ShopInfo):
    name = "Shop Info"
    icon = "fa-solid fa-shop"
    page_size_options = [25, 50, 100, 200]
    category = "USER"

    can_edit = True
    can_delete = True
    can_view_details = True

    column_list = [ShopInfo.id, ShopInfo.name,
                   ShopInfo.active]

    column_labels = {
        'id': 'ID',
        'zalo_id': 'Zalo ID',
        'name': 'Name'
    }
