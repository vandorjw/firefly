const BlogCreate = Vue.component('BlogCreate', {
    data() {
        return {
            blog: {
                title: '',
                content: ''
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        addBlogPost: function () {
            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }
            this.$store.commit('createBlog', {
                title: this.blog.title,
                content: this.blog.content,
                author: this.$store.getters.user.uid,
                authorEmail: this.$store.getters.user.email,
                created: Date.now()
            });
            router.push({name: 'BlogList'});
        }
    },
    template: `
    <div>
    <br />
        <form class="grid-container full">
            <div class="grid-x grid-padding-x">
                <div class="small-12 cell"> 
                    <input v-model="blog.title" class="cell" type="text" placeholder="Blog Title">
                </div>
            </div>
        </form>

        <quill-editor v-model="blog.content"></quill-editor>

        <input v-on:click="addBlogPost" type="button" value="Create">

    </div>`
})