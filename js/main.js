Vue.component('todo-list', {
    props: ['todos', 'Notebook'], template: `
    <div>
        <div class="blockTodos">
            <div class="containerTodos">
                <div class="setNotebook">
                <input type="text"
                                v-if="todos.val"
                                @keyup.enter="todos.editNotebook(todos.notebookTitle)"
                                v-model="todos.renameNotebook">
                    <p class="title" @click="renameNk(todos.notebookTitle)" v-else>{{todos.notebookTitle}}</p>
                    <button class="deleteNotebookButton" @click="deleteNotebook(k)">X</button>
                    
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
            editValue: '',
            newTodoTitle: '',
            newTodoCase: [{isCompleted: false}],
            newTaskTitle: '',
            renameNotebook: ''
        }
    },
    mounted() {
        if (localStorage.getItem('newTodoCase')) {
            try {
                this.Notebook = JSON.parse(localStorage.getItem('newTodoCase'));
            } catch (e) {
                localStorage.removeItem('newTodoCase');
            }
        }
    },
    methods: {

        addTodo: function () {
            this.newTodoCase.push({
                caseTitle: this.newTaskTitle,
                isCompleted: false
            })
            this.newTaskTitle = '';
            this.todos.saveTodos()

        },

        deleteTask(x) {
            this.newTodoCase.splice(x, 1)
        },

        renameTask(NewTitle) {
            this.editValue = NewTitle;
            this.newTodoCase = this.newTodoCase.map(task => {
                if (task.caseTitle === NewTitle) {
                    task.isEditing = !task.isEditing;
                }
                return task;
            })

        },
        editTask(NewTitle) {
            this.newTodoCase = this.newTodoCase.map(task => {
                if (task.caseTitle === NewTitle) {
                    task.isEditing = !task.isEditing;
                    task.caseTitle = this.editValue;
                }
                return task;
            })
        },
        renameNk(newNotebook) {
            this.renameNotebook = newNotebook;
            this.Notebook = this.Notebook.map(todos => {
                if (todos.notebookTitle === newNotebook) {
                    todos.val = !todos.val;
                }
                return todos;
            })
        },
        deleteNotebook(k) {
            app.Notebook.splice(k, 1)
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
        if (localStorage.getItem('todos')) {
            try {
                this.Notebook = JSON.parse(localStorage.getItem('todos'));
            } catch (e) {
                localStorage.removeItem('todos');
            }
        }
    },
    methods: {

        saveTodos() {
            const parsedTodos = JSON.stringify(this.todos);
            localStorage.setItem('todos', parsedTodos);
        },
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
        },
        editNotebook(newNotebook) {
            this.Notebook = this.Notebook.map(todos => {
                if (todos.notebookTitle === newNotebook) {
                    todos.val = !todos.isEditing;
                    todos.notebookTitle = this.renameNotebook;
                }
                return todos;
            })
        }
    }
})