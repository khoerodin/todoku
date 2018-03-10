@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">

            <div class="card border-1 mb-3 d-none" id="dueCard">
                <div class="card-header border-0 bg-white text-danger">
                    Due Today
                </div>

                <div class="card-body">
                    <ul class="list-group" id="dueTaskList">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Wait.. 
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="card border-1">
                <div class="card-header border-0 bg-white">
                    <div class="row">
                        <div class="col-md-8"></div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <select class="custom-select" id="sortedBy">
                                    <option selected disabled>Sorted By</option>
                                    <option value="due_date">Due Date</option>
                                    <option value="priority">Priority</option>
                                    <option value="task">Task</option>
                                </select>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#newTaskModal">Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <ul class="list-group" id="taskList">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Wait.. 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal" id="newTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <input type="text" name="task" class="form-control">
                <small class="form-text text-muted task-help mb-3">Your task</small>
                
                <div class="input-group">
                    <select class="custom-select" name="priority" id="inputGroupSelect04">
                        <option value="4">Low</option>
                        <option value="3">Medium</option>
                        <option value="2">High</option>
                        <option value="1">Critical</option>
                    </select>                    
                </div>
                <small class="form-text text-muted priority-help mb-3">Priority</small>

                <input type="date" name="due_date" class="form-control">
                <small class="form-text text-muted due_date-help mb-3">Due Date</small>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="save">Add New</button>
            </div>
        </div>
    </div>
</div>
@endsection
