Vue.component('create-post', {
    props: ['blogId'],
    data () {
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
        addBlogPost: function() {
            firebase.firestore().collection('blogposts').add({
                title: this.blog.title,
                content: this.blog.content,
                author: this.$store.getters.user.uid
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
        <form class="grid-container full">
            <div class="grid-container full">
                <div class="grid-x grid-padding-x">
                    <div class="small-12 cell">
                        <label>Title
                            <input v-model="blog.title" class="cell" type="text" placeholder="Blog Title">
                        </label>
                    </div>
                    <div class="small-12 cell">
                        <label>Content
                        <textarea v-model="blog.content" class="cell" placeholder="Blog Content"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <input v-on:click="addBlogPost" type="button" value="Create">
        </form>`
  })
