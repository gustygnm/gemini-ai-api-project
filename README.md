# Gemini Flash API Server

Proyek ini adalah server API sederhana yang dibuat menggunakan Node.js dan Express. Server ini berfungsi sebagai jembatan untuk berinteraksi dengan model AI generatif Google, yaitu **Gemini 1.5 Flash**. Dengan server ini, Anda dapat melakukan berbagai tugas pemrosesan konten multimodal seperti analisis teks, gambar, dokumen, dan audio.

## Fitur

Server ini menyediakan beberapa endpoint untuk berbagai kasus penggunaan:

-   `POST /generate-text`: Menghasilkan teks berdasarkan prompt teks yang diberikan.
-   `POST /generate-from-image`: Menghasilkan deskripsi atau analisis dari file gambar yang diunggah, dengan atau tanpa prompt tambahan.
-   `POST /generate-from-document`: Menganalisis konten dari file dokumen (seperti PDF, TXT, DOCX) dan memberikan ringkasan atau jawaban.
-   `POST /generate-from-audio`: Mentranskripsikan atau menganalisis konten dari file audio (seperti MP3, WAV, M4A).

---

## Panduan Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk mengkloning, menginstal dependensi, dan menjalankan server di lingkungan lokal Anda.

### 1. Clone Repositori

Buka terminal Anda dan jalankan perintah berikut untuk mengkloning repositori ke mesin Anda:

```bash
git clone <URL_REPOSITORI_ANDA>
cd <NAMA_FOLDER_PROYEK>
```
*Ganti `<URL_REPOSITORI_ANDA>` dengan URL repositori Git Anda dan `<NAMA_FOLDER_PROYEK>` dengan nama direktori proyek.*

### 2. Instal Dependensi

Setelah masuk ke direktori proyek, instal semua package yang dibutuhkan menggunakan `npm`:

```bash
npm install
```

### 3. Konfigurasi Environment Variable

Anda memerlukan API key dari Google AI Studio untuk dapat menggunakan API Gemini.

1.  Buat file baru di root direktori proyek dengan nama `.env`.
2.  Buka file `.env` dan tambahkan baris berikut:

```
GEMINI_API_KEY=MASUKKAN_API_KEY_ANDA_DI_SINI
```
*Ganti `MASUKKAN_API_KEY_ANDA_DI_SINI` dengan API key yang Anda dapatkan dari [Google AI Studio](https://aistudio.google.com/app/apikey).*

### 4. Jalankan Server

Setelah semua konfigurasi selesai, jalankan server dengan perintah berikut:

```bash
node index.js
```

Jika berhasil, Anda akan melihat pesan di terminal:
`Gemini API server is running at http://localhost:3000`

---

## Cara Menggunakan API dengan Postman

Berikut adalah cara menguji setiap endpoint menggunakan Postman.

### 1. Endpoint: `/generate-text`

Endpoint ini digunakan untuk menghasilkan teks dari sebuah prompt.

-   **Method**: `POST`
-   **URL**: `http://localhost:3000/generate-text`
-   **Body**:
    -   Pilih `raw` dan atur tipe menjadi `JSON`.
    -   Isi dengan JSON berikut:
    ```json
    {
        "prompt": "Ceritakan sebuah kisah fiksi ilmiah singkat tentang perjalanan waktu."
    }
    ```

### 2. Endpoint: `/generate-from-image`

Endpoint ini digunakan untuk menganalisis gambar.

-   **Method**: `POST`
-   **URL**: `http://localhost:3000/generate-from-image`
-   **Body**:
    -   Pilih `form-data`.
    -   Tambahkan key baru:
        -   **Key**: `image`
        -   Ubah tipe dari `Text` menjadi `File`.
        -   **Value**: Pilih file gambar yang ingin Anda unggah (misalnya, `gambar.jpg`).
        -   (Opsional) Tambahkan key `prompt` (tipe `Text`) jika Anda ingin memberikan instruksi spesifik. Jika tidak, prompt default (`Describe the image`) akan digunakan.

### 3. Endpoint: `/generate-from-document`

Endpoint ini digunakan untuk menganalisis dokumen.

-   **Method**: `POST`
-   **URL**: `http://localhost:3000/generate-from-document`
-   **Body**:
    -   Pilih `form-data`.
    -   Tambahkan key baru:
        -   **Key**: `document`
        -   Ubah tipe dari `Text` menjadi `File`.
        -   **Value**: Pilih file dokumen yang ingin Anda analisis (misalnya, `laporan.pdf`).

### 4. Endpoint: `/generate-from-audio`

Endpoint ini digunakan untuk mentranskripsi atau menganalisis audio.

-   **Method**: `POST`
-   **URL**: `http://localhost:3000/generate-from-audio`
-   **Body**:
    -   Pilih `form-data`.
    -   Tambahkan key baru:
        -   **Key**: `audio`
        -   Ubah tipe dari `Text` menjadi `File`.
        -   **Value**: Pilih file audio yang ingin Anda proses (misalnya, `rekaman.mp3`). 