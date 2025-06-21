// Impor semua package yang dibutuhkan
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Konfigurasi dotenv untuk memuat environment variables dari file .env
dotenv.config();

// Inisialisasi aplikasi Express
const app = express();
// Middleware untuk mem-parsing request body dalam format JSON
app.use(express.json());

// Inisialisasi Google Generative AI dengan API key dari environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Memilih model Gemini yang akan digunakan
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

// Konfigurasi multer untuk menangani upload file dan menyimpannya di folder 'uploads'
const upload = multer({ dest: 'uploads/' });

// Fungsi untuk mengubah file gambar menjadi format Generative Part
function imageToGenerativePart(filePath, mimeType) {
    const supportedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!supportedMimeTypes.includes(mimeType)) {
        throw new Error('Unsupported image type');
    }

    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
            mimeType
        },
    };
}

// Endpoint untuk generate text
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint untuk generate content dari gambar
app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const prompt = req.body.prompt || 'Describe the image';
    const image = imageToGenerativePart(req.file.path, req.file.mimetype);

    try {
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);
    }
});

// Endpoint untuk generate content dari dokumen
app.post('/generate-from-document', upload.single('document'), async (req, res) => {
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
    const base64Data = buffer.toString('base64');
    const mimeType = req.file.mimetype;

    try {
        const documentPart = {
            inlineData: { data: base64Data, mimeType }
        };

        const result = await model.generateContent(['Analyze this document:', documentPart]);
        const response = await result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        fs.unlinkSync(filePath);
    }
});

// Endpoint untuk generate content dari audio
app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    const audioBuffer = fs.readFileSync(req.file.path);
    const base64Audio = audioBuffer.toString('base64');
    const audioPart = {
        inlineData: {
            data: base64Audio,
            mimeType: req.file.mimetype
        }
    };

    try {
        const result = await model.generateContent([
            'Transcribe or analyze the following audio:', audioPart
        ]);
        const response = await result.response;
        res.json({ output: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);
    }
});

// Menentukan port untuk server
const PORT = 3000;
// Menjalankan server Express pada port yang telah ditentukan
app.listen(PORT, () => {
    console.log(`Gemini API server is running at http://localhost:${PORT}`);
});
