<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserWorkspaceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_workspace', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')
                    ->unsigned();
            $table->integer('workspace_id')
                    ->unsigned();
            $table->string('role');

            $table->foreign('user_id')
                    ->references('id')
                    ->on('users');

            $table->foreign('workspace_id')
                    ->references('id')
                    ->on('workspaces')
                    ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_workspace');
    }
}
