<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Auth::user()->tasks();

        // Sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Filtering
        if ($request->has('completed')) {
            $completed = $request->input('completed') === 'true';
            $query->where('completed_at', $completed ? '!=' : '=', null);
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->has('due_date_from') && $request->has('due_date_to')) {
            $query->whereBetween('due_date', [$request->input('due_date_from'), $request->input('due_date_to')]);
        }

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('title', 'LIKE', "%{$searchTerm}%");
        }

        $tasks = $query->paginate(10);
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date|after_or_equal:today',
            'priority' => 'nullable|in:Urgent,High,Normal,Low',
        ]);

        $task = Auth::user()->tasks()->create($validatedData);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'due_date' => 'nullable|date|after_or_equal:today',
            'priority' => 'nullable|in:Urgent,High,Normal,Low',
        ]);

        $task->update($validatedData);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->json(null, 204);
    }

    public function markComplete(Task $task)
    {
        $this->authorize('update', $task);
        $task->update(['completed_at' => now()]);
        return response()->json($task);
    }

    public function markIncomplete(Task $task)
    {
        $this->authorize('update', $task);
        $task->update(['completed_at' => null]);
        return response()->json($task);
    }
}