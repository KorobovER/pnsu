Vue.component('todo-list', {
    props: ['todos', 'Notebook'], template: `
    <div>
        <div class="blockTodos">
            <div class="containerTodos">
                <div class="setNotebook">
                 
                    <p class="title" v-if="val" @click="renameNk">{{todos.notebookTitle}}</p>
                     <input class="input" v-model="renameNotebook" type="text" v-else @keyup.enter="editNotebook(todos)">
                    <button class="deleteNotebookButton" @click="deleteNotebook">X</button>
                    
                </div>
                <div class="todoForm" v-for="(todo, k) in todos">
                        <div class="forAddTodo" v-for="(task, x) in newTodoCase">
                            <div class="setTodos">
                             <input type="text"
                                v-if="task.isEditing"
                                @keyup.enter="editTask(task.caseTitle)"
                                v-model="editValue">
                                <p class="titleTask"  v-else :class="{'strike': task.isCompleted}" @click="task.isCompleted = !task.isCompleted">{{ task.caseTitle }} </p>
                                <button class="addTodosButton" @click="renameTask(task.caseTitle)">Переименовать</button>
                                <button class="addTodosButton" @click="deleteTask(x)">X</button>                             
                            </div>
                        </div>
                        <div class="forCase">
                            <form class="forAddTodoCase" @submit.prevent="addTodo">
                                <div class="blockTitleInput">
                                    <input  class="input" placeholder="Добавь задачу" v-model="newTaskTitle">
                                    <button class="buttonApp">+</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            val: true,
            editValue: '',
            newTodoTitle: '',
            newTodoCase: [],
            newTaskTitle: '',
            renameNotebook: ''
        }
    },
    mounted() {
        if (localStorage.getItem('newTodoCase')) {
            try {
                this.newTodoCase = JSON.parse(localStorage.getItem('newTodoCase'));
            } catch (x) {
                localStorage.removeItem('newTodoCase');
            }
        }
    },
    methods: {
        saveCase() {
            const parsedCase = JSON.stringify(this.newTodoCase);
            localStorage.setItem('newTodoCase', parsedCase)
        },
        addTodo: function () {
            this.newTodoCase.push({
                caseTitle: this.newTaskTitle,
                isCompleted: false
            })
            this.newTaskTitle = '';
            this.saveCase()

        },

        deleteTask(x) {
            this.newTodoCase.splice(x, 1)
            this.saveCase()
        },
        renameTask(NewTitle) {
            this.editValue = NewTitle;
            this.newTodoCase = this.newTodoCase.map(task => {
                if (task.caseTitle === NewTitle) {
                    task.isEditing = !task.isEditing;
                }
                return task;
            })
            this.saveCase()
        },
        editTask(NewTitle) {
            this.newTodoCase = this.newTodoCase.map(task => {
                if (task.caseTitle === NewTitle) {
                    task.isEditing = !task.isEditing;
                    task.caseTitle = this.editValue;
                }
                return task;
            })
            this.saveCase()
        },
        renameNk() {
            this.val = !this.val;
        },
        editNotebook(todos) {
            if (this.renameNotebook !== ""){
                todos.notebookTitle = this.renameNotebook
                this.val = true
            }
            app.saveNotebook();
        },

        deleteNotebook(k) {
            app.Notebook.splice(k, 1)
            app.saveNotebook();
        },
    }
})


let app = new Vue({
    el: '#app',
    data: {
        newNotebookTitle: '',
        Notebook: [],
        todos: [],
    },
    mounted() {
        if (localStorage.getItem('Notebook')) {
            try {
                this.Notebook = JSON.parse(localStorage.getItem('Notebook'));
            } catch (e) {
                localStorage.removeItem('Notebook');
            }
        }

    },
    methods: {
        saveNotebook() {
            const parsedNotebook = JSON.stringify(this.Notebook);
            localStorage.setItem('Notebook', parsedNotebook);
        },
        addNotebook() {
            this.Notebook.push({
                notebookTitle: this.newNotebookTitle,
            })
            this.newNotebookTitle = '';
            this.saveNotebook();
        }
    }
})