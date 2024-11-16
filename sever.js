const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Tạo thư mục lưu ảnh nếu chưa có
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình Multer để lưu ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);  // Đường dẫn lưu ảnh
    },
    filename: (req, file, cb) => {
        // Đặt tên file khi lưu (sử dụng timestamp để tránh trùng tên)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware để xử lý dữ liệu JSON và tệp tin
app.use(express.json());
app.use(express.static('public')); // Để có thể truy cập tệp tin tĩnh (như ảnh)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

// Route xử lý tải lên ảnh
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Không có tệp tin được tải lên.');
    }
    // Trả về URL của ảnh để hiển thị
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Lắng nghe trên cổng 3001
app.listen(port, () => {
    console.log(`Server đang chạy trên http://localhost:${port}`);
});
