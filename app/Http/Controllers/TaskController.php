<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::when($request->sortedBy, function ($query) use ($request) {
            return $query->where('user_id', auth()->user()->id)
                ->orderBy($request->sortedBy);
        })
        ->when($request->dueDate, function ($query) use ($request) {
            return $query->where('user_id', auth()->user()->id)
                ->where('completed', false)
                ->whereRaw('DATE(NOW()) = DATE(due_date)');
        }, function ($query) {
            return $query->where('user_id', auth()->user()->id)
                // ->orderBy('completed')
                ->orderBy('created_at', 'desc');
        })
        ->get();
         
        return response()->json($tasks);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->validateWith([
            'task' => 'required|max:255',
            'priority' => 'required',
            'due_date' => 'required|date'
        ]);

        $task = new Task();
        $task->user_id = auth()->user()->id;
        $task->task = $request->task;
        $task->priority = $request->priority;
        $task->due_date = $request->due_date;
        
        return response()->json($task->save());
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', auth()->user()->id)
        ->findOrFail($id);
        $task->completed = $request->completed;
        
        return response()->json($task->save());
    }

    public function destroy($id)
    {
        //
    }
}
