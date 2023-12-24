from fastapi import Depends, Request
from sqladmin import ModelView
from user.models.user_model import User


class UserAdmin(ModelView, model=User):
    name = "User"
    icon = "fa-solid fa-user"
    page_size_options = [25, 50, 100, 200]
    category = "USER"

    can_edit = True
    can_delete = True
    can_view_details = True

    column_list = [User.id, User.name,
                   User.zalo_id, User.active, User.ShopInfo]
    form_excluded_columns = [User.created_at,
                             User.updated_at, User.ShopInfo, User.Product]

    column_labels = {
        'id': 'ID',
        'zalo_id': 'Zalo ID',
        'name': 'Name',
    }
