const apiKey = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0'; // Your API key
const channelId = 'UCuaCPsg-JwKIMHvPY3LgRKA'; // Your channel ID
const maxResults = 6; // Number of videos to display

async function fetchVideos() {
    const videoUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    const response = await fetch(videoUrl);
    const data = await response.json();
    return data.items;
}

async function fetchThumbnails() {
    const videoUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    const response = await fetch(videoUrl);
    const data = await response.json();
    return data.items;
}

async function displayVideos() {
    const videos = await fetchVideos();
    const videosContainer = document.getElementById('videos-container');
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url; // Get the high-quality thumbnail
        videosContainer.innerHTML += `
            <div class="video">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                </a>
            </div>
        `;
    });
}

async function displayShorts() {
    const videos = await fetchThumbnails(); // Reuse the same fetch function for shorts
    const shortsContainer = document.getElementById('shorts-container');
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url; // Get the high-quality thumbnail
        shortsContainer.innerHTML += `
            <div class="video">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                </a>
            </div>
        `;
    });
}

async function displayThumbnails() {
    const thumbnails = await fetchThumbnails();
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    thumbnails.forEach(thumbnail => {
        const videoId = thumbnail.id.videoId;
        const imgSrc = thumbnail.snippet.thumbnails.high.url; // Get the high-quality thumbnail
        thumbnailGrid.innerHTML += `
            <div class="thumbnail">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${imgSrc}" alt="${thumbnail.snippet.title}">
                </a>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await displayVideos();
    await displayShorts();
    await displayThumbnails();
});
