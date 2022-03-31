Vue.component('todo-list', {
    props: ['todos'], template: `
    <div>
        <div class="blockTodos">
            <div class="containerTodos">
                <div class="setNotebook">
                    <p class="title" @click="hiddenVisShow">{{message}}</p>
                    <button class="deleteNotebookButton" @click="todos.deleteNotebook(e)">X</button>
                </div>
                <div class="todoForm" v-for="(todo, e) in todos">
                    <div class="blockTitleInput">
                        <input class="input" v-if="visibility" v-model="message" placeholder="Для работы введите название блокнота">
                        <button class="buttonApp" v-if="visibility" @click="hiddenVis">Применить</button>
                    </div>
                        <div class="forAddTodo" v-for="(task, x) in newTodoCase">
                            <div class="setTodos">
                             <input type="text"
                                v-if="task.isEditing"
                                @keyup.enter="editTask(task.caseTitle)"
                                v-model="editValue">
                                <p class="titleTask"  @click="renameTask(task.caseTitle)" v-else>{{ task.caseTitle }} </p>
                                <button class="addTodosButton" @click="deleteTask(x)">X</button>                             
                            </div>
                        </div>
                        <div class="forCase">
                            <form class="forAddTodoCase" @submit.prevent="addTodo">
                                <div class="blockTitleInput">
                                    <input v-if="visibilityTodos" class="input" placeholder="Добавь задачу" v-model="newTaskTitle">
                                    <button class="buttonApp" v-if="visibilityTodos">+</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `, data() {
        return {
            editValue:'',
            visibility: true,
            visibilityTodos:false,
            message: '',
            newTodoTitle: '',
            newTodo: [
            ],
            newTodoCase: [
                {
                    caseTitle:'Ваши задачи',
                    isEditing: false
                }
            ],
            newTaskTitle: '',
            clicked: false,
            errors: []
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
        hiddenVis: function () {
            this.visibility = false;
            this.visibilityTodos = true;
        },
        hiddenVisShow: function () {
            this.visibility = true;
        },
        addTod: function () {
            this.newTodo.push({
                todoCase: this.newTodoCase,
            })
        },

        addTodo: function () {
            this.newTodoCase.push({
                caseTitle: this.newTaskTitle,
            })
            this.newTaskTitle = ''
        },

        deleteTask(x) {
            this.newTodoCase.splice(x, 1)
        },
        resetStatus(index){
            this.todos[index].status= !this.todos[index].status;
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
    }
})


let app = new Vue({
    el: '#app', data: {
        Notebook: [],
        todos: []
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
            const parsedTodos = JSON.stringify(this.Notebook);
            localStorage.setItem('Notebook', parsedTodos);
        },
        addNotebook() {
            this.Notebook.push({
                todos: this.todos
            })
            this.saveNotebook()
        },
        deleteNotebook(e) {
            this.todos.Notebook.splice(e, 1)
        }
    }
})