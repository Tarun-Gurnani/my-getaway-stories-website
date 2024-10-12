// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube API Key
const channelId = 'UCDsZzLTZudMCMnUpYqBzxHA'; // Channel ID for My Getaway Stories
const maxResults = 10; // Number of videos to fetch

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

async function fetchVideos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const videosContainer = document.getElementById('videos-container');
    const shortsContainer = document.getElementById('shorts-container');
    const featuredVideoContainer = document.getElementById('featured-video-container');

    data.items.forEach((item, index) => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.high.url;
      const isShort = item.snippet.description.includes('#shorts');

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
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" allowfullscreen></iframe>
        `;
      }

      // Populate videos and shorts separately
      if (isShort) {
        shortsContainer.innerHTML += videoElement;
      } else {
        videosContainer.innerHTML += videoElement;
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

// Fetch videos when the page loads
fetchVideos();
