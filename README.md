# Test Case Generator

Prototipe lokal untuk membantu QA membuat rancangan kasus uji dari nama fitur dan kebutuhan. Hasil meliputi skenario positif, negatif, validasi, dan batas, serta dapat disalin atau diunduh sebagai CSV.

## Menjalankan
Buka `index.html` di browser modern. Klik **Gunakan contoh login**, lalu **Generate Test Cases**. Ubah masukan atau jenis kasus sesuai kebutuhan. Tidak diperlukan server, instalasi, akun, atau koneksi internet. Jika clipboard tidak tersedia pada file lokal, gunakan Unduh CSV.

## Batasan
Generator menggunakan template dan pencocokan kata sederhana, bukan model AI atau pengujian otomatis. Ia tidak memahami seluruh kebutuhan dan tidak menentukan nilai batas jika tidak disebutkan. QA harus memeriksa kelengkapan, langkah, hasil, dan asumsi. Jangan masukkan informasi rahasia ke contoh atau file yang dibagikan.

## Proses
IBM Bob digunakan sekali dengan prompt tiga lapisan dan menghasilkan HTML awal. Implementasi dilengkapi dan ditinjau setelah generasi awal. Tidak ada prompt lanjutan.
