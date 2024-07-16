<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daftar_order');
    }
};
