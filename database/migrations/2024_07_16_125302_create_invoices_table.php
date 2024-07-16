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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
