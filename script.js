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
        displayComment(data);
        document.getElementById('suggestion-form').reset();
    })
    .catch(error => console.error('Error:', error));
});

function displayComment(comment) {
    const commentsContainer = document.getElementById('comments-container');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <strong>${comment.name}</strong> (${new Date(comment.date).toLocaleString()})<br>
        <em>${comment.category}</em><br>
        <p>${comment.suggestion}</p>
        <button onclick="deleteComment('${comment._id}')">Supprimer</button>
        <hr>
    `;
    commentsContainer.appendChild(commentElement);
}

function deleteComment(id) {
    fetch(`http://localhost:3000/api/suggestions/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        // Supprimer le commentaire du DOM
        const commentElement = document.querySelector(`[data-id="${id}"]`);
        if (commentElement) {
            commentElement.remove();
        }
    })
    .catch(error => console.error('Error:', error));
}

// Charger les commentaires existants depuis le backend
fetch('http://localhost:3000/api/suggestions')
    .then(response => response.json())
    .then(data => {
        data.forEach(comment => displayComment(comment));
    })
    .catch(error => console.error('Error:', error));
