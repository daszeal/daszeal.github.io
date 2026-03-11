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

function makeSnippet(text, metadata){

  const words = Object.keys(metadata);

  if(words.length === 0){
    return text.slice(0,200) + "...";
  }

  const lowerText = text.toLowerCase();

  let firstIndex = -1;
  let matchWord = "";

  words.forEach(word => {

    const index = lowerText.indexOf(word.toLowerCase());

    if(index !== -1 && (firstIndex === -1 || index < firstIndex)){
      firstIndex = index;
      matchWord = word;
    }

  });

  if(firstIndex === -1){
    return text.slice(0,200) + "...";
  }

  const snippetRadius = 120;

  const start = Math.max(0, firstIndex - snippetRadius);
  const end = Math.min(text.length, firstIndex + snippetRadius);

  let snippet = text.slice(start, end);

  words.forEach(word => {

    const regex = new RegExp(`(${word})`, "gi");

    snippet = snippet.replace(regex,
      `<span class="search-highlight no-underline">$1</span>`);

  });

  if(start > 0) snippet = "..." + snippet;
  if(end < text.length) snippet += "...";

  return snippet;
}
