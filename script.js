document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const query = document.getElementById('searchQuery').value;
    const apiKey = 'AIzaSyA-5l7giyir9KpGqM9mClhU8_lD5LxboAY'; // Substitua pela sua chave de API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Limpa resultados anteriores

            if (data.items) {
                data.items.forEach(item => {
                    const book = item.volumeInfo;
                    const bookElement = document.createElement('div');
                    bookElement.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>Autor(es): ${book.authors ? book.authors.join(', ') : 'Desconhecido'}</p>
                        <p>${book.description || 'Sem descrição disponível'}</p>
                    `;
                    resultsContainer.appendChild(bookElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '<p>Ocorreu um erro ao buscar os dados.</p>';
        });
});

// Evento para limpar os resultados
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('searchQuery').value = ''; // Limpa o campo de busca
    document.getElementById('results').innerHTML = ''; // Limpa os resultados
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}
