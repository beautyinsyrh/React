import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let pengguna = [];
let skorData = {};

app.post('/pengguna', (req, res) => {
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ error: 'Nama wajib diisi' });

  if (!pengguna.includes(nama)) {
    pengguna.push(nama);
    skorData[nama] = 0;
    console.log('Pengguna baru ditambahkan:', nama);
  } else {
    console.log('Pengguna sudah ada:', nama);
  }

  res.status(200).json({ message: 'Pengguna berhasil ditambahkan' });
});

app.get('/skor/:nama', (req, res) => {
  const { nama } = req.params;
  const skor = skorData[nama] ?? 0;
  res.status(200).json({ skor });
});

app.post('/skor', (req, res) => {
  const { nama, permainan, skor } = req.body;
  if (!nama || skor == null) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  skorData[nama] = skor;
  console.log('Skor diterima:', { nama, permainan, skor });
  res.status(200).json({ message: 'Skor berhasil disimpan' });
});

app.put('/pengguna/:lama', (req, res) => {
  const { lama } = req.params;
  const { baru } = req.body;

  if (!pengguna.includes(lama)) {
    return res.status(404).json({ error: 'Nama lama tidak ditemukan' });
  }

  pengguna = pengguna.map((n) => (n === lama ? baru : n));
  if (skorData[lama] !== undefined) {
    skorData[baru] = skorData[lama];
    delete skorData[lama];
  }

  console.log(`Nama diubah dari ${lama} menjadi ${baru}`);
  res.status(200).json({ message: 'Nama berhasil diubah' });
});

app.delete('/skor/:nama', (req, res) => {
  const { nama } = req.params;

  if (skorData[nama] !== undefined) {
    delete skorData[nama];
    console.log(`Skor untuk ${nama} dihapus`);
    return res.status(200).json({ message: 'Skor berhasil dihapus' });
  } else {
    return res.status(404).json({ error: 'Skor tidak ditemukan' });
  }
});

const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server backend berjalan di http://localhost:${PORT}`);
});