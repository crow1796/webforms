<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCashierToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('stripe_id')
                    ->after('password')
                    ->nullable();
            $table->string('card_brand')
                    ->after('stripe_id')
                    ->nullable();
            $table->string('card_last_four')
                    ->after('card_brand')
                    ->nullable();
            $table->timestamp('trial_ends_at')
                    ->after('card_last_four')
                    ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}