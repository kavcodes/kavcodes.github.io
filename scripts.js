let stories = JSON.parse(localStorage.getItem('stories')) || [
      { text: "This is an example story to get started, each story has exactly five sentences. Upvote stories you like to rank them higher! Try upvoting one of the stories below this to see what happens! Make sure to submit your own five-sentence story. Use the form below to get started!", upvotes: 0 },
    { text: "Every morning, Daniel waved to the elderly woman sitting by her window across the street. She never waved back, but her soft smile told him she appreciated it. One day, her window remained empty, and Daniel felt an inexplicable sadness wash over him. A week later, a letter appeared on his doorstep, thanking him for being the only light in her final days. The smile stayed with him forever.", upvotes: 0 },
    { text: "Jake was feeling fancy, so he tried to cook a gourmet meal using a recipe he found online. Halfway through, the kitchen looked like a disaster zone, and the smoke alarm went off. His dog sat by the stove, staring in what Jake could only interpret as judgment. When he finally took a bite, he muttered, 'Well, at least it’s edible'. His dog just sighed and walked away, clearly not impressed.", upvotes: 0 },
    { text: "In the dead of night, Emily heard the soft whisper of her name from the corner of her darkened bedroom. She turned on the light, but there was no one there—only the shadow of her closet door slightly ajar. Trembling, she approached, heart pounding, and pulled the door open. Inside hung her clothes, undisturbed, but a pair of gleaming eyes stared back from the darkness beyond. The whisper came again, closer this time, 'I'm not in the closet anymore.'", upvotes: 0 },
    { text: "A man spent his life searching for the meaning of existence, traveling far and wide, questioning sages and scholars. One night, in the silence of a remote cave, he finally heard the universe answer him in a voice as ancient as time itself. 'You are the meaning,' it whispered, 'but you spend your days searching for what you already are.' The realization struck him with a profound emptiness, for he had wasted his life seeking what had always been within him. As the truth settled in, he wept, understanding that in his endless search, he had missed truly living", upvotes: 0 },
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
