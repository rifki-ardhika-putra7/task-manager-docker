# 📝 Task Manager - Dockerized Fullstack App

Aplikasi Task Manager sederhana berbasis arsitektur _Client-Server_ yang telah dikontainerisasi (Containerized) menggunakan Docker. Proyek ini memisahkan layanan Frontend (Nginx), Backend (Node.js/Express), dan Database (SQLite dengan Docker Volumes).

## 🚀 Fitur

- **Create:** Menambahkan tugas baru.
- **Read:** Menampilkan daftar tugas dari database secara _real-time_.
- **Update:** Mengedit teks tugas dan menandai tugas selesai/belum selesai.
- **Delete:** Menghapus tugas dari sistem.
- **Data Persistence:** Data tidak hilang meski _container_ dimatikan berkat _Docker Volumes_.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Nginx (Web Server)
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **DevOps/Infrastruktur:** Docker, Docker Compose

## 📁 Struktur Direktori

```text
task-manager-docker/
├── backend/               # Layanan API (Node.js)
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/              # Antarmuka Pengguna (HTML/JS)
│   ├── Dockerfile
│   └── index.html
├── docker-compose.yml     # Konfigurasi orkestrasi Docker
└── README.md
```
