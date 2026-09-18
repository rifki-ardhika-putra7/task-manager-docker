# Gunakan image Nginx ringan
FROM nginx:alpine

# Hapus file HTML default bawaan Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy file index.html kita ke folder web server Nginx
COPY index.html /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
