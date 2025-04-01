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
    commentElement.setAttribute('data-id', comment._id); // Ajouter l'attribut data-id pour la suppression
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
    const username = 'putain'; // Remplacez par votre nom d'utilisateur
    const password = 'lecon'; // Remplacez par votre mot de passe

    fetch(`http://localhost:3000/api/suggestions/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
    })
    .then(response => {
        if (response.ok) {
            // Supprimer le commentaire du DOM
            const commentElement = document.querySelector(`[data-id="${id}"]`);
            if (commentElement) {
                commentElement.remove();
            }
        } else {
            console.error('Failed to delete comment:', response.statusText);
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
