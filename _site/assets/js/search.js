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
        <a href="${post.url}" class="no-animation">
          <h4>${post.title}</h4>
          <p>${snippet}</p>
        </a>
      </div>
    `;

  });

}

function makeSnippet(text, metadata) {

  const words = Object.keys(metadata);

  if (words.length === 0) {
    return text.slice(0, 200) + "...";
  }

  const paragraphs = text.split(/\n+/);

  let selectedParagraph = "";

  for (let p of paragraphs) {

    const lower = p.toLowerCase();

    for (let word of words) {
      if (lower.includes(word.toLowerCase())) {
        selectedParagraph = p;
        break;
      }
    }

    if (selectedParagraph) break;

  }

  if (!selectedParagraph) {
    selectedParagraph = paragraphs[0];
  }

  let snippet = selectedParagraph.trim();

  // Trim overly long paragraphs
  const maxLength = 260;

  if (snippet.length > maxLength) {

    let firstIndex = -1;

    for (let word of words) {

      const index = snippet.toLowerCase().indexOf(word.toLowerCase());

      if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
        firstIndex = index;
      }

    }

    if (firstIndex !== -1) {

      const radius = 120;

      const start = Math.max(0, firstIndex - radius);
      const end = Math.min(snippet.length, firstIndex + radius);

      snippet = snippet.slice(start, end);

      if (start > 0) snippet = "..." + snippet;
      if (end < selectedParagraph.length) snippet += "...";

    } else {

      snippet = snippet.slice(0, maxLength) + "...";

    }

  }

  // Highlight matched words
  words.forEach(word => {

    const regex = new RegExp(`\\b(${word})\\b`, "gi");

    snippet = snippet.replace(regex,
      `<span class="search-highlight">$1</span>`);

  });

  return snippet;

}
