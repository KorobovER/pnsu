Vue.component('todo-list', {
    props: ['todos'], template: `
    <div>
        <div class="blockTodos">
            <div class="containerTodos">
                <div class="setNotebook">
                    <p class="title" @click="hiddenVisShow">{{message}}</p>
                    <button class="deleteNotebookButton" @click="deleteNotebook(e)">X</button>
                </div>
                <div class="todoForm" v-for="(todo, e) in todos">
<!--                     <p class="title" @click="hiddenVisShow">{{message}}</p>-->
                    <div class="blockTitleInput">
                        <input class="input" v-if="visibility" v-model="message" placeholder="Введи название блокнота">
                        <button class="buttonApp" v-if="visibility" @click="hiddenVis">Применить</button>
                    </div>
                        <div class="forAddTodo" v-for="(task, x) in newTodoCase" :key="task.caseID">
                            <div class="setTodos">
                                <p class="titleTask">{{ task.caseTitle }} </p>
                                <button class="addTodosButton" @click="deleteCase(x)">X</button>
                            </div>
                        </div>
                        <div class="forCase">
                            <form class="forAddTodoCase" @submit.prevent="addTodo">
                                <div class="blockTitleInput">
                                    <input v-if="visibilityTodos" class="input" placeholder="Добавь задачу" v-model="newCaseTitle">
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
            visibility: true,
            visibilityTodos:false,
            message: '',
            newTodoTitle: '',
            newTodo: [],
            newTodoCase: [],
            newCaseTitle: '',
            clicked: false,
            errors: []
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
                caseTitle: this.newCaseTitle,
            })
            this.newCaseTitle = ''
        },

        deleteCase(x) {
            this.newTodoCase.splice(x, 1)
        }
    }
})


let app = new Vue({
    el: '#app', data: {
        Notebook: [],
        todos: []
    }, methods: {

        addNotebook() {
            this.Notebook.push({
                todos: this.todos
            })
        },
        deleteNotebook(e) {
            this.todos.Notebook.splice(e, 1)
        }
    }
})