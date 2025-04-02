document.getElementById('suggestion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const suggestion = document.getElementById('suggestion').value;

    const comment = {
        name: name,
        category: category,
        suggestion: suggestion
    };

    // Envoyer la suggestion au backend
    fetch('http://localhost:3000/api/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('suggestion-form').reset();
    })
    .catch(error => console.error('Error:', error));
});
