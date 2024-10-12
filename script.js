// script.js

const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';  // Replace with your YouTube API Key
const channelId = 'UCDsZzLTZudMCMnUpYqBzxHA'; // My Getaway Stories Channel ID
const maxResults = 10;

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;

async function fetchVideos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const videosContainer = document.getElementById('videos-container');
    const shortsContainer = document.getElementById('shorts-container');
    const featuredVideoContainer = document.getElementById('featured-video-container');

    // Clear existing content
    videosContainer.innerHTML = '';
    shortsContainer.innerHTML = '';
    featuredVideoContainer.innerHTML = '';

    data.items.forEach((item, index) => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.high.url;
      const isShort = item.snippet.title.toLowerCase().includes('shorts');

      const videoElement = `
        <div class="video">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
          </a>
          <h3>${title}</h3>
        </div>
      `;

      if (index === 0) {
        // Display first video as featured
        featuredVideoContainer.innerHTML = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
      }

      if (isShort) {
        shortsContainer.innerHTML += videoElement;
      } else {
        videosContainer.innerHTML += videoElement;
      }
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
}

// Fetch YouTube videos when the page loads
fetchVideos();
