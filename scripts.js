let stories = JSON.parse(localStorage.getItem('stories')) || [
      { text: "Each story has exactly five sentences. Upvote stories you like to rank them higher! Try upvoting one of the stories below this to see what happens! Make sure to submit your own five-sentence story. Use the form below to get started!", upvotes: 0 },
    { text: "Every morning, Daniel waved to the elderly woman sitting by her window across the street. She never waved back, but her soft smile told him she appreciated it. One day, her window remained empty, and Daniel felt an inexplicable sadness wash over him. A week later, a letter appeared on his doorstep, thanking him for being the only light in her final days. The smile stayed with him forever.", upvotes: 0 },
    { text: "Jake was feeling fancy, so he tried to cook a gourmet meal using a recipe he found online. Halfway through, the kitchen looked like a disaster zone, and the smoke alarm went off. His dog sat by the stove, staring in what Jake could only interpret as judgment. When he finally took a bite, he muttered, 'Well, at least it’s edible'. His dog just sighed and walked away, clearly not impressed.", upvotes: 0 },
    { text: "I forced myself to take shallow breaths, staying as still as I could under the bed. There were creatures in the bedroom, stalking around, checking in the cupboard, making low growls and high screeches and gutteral noises. As the feet approached the bed and one of the creatures climbed onto it, the pounding of my heart and the rumbling of my stomach seemed so loud that I feared they might give me away. Finally, after an agonisingly long time, I heard steps leaving the room, the lights being switched off, the door closing, and silence... I emerged from beneath the bed, hungry for my meal laying upon it.", upvotes: 0 },
    { text: "My disbelief was only overcome by my utter terror. What had I done wrong to deserve this? Surely no human sets out to treat another this way. 'These are regular fries' I said. 'But I ordered curly.'", upvotes: 0 },
];

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
            <button class="upvote-btn" data-index="${index}"><img src="up-arrow.png" class="upvote-icon" /> ${story.upvotes}</button>
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
            upvotes: 0
        };
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories();
        document.getElementById('story-text').value = ''; // Clear the text area
    } else {
        alert('Your story must be at least 5 sentences long!');
    }
});

// Handle upvotes
document.addEventListener('click', (e) => {
    if (e.target.closest('.upvote-btn')) {
        const index = e.target.closest('.upvote-btn').getAttribute('data-index');
        stories[index].upvotes++;
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories(); // Re-render stories after upvote
    }
});

// Initial render on page load
renderStories();
