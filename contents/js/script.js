document.addEventListener("DOMContentLoaded", function () {
    const articleContent = document.querySelector('.content');
    const regex = /(https?:\/\/[^\s]+)/g;

    // Find URLs in the article content
    let match;
    const urls = [];
    while ((match = regex.exec(articleContent.innerHTML)) !== null) {
        urls.push(match[0]);
    }

    // Fetch and display URL previews
    urls.forEach(async (url) => {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const title = doc.querySelector('head title').innerText;
            const description = doc.querySelector('meta[name="description"]').getAttribute('content').substring(0, 150);
            const image = doc.querySelector('meta[property="og:image"]').getAttribute('content');

            const previewHTML = `
        <div class="url-preview">
          <img class="url-preview-img" src="${image}" alt="${title}" />
              <div class="url-preview-details">
              <div class="url-preview-title">${title}</div>
              <div class="url-preview-description">${description}</div>
          </div>
        </div>
      `;

            // Insert the preview HTML next to the URL
            articleContent.innerHTML = articleContent.innerHTML.replace(url, `${url} ${previewHTML}`);
        } catch (error) {
            console.error('Failed to fetch preview', error);
        }
    });
});
