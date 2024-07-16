## Marketplace Katering

**Marketplace Katering** adalah platform inovatif yang dirancang untuk menghubungkan penyedia layanan katering dengan perusahaan atau individu yang membutuhkan layanan katering berkualitas. Dibangun menggunakan teknologi terkini, Marketplace Katering memanfaatkan Laravel sebagai backend yang handal dan React sebagai frontend yang responsif, memberikan pengalaman pengguna yang mulus dan intuitif.

### Fitur Utama

1. **Portal Merchant**: 
   - **Pendaftaran dan Login**: Merchant dapat mendaftar dan login untuk mengakses akun mereka.
   - **Manajemen Profil**: Merchant dapat mengelola profil bisnis mereka termasuk informasi kontak dan detail layanan.
   - **Manajemen Menu**: Fitur untuk menambah, mengedit, dan menghapus item menu yang mereka tawarkan.
   - **Pesanan dan Faktur**: Merchant dapat melihat daftar pesanan yang masuk dan mengelola faktur dengan mudah.

2. **Portal Pelanggan**:
   - **Pendaftaran dan Login**: Pelanggan dapat mendaftar dan login untuk mengakses akun mereka.
   - **Pencarian Katering**: Pelanggan dapat mencari layanan katering berdasarkan berbagai kriteria seperti lokasi, jenis makanan, dan harga.
   - **Pemesanan**: Kemudahan dalam memesan layanan katering langsung dari platform.
   - **Riwayat Pesanan dan Faktur**: Pelanggan dapat melihat riwayat pesanan mereka dan mengakses faktur.

3. **Manajemen Pengguna**:
   - Sistem otentikasi yang aman untuk memastikan hanya pengguna terverifikasi yang dapat mengakses platform.
   - Perbedaan peran antara merchant dan pelanggan untuk memberikan fitur yang disesuaikan dengan kebutuhan masing-masing.

### Teknologi

- **Backend**: Laravel digunakan untuk mengelola logika bisnis, otentikasi, dan integrasi database. Dengan kemampuan yang kuat dan ekosistem yang kaya, Laravel memastikan bahwa aplikasi backend berjalan dengan lancar dan aman.
- **Frontend**: React digunakan untuk membangun antarmuka pengguna yang responsif dan dinamis. Dengan React, pengguna mendapatkan pengalaman yang cepat dan intuitif saat menjelajahi dan menggunakan fitur-fitur di Marketplace Katering.

### Keunggulan

- **Koneksi yang Efektif**: Menghubungkan penyedia layanan katering dengan pelanggan potensial secara efisien.
- **Pengelolaan Mudah**: Memberikan alat yang diperlukan untuk mengelola pesanan dan layanan katering dengan mudah.
- **Pengalaman Pengguna yang Unggul**: Antarmuka pengguna yang dirancang dengan baik untuk memberikan pengalaman yang menyenangkan dan tanpa hambatan.
- **Keamanan Data**: Menggunakan standar keamanan tinggi untuk melindungi data pengguna dan transaksi.

Marketplace Katering adalah solusi sempurna bagi Anda yang mencari aplikasi atau source code untuk membantu memudahkan dalam menemukan dan mengelola layanan katering. Dengan teknologi canggih dan fitur lengkap, Marketplace Katering siap menjadi aplikasi Anda dalam setiap acara dan kebutuhan katering Anda.

### Rincian Fungsional

- **User Model**: Mewakili pengguna aplikasi. Memiliki relasi one-to-one dengan model `Customer` atau `Merchant`.
- **Customer Model**: Mewakili data customer. Memiliki relasi one-to-one dengan `User` dan relasi one-to-many dengan `Order` dan `Invoice`.
- **Merchant Model**: Mewakili data merchant. Memiliki relasi one-to-one dengan `User` dan relasi one-to-many dengan `KelolaMenu`, `DaftarOrder`, dan `Invoice`.
- **KelolaMenu Model**: Mewakili menu yang dikelola oleh merchant. Memiliki relasi many-to-one dengan `Merchant` dan relasi one-to-many dengan `DaftarOrder`.
- **DaftarOrder Model**: Mewakili daftar order yang dibuat oleh customer. Memiliki relasi many-to-one dengan `Customer`, `Merchant`, dan `KelolaMenu`.
- **Order Model**: Mewakili order yang dibuat oleh customer. Memiliki relasi many-to-one dengan `Customer`, `Merchant`, dan `KelolaMenu`.
- **Invoice Model**: Mewakili invoice untuk order. Memiliki relasi many-to-one dengan `Customer` dan `Merchant`.

- **Register**: Validasi data input, buat user baru, jika user adalah customer atau merchant, juga buat data di tabel `customers` atau `merchants` yang sesuai.
- **Login**: Validasi data input, cek email dan password, jika benar, buat token autentikasi dan kirimkan kembali.
- **User Details**: Ambil data user yang sedang login, dan jika user

 adalah customer atau merchant, ambil data detail dari tabel yang sesuai.
- **Update User**: Validasi data input, perbarui data di tabel `users` dan `customers` atau `merchants` sesuai dengan peran user yang sedang login.
- **Update Photo**: Validasi file foto yang diunggah, simpan file, perbarui jalur file foto di tabel `users` dan `customers` atau `merchants`.
- **Merchant Details**: Ambil data merchant yang sedang login, termasuk data menu, order, dan invoice terkait.
- **Store Menu**: Validasi data input, buat menu baru untuk merchant yang sedang login.
- **Update Menu**: Validasi data input, perbarui data menu yang sesuai dengan ID menu.
- **Delete Menu**: Hapus data menu yang sesuai dengan ID menu.
- **Confirm Payment**: Validasi data input, perbarui status pembayaran di tabel `invoice`, dan perbarui status order berdasarkan status pembayaran.
- **Order Details**: Ambil semua data order yang sesuai dengan user yang sedang login.
- **Create Order**: Validasi data input, buat order baru untuk customer yang sedang login.
- **Upload Payment Proof**: Validasi file bukti pembayaran yang diunggah, simpan file, perbarui jalur file bukti pembayaran di tabel `invoice`.

### Langkah-Langkah Implementasi

1. **Membuat Migrasi Database**
2. **Membuat Model**
2. **Membuat Controller**
3. **Menambahkan Routes API**

### 1. Migrasi untuk Database

**1.1. Migrasi Users Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['customer', 'merchant']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```

**1.2. Migrasi Customers Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_customer')->constrained('users')->onDelete('cascade');
            $table->string('no_hp');
            $table->string('nama_kantor');
            $table->string('alamat');
            $table->string('foto_profile')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
```

**1.3. Migrasi Merchants Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMerchantsTable extends Migration
{
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_merchant')->constrained('users')->onDelete('cascade');
            $table->string('nama_kantor');
            $table->string('no_hp');
            $table->string('alamat');
            $table->string('foto_profile')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('merchants');
    }
}
```

**1.4. Migrasi Kelola Menu Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelolaMenuTable extends Migration
{
    public function up()
    {
        Schema::create('kelola_menu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_merchant')->constrained('merchants')->onDelete('cascade');
            $table->string('nama_menu');
            $table->integer('stok_menu');
            $table->decimal('harga_menu', 10, 2);
            $table->text('deskripsi_menu');
            $table->string('foto_menu')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kelola_menu');
    }
}
```

**1.5. Migrasi Daftar Order Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaftarOrderTable extends Migration
{
    public function up()
    {
        Schema::create('daftar_order', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_merchant')->constrained('merchants')->onDelete('cascade');
            $table->foreignId('id_customer')->constrained('customers')->onDelete('cascade');
            $table->foreignId('id_menu')->constrained('kelola_menu')->onDelete('cascade');
            $table->integer('jumlah_order');
            $table->string('no_hp');
            $table->string('alamat_pengiriman');
            $table->enum('status_order', ['Pesanan pending', 'Pesanan disiapkan', 'Pesanan diantar', 'Pesanan Selesai', 'Pesanan Gagal']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('daftar_order');
    }
}
```

**1.6. Migrasi Order Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_merchant')->constrained('merchants')->onDelete('cascade');
            $table->foreignId('id_customer')->constrained('customers')->onDelete('cascade');
            $table->foreignId('menu_id')->constrained('kelola_menu')->onDelete('cascade');
            $table->integer('jumlah_order');
            $table->string('no_hp');
            $table->string('alamat_pengiriman');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
```

**1.7. Migrasi Invoice Table**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceTable extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_merchant')->constrained('merchants')->onDelete('cascade');
            $table->foreignId('id_customer')->constrained('customers')->onDelete('cascade');
            $table->decimal('jumlah_pembayaran', 10, 2);
            $table->string('bukti_pembayaran')->nullable();
            $table->enum('status_pembayaran', ['Menunggu Konfirmasi', 'Pembayaran Diterima', 'Pembayaran Kadaluarsa']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
```

### 2. Membuat Model

**2.1. User Model**

```php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nama', 'email', 'password', 'role', 'foto_profile',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->hasOne(Merchant::class, 'id_merchant');
    }
}
```

**2.2. Customer Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_customer', 'no_hp', 'nama_kantor', 'alamat', 'foto_profile',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_customer');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'id_customer');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_customer');
    }
}
```

**2.3. Merchant Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'nama_kantor', 'no_hp', 'alamat', 'foto_profile',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_merchant');
    }

    public function menu()
    {
        return $this->hasMany(KelolaMenu::class, 'id_merchant');
    }

    public function orders()
    {
        return $this->hasMany(DaftarOrder::class, 'id_merchant');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_merchant');
    }
}
```

**2.4. KelolaMenu Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu', 'foto_menu',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function orders()
    {
        return $this->hasMany(DaftarOrder::class, 'id_menu');
    }
}
```

**2.5. DaftarOrder Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'id_customer', 'id_menu', 'jumlah_order', 'no_hp', 'alamat_pengiriman', 'status_order',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function menu()
    {
        return $this->belongsTo(KelolaMenu::class, 'id_menu');
    }
}
```

**2.6. Order Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'id_customer', 'id_menu', 'jumlah_order', 'no_hp', 'alamat_pengiriman',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function menu()
    {
        return $this->belongsTo(KelolaMenu::class, 'id_menu');
    }
}
```

**2.7. Invoice Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'id_customer', 'jumlah_pembayaran', 'bukti_pembayaran', 'status_pembayaran',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }
}
```

### 3. Membuat Controller

**3.1. UserController**

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Merchant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // Registrasi user baru
    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:customer,merchant',
            'no_hp' => 'required|string|max:15',
            'nama_kantor' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'foto_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Simpan foto profil jika ada
        $path = $request->hasFile('foto_profile') ? $request->file('foto_profile')->store('public/profile_photos') : null;

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'foto_profile' => $path,
        ]);

        if ($user->role == 'customer') {
            Customer::create([
                'id_customer' => $user->id,
                'no_hp' => $request->no_hp,
                'nama_kantor' => $request->nama_kantor,
                'alamat' => $request->alamat,
                'foto_profile' => $path,
            ]);
        } else {
            Merchant::create([
                'id_merchant' => $user->id,
                'nama_kantor' => $request->nama_kantor,
                'no_hp' => $request->no_hp,
                'alamat' => $request->alamat,
                'foto_profile' => $path,
            ]);
        }

        return response()->json(['message' => 'Registrasi berhasil'], 201);
    }


    // Login user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah'],
            ]);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'role' => $user->role], 200);
    }

    // Menampilkan data user yang sedang login
    public function userDetails()
    {
        $user = auth()->user();
        $roleDetails = null;

        if ($user->role == 'Customer') {
            $roleDetails = $user->customer;
        } else {
            $roleDetails = $user->merchant;
        }

        return response()->json(['user' => $user, 'details' => $roleDetails], 200);
    }

    // Edit data user yang sedang login
    public function updateUser(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'nama' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'string|min:8|nullable',
        ]);

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->update($request->only('nama', 'email'));

        if ($user->role == 'Customer') {
            $user->customer->update($request->only('no_hp', 'nama_kantor', 'alamat', 'foto_profile'));
        } else {
            $user->merchant->update($request->only('nama_kantor', 'no_hp', 'alamat', 'foto_profile'));
        }

        return response()->json(['message' => 'Data berhasil diperbarui'], 200);
    }

    // Edit foto user yang sedang login
    public function updatePhoto(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'foto_profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('foto_profile')->store('public/profile_photos');
        $user->update(['foto_profile' => $path]);

        if ($user->role == 'Customer') {
            $user->customer->update(['foto_profile' => $path]);
        } else {
            $user->merchant->update(['foto_profile' => $path]);
        }

        return response()->json(['message' => 'Foto berhasil diperbarui'], 200);
    }
}

```

**3.2. MerchantController**

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KelolaMenu;
use App\Models\DaftarOrder;
use App\Models\Invoice;

class MerchantController extends Controller
{
    // Menampilkan data merchant yang sedang login
    public function merchantDetails()
    {
        $user = auth()->user();
        $merchant = $user->merchant;

        $menu = KelolaMenu::where('id_merchant', $merchant->id)->get();
        $orders = DaftarOrder::where('id_merchant', $merchant->id)->get();
        $invoices = Invoice::where('id_merchant', $merchant->id)->get();

        return response()->json(['merchant' => $merchant, 'menu' => $menu, 'orders' => $orders, 'invoices' => $invoices], 200);
    }

    // CRUD Kelola Menu
    public function storeMenu(Request $request)
    {
        $request->validate([
            'nama_menu' => 'required|string|max:255',
            'stok_menu' => 'required|integer',
            'harga_menu' => 'required|numeric',
            'deskripsi_menu' => 'required|string',
            'foto_menu' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $menu = new KelolaMenu($request->only('nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu'));
        if ($request->hasFile('foto_menu')) {
            $path = $request->file('foto_menu')->store('public/menu_photos');
            $menu->foto_menu = $path;
        }

        $menu->id_merchant = auth()->user()->merchant->id;
        $menu->save();

        return response()->json(['message' => 'Menu berhasil ditambahkan', 'menu' => $menu], 201);
    }

    public function updateMenu(Request $request, $id)
    {
        $request->validate([
            'nama_menu' => 'string|max:255',
            'stok_menu' => 'integer',
            'harga_menu' => 'numeric',
            'deskripsi_menu' => 'string',
            'foto_menu' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $menu = KelolaMenu::findOrFail($id);
        $menu->update($request->only('nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu'));

        if ($request->hasFile('foto_menu')) {
            $path = $request->file('foto_menu')->store('public/menu_photos');
            $menu->update(['foto_menu' => $path]);
        }

        return response()->json(['message' => 'Menu berhasil diperbarui', 'menu' => $menu], 200);
    }

    public function deleteMenu($id)
    {
        $menu = KelolaMenu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Menu berhasil dihapus'], 200);
    }

    // Konfirmasi pembayaran dan update status order
    public function confirmPayment(Request $request, $id)
    {
        $request->validate([
            'status_pembayaran' => 'required|in:Menunggu Konfirmasi,Pembayaran Diterima,Pembayaran Kadaluarsa',
        ]);

        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->only('status_pembayaran'));

        $order = DaftarOrder::where('id_merchant', $invoice->id_merchant)
                            ->where('id_customer', $invoice->id_customer)
                            ->first();

        if ($request->status_pembayaran == 'Menunggu Konfirmasi') {
            $order->update(['status_order' => 'Pesanan pending']);
        } elseif ($request->status_pembayaran == 'Pembayaran Diterima') {
            $order->update(['status_order' => 'Pesanan disiapkan']);
        } elseif ($request->status_pembayaran == 'Pembayaran Kadaluarsa') {
            $order->update(['status_order' => 'Pesanan Gagal']);
        }

        return response()->json(['message' => 'Status pembayaran dan order berhasil diperbarui'], 200);
    }
}
```

**3.3. OrderController**

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // Menampilkan semua order berdasarkan user yang sedang login
    public function orderDetails()
    {
        $user = auth()->user();
        if ($user->role == 'Customer') {
            $orders = Order::where('id_customer', $user->customer->id)->get();
        } else {
            $orders = Order::where('id_merchant', $user->merchant->id)->get();
        }

        return response()->json(['orders' => $orders], 200);
    }

    // Membuat order baru
    public function createOrder(Request $request)
    {
        $request->validate([
            'id_merchant' => 'required|exists:merchants,id',
            'id_menu' => 'required|exists:kelola_menu,id',
            'jumlah_order' => 'required|integer',
            'no_hp' => 'required|string',
            'alamat_pengiriman' => 'required|string',
        ]);

        $order = new Order($request->only('id_merchant', 'id_menu', 'jumlah_order', 'no_hp', 'alamat_pengiriman'));
        $order->customer_id = auth()->user()->customer->id;
        $order->save();

        return response()->json(['message' => 'Order berhasil dibuat', 'order' => $order], 201);
    }
}
```

**4.4. InvoiceController**

```php

    // Mendapatkan semua invoice berdasarkan id_merchant
    public function getInvoicesByMerchant($merchantId)
    {
        $invoices = Invoice::where('id_merchant', $merchantId)->get();
        return response()->json($invoices, 200);
    }
}
```

### 4. Routes API

**4.1. api.php**

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InvoiceController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user-details', [UserController::class, 'userDetails']);
    Route::put('update-user', [UserController::class, 'updateUser']);
    Route::post('update-photo', [UserController::class, 'updatePhoto']);

    Route::get('merchant-details', [MerchantController::class, 'merchantDetails']);
    Route::post('menu', [MerchantController::class, 'storeMenu']);
    Route::put('menu/{id}', [MerchantController::class, 'updateMenu']);
    Route::delete('menu/{id}', [MerchantController::class, 'deleteMenu']);
    Route::put('confirm-payment/{id}', [MerchantController::class, 'confirmPayment']);

    Route::get('order-details', [OrderController::class, 'orderDetails']);
    Route::post('create-order', [OrderController::class, 'createOrder']);

    Route::post('upload-payment-proof/{id}', [InvoiceController::class, 'uploadPaymentProof']);

    // Rute baru untuk mendapatkan semua invoice berdasarkan id_customer dan id_merchant
    Route::get('invoices/customer/{customerId}', [InvoiceController::class, 'getInvoicesByCustomer']);
    Route::get('invoices/merchant/{merchantId}', [InvoiceController::class, 'getInvoicesByMerchant']);
});
```
