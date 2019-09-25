const BlogUpdate = Vue.component('BlogUpdate', {
    computed: {
        user: function () {
            return this.$store.getters.user
        },
        blog: function () {
            return this.$store.getters.blogs[this.$route.params.id];
        }
    },
    methods: {
        updateBlog: function () {
            let payload = {
                id: this.$route.params.id,
                data: this.blog,
                delta: {
                    title: this.blog.title,
                    content: this.blog.content
                }
            };
            this.$store.commit('updateBlog', payload);
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

        <quill-editor v-if="blog.content" v-model="blog.content"></quill-editor>

        <input v-on:click="updateBlog" type="button" value="Update">

    </div>`
})