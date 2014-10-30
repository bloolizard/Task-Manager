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

    this.path = '/create_task';

    var self = this;

    this.show = function(path){
        console.log(path);
        this.path = path;

        // hide all view
        for (var view in self.views){
            self.views[view].element.style.display = 'none';
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
        });
    }

}

var router = new Router();
console.log(router);
