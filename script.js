const API_KEY = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';
const CHANNEL_ID = 'UCuaCPsg-JwKIMHvPY3LgRKA';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Function to check cache
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

// Function to set cache
function setCachedData(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
}

// Fetch YouTube data with caching
async function fetchYouTubeVideos() {
  const cachedVideos = getCachedData('youtube_videos');
  if (cachedVideos) {
    displayVideos(cachedVideos);
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`);
    const data = await response.json();
    const videos = data.items;
    setCachedData('youtube_videos', videos);
    displayVideos(videos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
}

// Fetch Featured Video
async function fetchFeaturedVideo() {
  const cachedFeatured = getCachedData('featured_video');
  if (cachedFeatured) {
    displayFeaturedVideo(cachedFeatured);
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`);
    const data = await response.json();
    const featuredVideo = data.items[0]; // Get the most recent video
    setCachedData('featured_video', featuredVideo);
    displayFeaturedVideo(featuredVideo);
  } catch (error) {
    console.error('Error fetching featured video:', error);
  }
}

// Display featured video on the page
function displayFeaturedVideo(video) {
  const featuredVideoContainer = document.getElementById('featured-video-container');
  const videoId = video.id.videoId;
  const featuredVideoElement = `
    <div class="featured-video-item">
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  featuredVideoContainer.innerHTML = featuredVideoElement;
}

// Display videos on the page
function displayVideos(videos) {
  const videosContainer = document.getElementById('videos-container');
  videosContainer.innerHTML = '';
  videos.forEach(video => {
    const videoId = video.id.videoId;
    const videoElement = `
      <div class="video-item">
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
    videosContainer.innerHTML += videoElement;
  });
}

// Fetch YouTube Shorts with caching
async function fetchYouTubeShorts() {
  const cachedShorts = getCachedData('youtube_shorts');
  if (cachedShorts) {
    displayShorts(cachedShorts);
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video&videoDuration=short`);
    const data = await response.json();
    const shorts = data.items;
    setCachedData('youtube_shorts', shorts);
    displayShorts(shorts);
  } catch (error) {
    console.error('Error fetching YouTube shorts:', error);
  }
}

// Display shorts on the page
function displayShorts(shorts) {
  const shortsContainer = document.getElementById('shorts-container');
  shortsContainer.innerHTML = '';
  shorts.forEach(short => {
    const videoId = short.id.videoId;
    const shortElement = `
      <div class="short-item">
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
    shortsContainer.innerHTML += shortElement;
  });
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchYouTubeVideos();
  fetchFeaturedVideo();
  fetchYouTubeShorts();

  // Smooth scrolling effect
  const navLinks = document.querySelectorAll('#nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Toggle mobile menu
  const menuIcon = document.getElementById('menu-icon');
  const navLinksContainer = document.getElementById('nav-links');

  menuIcon.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });
});
