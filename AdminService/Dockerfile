# Sử dụng hình ảnh Python 3.8 làm cơ sở
FROM python:3.8-slim

# Thiết lập thư mục làm việc của bạn trong hệ thống tệp hình ảnh
WORKDIR /app

# Sao chép tệp requirements.txt vào thư mục làm việc
COPY requirements.txt .

# Cài đặt các phụ thuộc của ứng dụng
RUN pip install -r requirements.txt

# Sao chép tất cả các tệp trong dự án của bạn vào thư mục làm việc
COPY . .

# Mở cổng 8000 để ứng dụng có thể lắng nghe yêu cầu HTTP
EXPOSE 8000

# Khởi chạy ứng dụng FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
