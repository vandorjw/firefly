Vue.component('blog-post', {
    props: ['blog', 'blogID'],
    computed: {
        user: function () {
            return this.$store.getters.user;
        },
        postdate: function () {
            return moment(this.blog.created).format("dddd, MMMM Do YYYY");;
        },
        isOwner: function () {
            if (this.user) {
                if (this.user.uid === this.blog.author) {
                    return true;
                }
            }
            return false;
        }
    },
    template: `
        <div class="blog-post">
            <h3>{{ blog.title }} <small>{{ postdate }}</small></h3>
            <div v-html="blog.content"></div>
            <div class="callout">
                <ul class="menu simple">
                    <li>Author: {{ blog.authorEmail }}</li>
                    <li><router-link v-if="isOwner" :to="{ name: 'BlogUpdate',  params: { id: blogID }}">edit</router-link></li>
                </ul>
            </div>
        </div>`
})