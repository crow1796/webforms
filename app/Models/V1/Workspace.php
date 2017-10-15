<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    protected $table = 'workspaces';
    protected $fillable = [
    	'name',
    ];
    protected $dates = [
    	'created_at',
    	'updated_at',
    ];
}
