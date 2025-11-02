# Database Schema Design untuk E-Commerce (Modifikasi - Bahana UMKM)

## 📋 Daftar Tabel (Updated)

### 1. Tabel Users & Roles (Updated)

#### Table: `roles`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Nama role (Super Admin, Admin, Vendor, Sales, Mitra, Customer) |
| description | TEXT | NULLABLE | Deskripsi role |
| permissions | JSONB | NULLABLE | Hak akses dalam format JSON |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |

#### Table: `users`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| username | VARCHAR(100) | NOT NULL, UNIQUE | Username unik |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email unik |
| password_hash | VARCHAR(255) | NOT NULL | Hash password |
| first_name | VARCHAR(100) | NULLABLE | Nama depan |
| last_name | VARCHAR(100) | NULLABLE | Nama belakang |
| phone | VARCHAR(20) | NULLABLE | Nomor telepon |
| phone_verified | BOOLEAN | DEFAULT FALSE | Verifikasi nomor HP |
| verification_code | VARCHAR(10) | NULLABLE | Kode verifikasi HP |
| avatar_url | VARCHAR(500) | NULLABLE | URL foto profil |
| role_id | INTEGER | FOREIGN KEY REFERENCES roles(id) | Role user |
| is_active | BOOLEAN | DEFAULT TRUE | Status aktif |
| email_verified | BOOLEAN | DEFAULT FALSE | Verifikasi email |
| last_login | TIMESTAMP | NULLABLE | Last login |
| current_hotel_id | INTEGER | FOREIGN KEY REFERENCES hotels(id) | Hotel mitra saat ini |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 2. Tabel Mitra Hotel (New)

#### Table: `hotels`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| code | VARCHAR(50) | NOT NULL, UNIQUE | Kode hotel unik |
| name | VARCHAR(200) | NOT NULL | Nama hotel |
| address | TEXT | NOT NULL | Alamat hotel |
| phone | VARCHAR(20) | NOT NULL | Telepon hotel |
| email | VARCHAR(255) | NULLABLE | Email hotel |
| contact_person | VARCHAR(200) | NULLABLE | PIC hotel |
| commission_rate | DECIMAL(5,2) | DEFAULT 0.0 | Persentase komisi mitra |
| is_active | BOOLEAN | DEFAULT TRUE | Status aktif |
| qr_code_url | VARCHAR(500) | NULLABLE | URL QR code |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 3. Tabel Produk & Inventory (Updated)

#### Table: `products`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| name | VARCHAR(200) | NOT NULL | Nama produk |
| slug | VARCHAR(200) | NOT NULL, UNIQUE | Slug URL |
| description | TEXT | NULLABLE | Deskripsi produk |
| short_description | TEXT | NULLABLE | Deskripsi singkat |
| category_id | INTEGER | FOREIGN KEY REFERENCES categories(id) | Kategori utama |
| vendor_id | INTEGER | FOREIGN KEY REFERENCES users(id) | Vendor supplier |
| buy_price | DECIMAL(15,2) | NOT NULL | Harga beli dari vendor |
| sell_price | DECIMAL(15,2) | NOT NULL | Harga jual ke customer |
| margin | DECIMAL(15,2) | NOT NULL | Margin (sell_price - buy_price) |
| commission_rate | DECIMAL(5,2) | DEFAULT 0.0 | Persentase komisi sales |
| sku | VARCHAR(100) | NULLABLE, UNIQUE | SKU unik |
| weight | DECIMAL(10,2) | NULLABLE | Berat (gram) |
| is_active | BOOLEAN | DEFAULT TRUE | Status aktif |
| is_featured | BOOLEAN | DEFAULT FALSE | Produk unggulan |
| meta_title | VARCHAR(200) | NULLABLE | Meta title SEO |
| meta_description | TEXT | NULLABLE | Meta description SEO |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

#### Table: `inventory`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| product_id | INTEGER | FOREIGN KEY REFERENCES products(id) | ID produk |
| current_stock | INTEGER | DEFAULT 0 | Stok tersedia di gudang |
| reserved_stock | INTEGER | DEFAULT 0 | Stok dipinjam/dipesan |
| min_stock | INTEGER | DEFAULT 0 | Stok minimum |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 4. Tabel Sales & Peminjaman (New)

#### Table: `sales_borrows`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| sales_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID sales |
| product_id | INTEGER | FOREIGN KEY REFERENCES products(id) | ID produk |
| borrow_quantity | INTEGER | NOT NULL | Jumlah dipinjam |
| returned_quantity | INTEGER | DEFAULT 0 | Jumlah dikembalikan |
| status | VARCHAR(20) | DEFAULT 'borrowed' | Status (borrowed, returned, partial) |
| borrow_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Tanggal pinjam |
| return_date | TIMESTAMP | NULLABLE | Tanggal kembali |
| notes | TEXT | NULLABLE | Catatan |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 5. Tabel Orders & Payments (Updated)

#### Table: `orders`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| order_number | VARCHAR(50) | NOT NULL, UNIQUE | Nomor order unik |
| user_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID user |
| hotel_id | INTEGER | FOREIGN KEY REFERENCES hotels(id) | Hotel mitra |
| sales_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID sales (jika melalui sales) |
| status | VARCHAR(50) | NOT NULL | Status order |
| subtotal | DECIMAL(15,2) | NOT NULL | Subtotal |
| tax_amount | DECIMAL(15,2) | DEFAULT 0 | Pajak |
| shipping_cost | DECIMAL(15,2) | DEFAULT 0 | Biaya pengiriman |
| admin_fee | DECIMAL(15,2) | DEFAULT 0 | Biaya admin |
| discount_amount | DECIMAL(15,2) | DEFAULT 0 | Diskon |
| total_amount | DECIMAL(15,2) | NOT NULL | Total akhir |
| hotel_commission | DECIMAL(15,2) | DEFAULT 0 | Komisi untuk hotel |
| sales_commission | DECIMAL(15,2) | DEFAULT 0 | Komisi untuk sales |
| notes | TEXT | NULLABLE | Catatan order |
| cancellation_reason | TEXT | NULLABLE | Alasan pembatalan |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

#### Table: `order_items`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| order_id | INTEGER | FOREIGN KEY REFERENCES orders(id) | ID order |
| product_id | INTEGER | FOREIGN KEY REFERENCES products(id) | ID produk |
| product_name | VARCHAR(200) | NOT NULL | Nama produk saat order |
| quantity | INTEGER | NOT NULL | Jumlah |
| unit_price | DECIMAL(15,2) | NOT NULL | Harga satuan saat order |
| total_price | DECIMAL(15,2) | NOT NULL | Total harga |
| vendor_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID vendor |
| buy_price | DECIMAL(15,2) | NOT NULL | Harga beli saat order |

### 6. Tabel Pembayaran (Updated)

#### Table: `payments`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| order_id | INTEGER | FOREIGN KEY REFERENCES orders(id) | ID order |
| payment_method | VARCHAR(100) | NOT NULL | Metode pembayaran |
| payment_gateway | VARCHAR(100) | NOT NULL | Gateway (QRIS, dll) |
| gateway_reference | VARCHAR(200) | NULLABLE | Referensi gateway |
| amount | DECIMAL(15,2) | NOT NULL | Jumlah pembayaran |
| status | VARCHAR(50) | NOT NULL | Status pembayaran |
| qr_code_url | VARCHAR(500) | NULLABLE | URL QR code |
| proof_image | VARCHAR(500) | NULLABLE | Bukti bayar upload user |
| admin_verified | BOOLEAN | DEFAULT FALSE | Verifikasi admin |
| verified_by | INTEGER | FOREIGN KEY REFERENCES users(id) | Admin verifikasi |
| verified_at | TIMESTAMP | NULLABLE | Waktu verifikasi |
| currency | VARCHAR(3) | DEFAULT 'IDR' | Mata uang |
| gateway_response | JSONB | NULLABLE | Response dari gateway |
| paid_at | TIMESTAMP | NULLABLE | Waktu bayar |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 7. Tabel Pengiriman & Bukti (New)

#### Table: `deliveries`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| order_id | INTEGER | FOREIGN KEY REFERENCES orders(id) | ID order |
| courier_name | VARCHAR(200) | NULLABLE | Nama kurir |
| courier_phone | VARCHAR(20) | NULLABLE | Telepon kurir |
| delivery_proof | VARCHAR(500) | NULLABLE | Bukti foto pengiriman |
| received_proof | VARCHAR(500) | NULLABLE | Bukti foto diterima |
| delivered_at | TIMESTAMP | NULLABLE | Waktu sampai di hotel |
| picked_up_at | TIMESTAMP | NULLABLE | Waktu diambil customer |
| notes | TEXT | NULLABLE | Catatan pengiriman |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

### 8. Tabel Laporan & Komisi (New)

#### Table: `vendor_payments`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| vendor_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID vendor |
| period_month | INTEGER | NOT NULL | Bulan (1-12) |
| period_year | INTEGER | NOT NULL | Tahun |
| total_sales | INTEGER | NOT NULL | Jumlah produk terjual |
| total_amount | DECIMAL(15,2) | NOT NULL | Total pembayaran |
| status | VARCHAR(20) | DEFAULT 'pending' | Status pembayaran |
| paid_at | TIMESTAMP | NULLABLE | Waktu dibayar |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |

#### Table: `commission_payments`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| user_id | INTEGER | FOREIGN KEY REFERENCES users(id) | ID user (sales/mitra) |
| user_type | VARCHAR(20) | NOT NULL | Tipe (sales/hotel) |
| period_month | INTEGER | NOT NULL | Bulan (1-12) |
| period_year | INTEGER | NOT NULL | Tahun |
| total_commission | DECIMAL(15,2) | NOT NULL | Total komisi |
| status | VARCHAR(20) | DEFAULT 'pending' | Status pembayaran |
| paid_at | TIMESTAMP | NULLABLE | Waktu dibayar |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |

### 9. Tabel Pengaturan (New)

#### Table: `settings`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-increment ID |
| key | VARCHAR(100) | NOT NULL, UNIQUE | Kunci pengaturan |
| value | TEXT | NOT NULL | Nilai pengaturan |
| description | TEXT | NULLABLE | Deskripsi |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu update |

## 🎯 Workflow yang Ditangani:

### 1. **Customer Flow:**
- Scan QR → Set session hotel → Login/Register → Beli → Bayar QRIS → Upload bukti → Track order → Terima barang → Review

### 2. **Admin Flow:**
- Verifikasi pembayaran → Update status → Atur kurir → Terima bukti pengiriman → Kelola inventory

### 3. **Vendor Flow:**
- Kirim barang ke gudang → Lihat laporan penjualan → Terima pembayaran bulanan

### 4. **Sales Flow:**
- Pinjam barang dari gudang → Jual langsung → Input transaksi → Kembalikan sisa → Dapat komisi

### 5. **Mitra Hotel Flow:**
- Dapat komisi dari transaksi di hotelnya → Lihat laporan transaksi

## 💡 Contoh Data untuk Roles (Updated):
```sql
INSERT INTO roles (name, description) VALUES 
('Super Admin', 'Full system access'),
('Admin', 'Administrative access - kelola gudang'),
('Vendor', 'Supplier produk UMKM'),
('Sales', 'Sales lapangan'),
('Mitra', 'Hotel mitra'),
('Customer', 'Pelanggan');
```

## ⚙️ Pengaturan Default:
```sql
INSERT INTO settings (key, value, description) VALUES 
('sales_commission_rate', '10', 'Persentase komisi sales'),
('hotel_commission_rate', '5', 'Persentase komisi mitra hotel'),
('admin_fee', '2000', 'Biaya admin tetap'),
('shipping_cost', '5000', 'Biaya pengiriman standar');
```

Schema ini sudah dimodifikasi untuk mendukung semua workflow Bahana UMKM! 🚀