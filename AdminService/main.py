from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.exceptions import ExceptionMiddleware
import uvicorn
from fastapi import Depends, FastAPI, Request, HTTPException
from config import settings
from jose import jwt
import firebase_admin
from firebase_admin import credentials
from database import Base, engine, get_db
from starlette.authentication import requires
from fastapi.security import HTTPBearer
from fastapi.middleware import Middleware
from admin.auth_backend import AdminAuth
from admin.admin_backend import AdminBackend
from admin.models.tag_admin_model import TagAdmin
from admin.models.product_admin_model import ProductAdmin
from admin.models.love_admin_model import LoveAdmin
from admin.models.product_media_admin_model import ProductMediaAdmin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ShopTaiChe Admin")

authentication_backend = AdminAuth(secret_key="29050fe68c6509b99c14b53faae016b1f8bcd73021b69f037fa0d85ec43cf5c1")
admin = AdminBackend(app, engine, authentication_backend=authentication_backend)
admin.add_view(TagAdmin)
admin.add_view(ProductAdmin)
admin.add_view(ProductMediaAdmin)
admin.add_view(LoveAdmin)

app.add_middleware(ExceptionMiddleware)

cred = credentials.Certificate("firebaseConfig.json")
firebase_admin.initialize_app(
    cred,
    {
        "storageBucket": "gokag-19eac.appspot.com",
    },
)

    
@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
