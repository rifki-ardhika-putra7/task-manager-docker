# Gunakan image Node.js versi 18
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Copy file package.json dan install dependency
COPY package.json ./
RUN npm install

# Copy seluruh kode backend
COPY . .

# Buat folder untuk database SQLite
RUN mkdir -p data

# Expose port 3000
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]
