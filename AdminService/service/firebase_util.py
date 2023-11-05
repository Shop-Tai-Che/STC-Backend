from firebase_admin import storage
import datetime
import mimetypes
from wtforms import FileField

async def upload_image(file: FileField):
    file_contents = await file.read()
    content_type = file.content_type

    filename = (
        str(datetime.datetime.now().timestamp())
        + "."
        + mimetypes.guess_extension(content_type).lstrip('.')
    )

    bucket = storage.bucket()
    blob = bucket.blob(filename)
    blob.upload_from_string(
        file_contents, content_type=content_type
    )

    return (
        "https://firebasestorage.googleapis.com/v0/b/shop-tai-che.appspot.com/o/"
        + filename
        + "?alt=media"
    )
