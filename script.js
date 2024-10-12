// script.js

const API_KEY = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0'; // Your YouTube API Key
const CHANNEL_ID = 'UCuaCPsg-JwKIMHvPY3LgRKA'; // Your YouTube Channel ID

// Function to fetch YouTube videos
async function fetchVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`);
  const data = await response.json();
  return data.items;
}

// Function to display the featured video
async function displayFeaturedVideo() {
  const videos = await fetchVideos();
  const featuredVideo = videos[0]; // Get the first video as featured
  const featuredVideoContainer = document.getElementById('featured-video-container');
  featuredVideoContainer.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${featuredVideo.id.videoId}" frameborder="0" allowfullscreen></iframe>
  `;
}

// Function to display recent videos
async function displayRecentVideos() {
  const videos = await fetchVideos();
  const videosContainer = document.getElementById('videos-container');

  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = `
      <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
      <h3>${video.snippet.title}</h3>
      <p>${video.snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="btn">Watch Video</a>
    `;
    videosContainer.appendChild(videoElement);
  });
}

// Function to display latest shorts
async function displayShorts() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`);
  const data = await response.json();
  const shortsContainer = document.getElementById('shorts-container');

  data.items.forEach(short => {
    const shortElement = document.createElement('div');
    shortElement.classList.add('video');
    shortElement.innerHTML = `
      <img src="${short.snippet.thumbnails.high.url}" alt="${short.snippet.title}">
      <h3>${short.snippet.title}</h3>
      <a href="https://www.youtube.com/watch?v=${short.id.videoId}" target="_blank" class="btn">Watch Short</a>
    `;
    shortsContainer.appendChild(shortElement);
  });
}

// Call the display functions
displayFeaturedVideo();
displayRecentVideos();
displayShorts();
