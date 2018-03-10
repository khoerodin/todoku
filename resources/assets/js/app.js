
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});

let loadTask = function(params) {
    axios.get('/tasks', {
            params: {
                sortedBy: params.sortedBy,
                dueDate: params.dueDate
            }
        })
        .then(function (response) {
            let data = response.data
            let list = ''
            data.forEach(function(value){
                let task = value.task
                let checked = ``
                let priorityBadge = ``
                let priorityText = ``
                if (value.completed) {
                    task = `<strike>` + value.task + `</strike>`
                    checked = `checked`
                }

                switch(value.priority) {
                    case 1:
                        priorityBadge = 'danger'
                        priorityText = 'Critical'
                        break
                    case 2:
                        priorityBadge = 'warning'
                        priorityText = 'High'
                        break
                    case 3:
                        priorityBadge = 'info'
                        priorityText = 'Medium'
                        break;
                    case 4:
                        priorityBadge = 'success'
                        priorityText = 'Low'
                        break;
                }

                list += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" `+ checked +` class="custom-control-input" id="`+ value.id +`">
                                <label class="custom-control-label" for="`+ value.id +`">`+ task +`</label>
                                <small class="text-muted"><i> ~ ` + value.due_date + `</i></small>
                                </div>
                            <span class="badge badge-`+ priorityBadge +`">`+ priorityText +`</span>
                        </li>`
            })
            
            if (params.dueDate) {
                if (data.length > 0) {
                    $('#dueCard').removeClass('d-none');
                    $('#dueTaskList').html(list)
                } else {
                    $('#dueCard').addClass('d-none');
                }                    
            } else {
                if (data.length > 0) {
                    $('#taskList').html(list)
                } else {
                    $('#taskList').html(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            You do not have a task yet. 
                        </li>`
                    )
                } 
            }   
        })
        .catch(function (error) {
            if (error.response) {
                // console.log(error.response)
            } else if (error.request) {
                // console.log(error.request)
            } else {
                // console.log('Error', error.message)
            }
            // console.log(error.config)
        }); 
}

let saveTask = function() {
    let params = {
        task: $('[name="task"]').val(),
        priority: $('[name="priority"]').val(),
        due_date: $('[name="due_date"]').val(),
    }
    
    axios.post('/tasks', params)
        .then(function (response) {
            loadTask({sortedBy: localStorage.getItem('sortedBy')})
            loadTask({dueDate: true})
            $('[data-dismiss="modal"]').click()
        })
        .catch(function (error) {
            if (error.response) {
                if (422 === error.response.status) {
                    let err = error.response.data.errors
                    for (var key in err) {
                        if (err.hasOwnProperty(key)) {
                            $('.' + key + '-help').removeClass('text-muted').addClass('text-danger').text(err[key])
                        }
                    }                 
                }
            } else if (error.request) {
                // console.log(error.request)
            } else {
                // console.log('Error', error.message)
            }
            // console.log(error.config)
        })   
}

let udpdteTask = function(taskId, completed) {
    axios.put('/tasks/' + taskId, {completed: completed})
        .then(function (response) {
            loadTask({dueDate: true})
        })
        .catch(function (error) {
            if (error.response) {
                // console.log(error.response)
            } else if (error.request) {
                // console.log(error.request)
            } else {
                // console.log('Error', error.message)
            }
            // console.log(error.config)
            let checkboxId = taskId
            let checkboxLabel = $('[for="'+ checkboxId +'"]').text()
            $('[for="'+ checkboxId +'"]').text(checkboxLabel)
            $('[type="checkbox"]#' + checkboxId).prop('checked', false);
        })   
}

$(document).on('click', '#save', function(e) {
    saveTask()
});

$(document).on('change', '#sortedBy', function(e) {
    localStorage.setItem('sortedBy', this.value)
    loadTask({sortedBy: localStorage.getItem('sortedBy')})
});

$(document).on('change', '[type="checkbox"]', function(e) {
    let checkboxId = $(this).attr('id')
    let checkboxLabel = $('#taskList [for="'+ checkboxId +'"]').text()

    if ($(this).is(':checked')) {        
        let strikedLabel = `<strike>` + checkboxLabel + `</strike>`
        $('[for="'+ checkboxId +'"]').html(strikedLabel)
        $('#dueTaskList #' + checkboxId).prop('checked', true)
        $('#taskList #' + checkboxId).prop('checked', true)
        udpdteTask(checkboxId, true)
    } else {
        $('[for="'+ checkboxId +'"]').text(checkboxLabel)
        $('#dueTaskList #' + checkboxId).prop('checked', false)
        $('#taskList #' + checkboxId).prop('checked', false)
        udpdteTask(checkboxId, false)
    }
});

localStorage.removeItem('sortedBy')
loadTask({})
loadTask({dueDate: true})

$('#newTaskModal').on('hidden.bs.modal', function (e) {
    $('[name="task"]').val('')
    $('[name="priority"]').val('')
    $('[name="due_date"]').val('')
})
