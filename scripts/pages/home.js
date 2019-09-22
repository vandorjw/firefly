const Home = Vue.component('Home', {
    template: `
    <div>
        <div class="callout large primary">
            <div class="text-center">
                <h1>Hello World!</h1>
            </div>
        </div>
        <h2>What is this?</h2>
        <p>This is a simple project I created to explore Google Firebase. A post on Reddit discussed multiple ways to serve private information on a public host like netlify for free.
        My idea was to store information in Google Firebase, (which has a free plan), and only serve that information to authenticated users.</p>

        <p>Tasks are only visible<sup>1</sup> to the user who created them.</p>
        <p>Blog content is public to everyone.</p>

        <h2>What tools does this project use?</h2>
        <ul>
            <li><em>Web Server</em>: <a href="https://www.netlify.com/">Netlify</a></li>
            <li><em>Document Store</em>: <a href="https://firebase.google.com/products/firestore/">Google Firestore</a></li>
            <li><em>Authentication Server</em>: <a href="https://firebase.google.com/products/auth/">Google Firebase Auth</a></li>
            <li><em>Web Frameworks</em>: <a href="#">VueJS</a>, <a href="https://foundation.zurb.com/">Foundation</a></li>
            <li><em>Code Repository</em>: <a href="https://github.com/vandorjw/firefly">Github</a></li>
        </ul>

        <hr />
        <h5> Foot notes</h5>
        <p><sup>1</sup> I used the word 'visible' instead of 'private' because the task data is visible to myself. As the project owner, I have ability to see the data inside Google Firestore. Even if I did not have that ability, I am not sure if the data is encrypted at rest and if Google employees are able to view/extract the data. Data privacy is a hot topic these days so I want to be as open and honest as I can be.</p>

    </div>`
  })