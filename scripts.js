let stories = JSON.parse(localStorage.getItem('stories')) || [];

// Function to render the stories sorted by upvotes
function renderStories() {
    stories.sort((a, b) => b.upvotes - a.upvotes);  // Sort by upvotes (highest first)
    const storiesContainer = document.getElementById('stories');
    storiesContainer.innerHTML = ''; // Clear previous stories

    stories.forEach((story, index) => {
        const storyElement = document.createElement('div');
        storyElement.className = 'story';

        storyElement.innerHTML = `
            <p>${story.text}</p>
            <button class="upvote-btn" data-index="${index}">Upvote (${story.upvotes})</button>
            <button class="downvote-btn" data-index="${index}">Downvote (${story.downvotes})</button>
        `;
        storiesContainer.appendChild(storyElement);
    });
}

// Handle story submission
document.getElementById('submit-btn').addEventListener('click', () => {
    const storyText = document.getElementById('story-text').value;
    if (storyText.trim().split(' ').length >= 5) {
        const newStory = {
            text: storyText.trim(),
            upvotes: 0,
            downvotes: 0,
        };
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories();
        document.getElementById('story-text').value = ''; // Clear the text area
    } else {
        alert('Your story must be at least 5 sentences long!');
    }
});

// Handle upvotes and downvotes
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('upvote-btn')) {
        const index = e.target.getAttribute('data-index');
        stories[index].upvotes++;
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories(); // Re-render stories after upvote
    } else if (e.target.classList.contains('downvote-btn')) {
        const index = e.target.getAttribute('data-index');
        stories[index].downvotes++;
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories(); // Re-render stories after downvote
    }
});

// Initial render on page load
renderStories();
