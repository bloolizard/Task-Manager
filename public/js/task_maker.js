'use strict'

function Router(){
    this.views = {
        'create_task': {
            trigger: document.getElementById('show_create_tasks'),
            element: document.getElementById('create_task_container'),
            init: [],
            unload: []
        },
        'show_task':{
            trigger: document.getElementById('show_tasks'),
            element: document.getElementById('show_tasks_container'),
            init: [],
            unload: []
        }
    };

    this.path = 'create_task';

    var self = this;

    this.show = function(path){
        console.log(path);
        this.path = path;

        // hide all view
        for (var view in self.views){
            self.views[view].element.style.display = 'none';
            self.views[view].unload.forEach(function(fn){
                fn();
            });

        }

        //show the current view
//        console.log(self.views);
        self.views[path].element.style.display = 'block';

    };


    for (var view in self.views){
        self.views[view].trigger.addEventListener('click', function(event){
            event.preventDefault();
            var path = /\/#\/(.+)/gmi.exec(this.href);
            console.log(path[0]);
//            console.log(/\/#\/(.+)/gmi.exec(this.href));
//            console.log(/\/#\/(.+)/gmi.exec(this.href)[1]);
            self.show(path[1]);
            self.views[path[1]].init.forEach(function (fn){
                fn();
            });
        });
    }

}

var router = new Router();

router.views['show_task'].init.push(function(){
    // get all the tasks from the backend and display it
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tasks');
    xhr.addEventListener('readystatechange', function(){
        if (xhr.status === 200 && xhr.readyState === 4){
            var data = JSON.parse(xhr.responseText);
            // data is an array
            //parse threw it and draw it on the page
            for (var objs in data){
                createTaskDivElement(data[objs]);
            }
        }
    });
    xhr.send();
});

router.views['show_task'].unload.push(function(){
    router.views['show_task'].element.innerHTML = '';
});

function createTaskDivElement(task){
    var task_container = document.getElementById('show_tasks_container');
    task_container.setAttribute('data-id', task._id);
    var task_item = createElement('div', '', task_container);
    task_item.className = 'task_item';
    var description = createElement('span', task.description, task_item);
    description.className = 'description';


    var icons = createElement('div', '', task_item);
    icons.className = 'icons';
    var delete_icon = createElement('div', '', icons);
    delete_icon.className = 'fa fa-times';
    delete_icon.addEventListener('click', function(){
        var task_div = this.parentNode.parentNode.parentNode;
        console.log(task_div.dataset.id);
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/tasks/'+ task_div.dataset.id);
        xhr.addEventListener('readystatechange', function(){
           if (xhr.status === 200 && xhr.readyState === 4){
               console.log(xhr.responseText);
               // remove the parent div from view
               task_div.parentNode.removeChild(task_div);
           }
        });
        xhr.send();
        console.log('Delete Clicked');
    });

}

function createElement(type, innerHTML, parent){
    var element = document.createElement(type);
    element.innerHTML = innerHTML;
    if (typeof parent !== 'undefined') parent.appendChild(element);
    return element;

}

var create_task_btn = document.getElementById('create_task');
create_task_btn.addEventListener('click', function(e){
    e.preventDefault();
    createServerRequest();
});

function createServerRequest(){
    var form = document.forms.task_form;
    var obj = {
        description: form.description.value,
        status: form.status.value,
        priority: form.priority.value,
        tags: form.tags.value,
        notes: form.notes.value
    };
    console.log(obj);
}