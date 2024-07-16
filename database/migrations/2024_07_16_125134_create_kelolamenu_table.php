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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelola_menu');
    }
};
