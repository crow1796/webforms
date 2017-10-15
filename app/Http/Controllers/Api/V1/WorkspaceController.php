<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\V1\Workspace;

class WorkspaceController extends Controller
{
    public function all(){
    	return Workspace::all();
    }

    public function create(Request $request){
    	$workspace = Workspace::create(['name' => 'My Workspace']);
    	return $workspace;
    }

    public function delete($workspace, Request $request){
    	return ['deleted' => Workspace::destroy($workspace)];
    }

}
