# Sử dụng một hình ảnh Node.js làm cơ sở
FROM node:20

# Thiết lập thư mục làm việc của bạn trong hệ thống tệp hình ảnh
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép tất cả các tệp trong dự án của bạn vào thư mục làm việc
COPY . .

RUN npx prisma generate

# Mở cổng 3000 để ứng dụng có thể lắng nghe yêu cầu HTTP
EXPOSE 5000

# Khởi chạy ứng dụng khi hình ảnh được chạy
CMD [ "npm", "start" ]
