// Replace with your actual YouTube API key and channel ID
const API_KEY = 'AIzaSyBMCVvRn7swTSxbRzCbffbe45SCFE605f0'; // Your YouTube API key
const CHANNEL_ID = 'UCuaCPsg-JwKIMHvPY3LgRKA'; // Your channel ID (replace with your channel ID)

// Function to fetch videos from the YouTube API
async function fetchVideos() {
    try {
        // Fetch recent videos
        const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`);
        const videoData = await videoResponse.json();
        
        // Fetch shorts (You can modify the search query to filter for shorts if needed)
        const shortsResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`);
        const shortsData = await shortsResponse.json();

        // Populate recent videos section
        const videosContainer = document.getElementById('videos-container');
        videoData.items.forEach(item => {
            if (item.id.kind === "youtube#video") {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                        <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
                        <h3>${item.snippet.title}</h3>
                    </a>
                `;
                videosContainer.appendChild(videoElement);
            }
        });

        // Populate shorts section
        const shortsContainer = document.getElementById('shorts-container');
        shortsData.items.forEach(item => {
            if (item.id.kind === "youtube#video") {
                const shortElement = document.createElement('div');
                shortElement.classList.add('video');
                shortElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                        <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
                        <h3>${item.snippet.title}</h3>
                    </a>
                `;
                shortsContainer.appendChild(shortElement);
            }
        });

        // Fetch and display the featured video (latest video)
        if (videoData.items.length > 0) {
            const featuredVideo = videoData.items[0];
            const featuredVideoContainer = document.getElementById('featured-video-container');
            featuredVideoContainer.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${featuredVideo.id.videoId}">
                    <img src="${featuredVideo.snippet.thumbnails.high.url}" alt="${featuredVideo.snippet.title}">
                    <h3>${featuredVideo.snippet.title}</h3>
                </a>
            `;
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

// Call the function to fetch and display videos
fetchVideos();
