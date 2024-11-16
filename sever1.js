const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thangtnph52751@gmail.com', 
        pass: 'escm zdny bxbt hlfr'        
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/register', (req, res) => {
    const { email, username } = req.body;
    email = "thangtnph52751@gmail.com"
    username = "thangtnph52751"
    if (!email || !username) {
        return res.status(400).json({ message: 'Thiếu thông tin email hoặc username.' });
    }

    const mailOptions = {
        from: 'thangtnph52751@gmail.com',
        to: email,
        subject: 'Đăng ký tài khoản thành công',
        text: `Chào ${username}, bạn đã đăng ký tài khoản thành công.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email send error: ", error);
            return res.status(500).json({ message: 'Lỗi khi gửi email: ' + error.message });
        }

        console.log('Email đã được gửi thành công: ' + info.response);
        return res.status(200).json({ message: 'Đăng ký thành công và email đã được gửi.' });
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy trên http://localhost:${port}`);
});
