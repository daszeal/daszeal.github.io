let index;
let posts = [];

fetch("/search.json")
  .then(res => res.json())
  .then(data => {

    posts = data;

    index = lunr(function () {

      this.ref("url");

      this.field("title", { boost: 10 });
      this.field("content");
      this.field("excerpt");

      data.forEach(doc => this.add(doc));

    });

  });

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {

  const query = this.value.trim();

  if (!query) {
    document.getElementById("search-results").innerHTML = "";
    return;
  }

  const results = index.search(query);

  displayResults(results);

});

function displayResults(results) {

  const container = document.getElementById("search-results");

  container.innerHTML = "";

  results.slice(0,5).forEach(result => {

    const post = posts.find(p => p.url === result.ref);

    const snippet = makeSnippet(post.content, result.matchData.metadata);

    container.innerHTML += `
      <div class="search-result">
        <a href="${post.url}" class="no-underline">
          <h4>${post.title}</h4>
          <p>${snippet}</p>
        </a>
      </div>
    `;

  });

}

function makeSnippet(text, metadata) {

  let snippet = text.slice(0,200);

  Object.keys(metadata).forEach(word => {

    const regex = new RegExp(word, "gi");

    snippet = snippet.replace(regex,
      `<span class="search-highlight">${word}</span>`);

  });

  return snippet + "...";

}
