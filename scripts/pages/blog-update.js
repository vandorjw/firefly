const BlogCreate = Vue.component('BlogUpdate', {
    props: {
        blogId: {
            type: String,
            default: ''
        }
    }, 
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
            firebase.firestore().collection('blogposts').add({
                    title: this.blog.title,
                    content: this.blog.content,
                    author: this.$store.getters.user.uid,
                    authorEmail: this.$store.getters.user.email,
                    created: Date.now()
                })
                .then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(error => {
                    console.error("Error adding document: ", error);

                });
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