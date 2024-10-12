// script.js testing

const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';  // Replace with your YouTube API Key
const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA'; // My Getaway Stories Channel ID
const maxResults = 10;  // Maximum number of videos to fetch

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;

async function fetchVideos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const videosContainer = document.getElementById('videos-container');
    const shortsContainer = document.getElementById('shorts-container');
    const featuredVideoContainer = document.getElementById('featured-video-container');

    // Clear existing content
    videosContainer.innerHTML = '';
    shortsContainer.innerHTML = '';
    featuredVideoContainer.innerHTML = '';

    // Process the API response and render videos
    data.items.forEach((item, index) => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.high.url;
      const isShort = title.toLowerCase().includes('short');

      const videoElement = `
        <div class="video">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
          </a>
          <h3>${title}</h3>
        </div>
      `;

      // Display the first video as the featured video
      if (index === 0) {
        featuredVideoContainer.innerHTML = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
      }

      // Display shorts separately
      if (isShort) {
        shortsContainer.innerHTML += videoElement;
      } else {
        videosContainer.innerHTML += videoElement;
      }
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);  // Log errors in the console
  }
}

// Fetch YouTube videos when the page loads
fetchVideos();
