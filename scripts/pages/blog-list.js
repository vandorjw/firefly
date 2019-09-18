const BlogList = Vue.component('BlogList', {
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    template: `
    <div class="grid-x grid-margin-x" id="content">
        <div class="medium-9 cell">
            <blog-post></blog-post>
            <blog-post></blog-post>
            <blog-post></blog-post>
            <blog-post></blog-post>
        </div>
        <sticky-container></sticky-container>
        <pagination-ui></pagination-ui>
    </div>`
  })