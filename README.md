# Ilmify Epistemic Benchmark (`ilmify-bench`)
> Open-Science Deterministic Epistemic Benchmark & Evidentiary Verification Harness

[![Epistemic Verification](https://github.com/zadevpenseo/ilmify-bench/actions/workflows/bench.yml/badge.svg)](https://github.com/zadevpenseo/ilmify-bench/actions/workflows/bench.yml)
[![Live Platform](https://img.shields.io/badge/Production-ilmify.id-881337)](https://ilmify.id)
[![Deterministic](https://img.shields.io/badge/Scoring-100%25%20Math%20%26%20Logic-047857)](https://ilmify.id)

Repositori publik ini adalah laboratorium pengujian terbuka (*open-science benchmark*) independen yang menyertai platform **[Ilmify (ilmify.id)](https://ilmify.id)**. Repositori ini berfungsi memvalidasi secara matematis seluruh algoritma penilaian, inversi distribusi probabilitas, dan formula metasains yang dijalankan oleh mesin diagnostik Ilmify.

---

## 🏛️ Fondasi Deterministik (Zero LLM in Scoring)

Berbeda dengan sistem evaluasi berbasis model bahasa (LLM) yang rentan halusinasi dan tidak dapat direproduksi, mesin evaluasi Ilmify beroperasi murni di atas kalkulasi analitis dan pembuktian logis:

1. **Inversi Distribusi Probabilitas Kontinu (Statcheck):**
   Rekalkulasi nilai $p$ eksak dari statistik uji terlaporkan ($t, F, \chi^2, r$) menggunakan inversi fungsi *incomplete beta* dan *incomplete gamma*. Menandai *gross inconsistency* jika kesalahan angka mengubah kesimpulan signifikansi statistik.
2. **Validitas Isi Diskrit & Teorema Batasan Bilangan Bulat (Aiken's V):**
   Menguji skor validitas instrumen $V = \frac{\sum (r - l_0)}{n(c - 1)}$. Jika jumlahan teoritis $S = V \cdot n \cdot (c - 1)$ bukan bilangan bulat, algoritma mendeteksi artefak sintetis kontinu yang mustahil dihasilkan dari penilaian Likert diskrit nyata.
3. **Analisis Kurva Nilai Bukti & Deteksi p-Hacking (Simonsohn p-Curve):**
   Menguji kemiringan distribusi nilai $p$ signifikan ($p < .05$). Kurva miring ke kanan (*right-skewed*) via Stouffer-Z mengonfirmasi *evidential value* empiris riil; konsentrasi pada batas marginal ($0.040 - 0.049$) menandai indikasi *p-hacking* atau pelaporan selektif.
4. **Verifikasi Kriptografis In-Memory (SHA-256 Bit-Exact):**
   Seluruh berkas diproses secara lokal di peramban klien tanpa transmisi isi naskah mentah ke peladen (*Client Sanctuary*).

---

## 🧪 Struktur Pengujian & Verifikasi

Suite pengujian dirancang dengan peranti uji bawaan Node.js tanpa ketergantungan paket eksternal (*zero-dependency*):

```bash
# Menjalankan seluruh pengujian matematis
npm test
```

### Matriks Pengujian Kanonikal:
* `test/statcheck.test.js`: Validasi inversi CDF distribusi Student-t, Snedecor F, Chi-kuadrat, dan korelasi Pearson.
* `test/aiken.test.js`: Verifikasi batasan bilangan bulat diskrit Aiken's V dan pembuktian anomali data fabrikasi.
* `test/pcurve.test.js`: Uji kurva distribusi nilai $p$ untuk membedakan efek nyata dari fluktuasi acak dan *selective reporting*.

---

## 🌐 Integrasi Ekosistem

* **Platform Diagnostik Utama:** [https://ilmify.id](https://ilmify.id)
* **Portal Verifikasi Publik:** [https://ilmify.id/verify](https://ilmify.id/verify)
* **Spesifikasi Mesin & Agen:** [https://ilmify.id/llms.txt](https://ilmify.id/llms.txt)

---

## 📜 Lisensi & Etika Penelitian

Dikelola di bawah lisensi Apache-2.0 oleh Dewan Kurator Ilmify dan Open Epistemic Provenance Initiative (OEPI) untuk mendukung transparansi metodologis, kedaulatan riset, dan integritas data publik.
