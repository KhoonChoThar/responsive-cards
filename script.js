// Read the first JSON file
fetch('https://gist.githubusercontent.com/knot-freshket/142c21c3e8e54ef36e33f5dc6cf54077/raw/94ebab16839484f06d42eb799e30d0a945ff1a1b/freshket-places.json')
    .then(response => response.json())
    .then(data1 => {
        // Read the second JSON file
        fetch('https://gist.githubusercontent.com/knot-freshket/fa49e0a5c6100d50db781f28486324d2/raw/55bc966f54423dc73384b860a305e1b67e0bfd7d/freshket-tags.json')
            .then(response => response.json())
            .then(data2 => {
                // Map tags to items
                const mappedData = data1.map(item1 => {
                    const tags = data2.filter(item2 => item1.tags.includes(item2.id)).map(item => item.name);
                    return {
                        ...item1,
                        tags: tags
                    };
                });
                // Display cards
                displayCards(mappedData);
            })
            .catch(error => console.error('Failed to read data:', error));
    })
    .catch(error => console.error('Failed to read data:', error));

// Display cards
function displayCards(data) {
    const cardsContainer = document.getElementById('cards-container');
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img_url}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.body}</p>
            <div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        `;
        cardsContainer.appendChild(card);
    });
}
