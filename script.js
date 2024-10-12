// script.js

// Function to fetch and display featured video
async function fetchFeaturedVideo() {
    const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';
    const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA';
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet,id&maxResults=1`);
    const data = await response.json();
    
    const videoId = data.items[0].id.videoId;
    const featuredVideoContainer = document.getElementById('featured-video-container');
    featuredVideoContainer.innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

// Function to fetch and display recent videos
async function fetchRecentVideos() {
    const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';
    const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA';
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet,id&maxResults=6`);
    const data = await response.json();
    
    const videosContainer = document.getElementById('videos-container');
    data.items.forEach(item => {
        const videoId = item.id.videoId;
        videosContainer.innerHTML += `
            <div class="video-item">
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${item.snippet.title}</p>
            </div>
        `;
    });
}

// Function to fetch and display shorts
async function fetchShorts() {
    const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';
    const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA';
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet,id&maxResults=6`);
    const data = await response.json();
    
    const shortsContainer = document.getElementById('shorts-container');
    data.items.forEach(item => {
        const videoId = item.id.videoId;
        shortsContainer.innerHTML += `
            <div class="short-item">
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${item.snippet.title}</p>
            </div>
        `;
    });
}

// Function to fetch and display thumbnails for About Us section
async function fetchThumbnails() {
    const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0';
    const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA';
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet,id&maxResults=6`);
    const data = await response.json();
    
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    data.items.forEach(item => {
        const thumbnailUrl = item.snippet.thumbnails.default.url;
        thumbnailGrid.innerHTML += `<img src="${thumbnailUrl}" alt="${item.snippet.title} Thumbnail" class="thumbnail">`;
    });
}

// Add event listener for menu icon click
document.getElementById('menu-icon').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('expanded');
});

// Initialize the page
fetchFeaturedVideo();
fetchRecentVideos();
fetchShorts();
fetchThumbnails();
