const TaskList = Vue.component('TaskList', {
    computed: {
        tasks: function () {
            return this.$store.getters.tasks
        }
    },
    updated() {
        dragula([document.getElementById('taskList')]);
    },
    template: `
    <div class="grid-x grid-margin-x">
        <add-task></add-task>
        <div id="taskList" class="grid-container full small-12">
            <task-card v-for="(task, index) in tasks" v-bind:key="index" :task='task' :taskID='index' ></task-card>
        </div>
    </div>`
})