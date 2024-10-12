<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Task Routes
    Route::apiResource('tasks', TaskController::class);
    Route::patch('tasks/{task}/complete', [TaskController::class, 'markComplete']);
    Route::patch('tasks/{task}/incomplete', [TaskController::class, 'markIncomplete']);
    Route::post('tasks/{task}/attachments', [TaskController::class, 'addAttachment']);
    Route::delete('tasks/{task}/attachments/{attachment}', [TaskController::class, 'removeAttachment']);

});
