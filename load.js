window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loaning-screen');
    const loadingProgress = document.getElementById('loading-progress');

    // Simulate loading progress for demonstration
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5; // Increase progress by 5% at a time
        loadingProgress.value = progress;

        if (progress >= 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = '0'; // Begin fade-out
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Fully hide after fade-out
            }, 1000); // Match duration of transition (1s)
        }
    }, 100); // Update every 100ms
});
