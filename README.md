<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

### 1. Struktur Direktori

```
app/
    Http/
        Controllers/
            AuthController.php
            MerchantController.php
            CustomerController.php
            MenuController.php
            OrderController.php
    Models/
        User.php
        Merchant.php
        Customer.php
        Menu.php
        Order.php
database/
    migrations/
        create_users_table.php
        create_merchants_table.php
        create_customers_table.php
        create_menus_table.php
        create_orders_table.php
routes/
    web.php
    api.php
```

### 2. Model dan Migrasi

#### User Model dan Migrasi

```php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'type',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function merchant()
    {
        return $this->hasOne(Merchant::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }
}
```

```php
// database/migrations/xxxx_xx_xx_create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('type', ['merchant', 'customer']);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```

#### Merchant Model dan Migrasi

```php
// app/Models/Merchant.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'company_name', 'address', 'contact', 'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
```

```php
// database/migrations/xxxx_xx_xx_create_merchants_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMerchantsTable extends Migration
{
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('company_name');
            $table->string('address');
            $table->string('contact');
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('merchants');
    }
}
```

#### Customer Model dan Migrasi

```php
// app/Models/Customer.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'company_name', 'address', 'contact'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
```

```php
// database/migrations/xxxx_xx_xx_create_customers_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('company_name');
            $table->string('address');
            $table->string('contact');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
```

#### Menu Model dan Migrasi

```php
// app/Models/Menu.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id', 'name', 'description', 'photo', 'price'
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }
}
```

```php
// database/migrations/xxxx_xx_xx_create_menus_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->string('photo');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
```

#### Order Model dan Migrasi

```php
// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'merchant_id', 'menu_id', 'quantity', 'delivery_date', 'status'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
```

```php
// database/migrations/xxxx_xx_xx_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('merchant_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->date('delivery_date');
            $table->enum('status', ['pending', 'completed', 'canceled']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
```

### 3. Controller dan Endpoint

#### AuthController

```php
// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|in:merchant,customer'
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'type' => $validatedData['type']
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'Registrasi berhasil',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'message' => 'Login berhasil',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Email atau password salah'
        ], 401);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logout berhasil'
        ], 200);
    }
}
```

#### MerchantController

```php
// app/Http/Controllers/MerchantController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Merchant;

class MerchantController extends Controller
{
    public function updateProfile(Request $request)
    {
        $merchant = Auth::user()->merchant;

        $validatedData = $request->validate([
            'company_name' =>

 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $merchant->update($validatedData);

        return response()->json([
            'message' => 'Profil merchant berhasil diperbarui',
            'merchant' => $merchant
        ], 200);
    }

    public function getOrders()
    {
        $merchant = Auth::user()->merchant;
        $orders = $merchant->orders;

        return response()->json($orders, 200);
    }
}
```

#### CustomerController

```php
// app/Http/Controllers/CustomerController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function updateProfile(Request $request)
    {
        $customer = Auth::user()->customer;

        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255'
        ]);

        $customer->update($validatedData);

        return response()->json([
            'message' => 'Profil customer berhasil diperbarui',
            'customer' => $customer
        ], 200);
    }

    public function searchCatering(Request $request)
    {
        $query = $request->input('query');

        $merchants = Merchant::where('company_name', 'like', "%$query%")
                            ->orWhere('address', 'like', "%$query%")
                            ->get();

        return response()->json($merchants, 200);
    }
}
```

#### MenuController

```php
// app/Http/Controllers/MenuController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;

class MenuController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        $menu = Auth::user()->merchant->menus()->create($validatedData);

        return response()->json([
            'message' => 'Menu berhasil ditambahkan',
            'menu' => $menu
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        $menu->update($validatedData);

        return response()->json([
            'message' => 'Menu berhasil diperbarui',
            'menu' => $menu
        ], 200);
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json([
            'message' => 'Menu berhasil dihapus'
        ], 200);
    }
}
```

#### OrderController

```php
// app/Http/Controllers/OrderController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'required|date',
        ]);

        $order = Auth::user()->customer->orders()->create([
            'menu_id' => $validatedData['menu_id'],
            'merchant_id' => $request->input('merchant_id'),
            'quantity' => $validatedData['quantity'],
            'delivery_date' => $validatedData['delivery_date'],
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order
        ], 201);
    }
}
```

### 4. Endpoint

```php
// routes/api.php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'isMerchant'])->group(function () {
    Route::put('merchant/profile', [MerchantController::class, 'updateProfile']);
    Route::get('merchant/orders', [MerchantController::class, 'getOrders']);
    Route::post('menu', [MenuController::class, 'store']);
    Route::put('menu/{id}', [MenuController::class, 'update']);
    Route::delete('menu/{id}', [MenuController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'isCustomer'])->group(function () {
    Route::put('customer/profile', [CustomerController::class, 'updateProfile']);
    Route::get('search/catering', [CustomerController::class, 'searchCatering']);
    Route::post('order', [OrderController::class, 'store']);
});
```

### 5. Middleware untuk tipe user

Buat dua middleware baru: `IsMerchant` dan `IsCustomer`.

```php
// app/Http/Middleware/IsMerchant.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsMerchant
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->type == 'merchant') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses ditolak'], 403);
    }
}
```

```php
// app/Http/Middleware/IsCustomer.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsCustomer
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->type == 'customer') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses ditolak'], 403);
    }
}
```

Registrasikan middleware di `app/Http/Kernel.php`.

```php
// app/Http/Kernel.php

protected $routeMiddleware = [
    // middleware lainnya
    'isMerchant' => \App\Http\Middleware\IsMerchant::class,
    'isCustomer' => \App\Http\Middleware\IsCustomer::class,
];
```

### 6. Respon Sukses dan Error

Setiap controller telah mencakup respon sukses dan error dalam bahasa Indonesia.

### 7. Penjelasan

Struktur backend ini memungkinkan adanya dua tipe pengguna: `Merchant` dan `Customer`. Mereka dapat mendaftar, login, dan mengelola profil masing-masing. Merchant dapat mengelola menu makanan dan melihat daftar order. Customer dapat mencari katering, membuat order, dan mendapatkan invoice.

Skema endpoint yang jelas dan middleware memastikan bahwa hanya pengguna dengan hak akses tertentu yang dapat mengakses fitur-fitur tertentu, menjaga keamanan dan validitas sistem.

