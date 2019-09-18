Vue.component('task-card', {
    props: ['taskId'],
    data () {
        return {
            task: {
                title: '',
                complete: ''
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        getTask: function(taskId) {
            let docRef = firebase.firestore().collection('tasks').doc(taskId);
            docRef.get().then(doc => {
                this.task = doc.data();
            })
        }
    },
    created() {
        this.getTask(this.taskId);
    },
    template: `
    <div class="cell">
        <div class="card">
            <div class="card-section">
                <h4>{{ task.title }}</h4>
            </div>
        </div>
    </div>
    `
  })
