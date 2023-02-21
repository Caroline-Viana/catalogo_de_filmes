const filmesPopulares = document.querySelector(".filmes");

export default function adicionarFilme (filme) {
    const { id, title, poster_path, vote_average, release_date, overview } = filme

    const card = document.createElement('section');
    const imagemFilme = document.createElement('img');
    const filmeInformacao = document.createElement('div');
    const cardItem = document.createElement('div');
    const filmeTexto = document.createElement('p');
    const filmeTitulo = document.createElement('h2');
    const interacao = document.createElement('div');
    const avaliacao = document.createElement('p');
    const estrela = document.createElement('i');
    const favorito = document.createElement('p');
    const coracao = document.createElement('i');
    const coracaoFavoritado = document.createElement('i');
    const year = new Date(release_date).getFullYear();
    const imagem = `https://image.tmdb.org/t/p/w500${poster_path}`;

    card.classList.add('card');
    filmesPopulares.appendChild(card);
    
    imagemFilme.classList.add('card__imagem');
    imagemFilme.src = imagem ;
    imagemFilme.alt = `${title} Poster`
    card.appendChild(imagemFilme);
    
    filmeInformacao.classList.add('card__informacao');
    card.appendChild(filmeInformacao);

    cardItem.classList.add('card__item');
    filmeInformacao.appendChild(cardItem);

    filmeTitulo.classList.add('card__nome');
    filmeTitulo.textContent = `${title} (${year})`;
    cardItem.appendChild(filmeTitulo);

    interacao.classList.add('card__interacao');
    cardItem.appendChild(interacao);

    estrela.classList.add('fa-solid', 'fa-star');
    interacao.appendChild(estrela);

    avaliacao.classList.add('card__icones');
    avaliacao.textContent = vote_average;
    interacao.appendChild(avaliacao);

    coracao.classList.add('fa-regular', 'fa-heart');
    coracao.addEventListener('click', () => {
        coracao.style.display = "none";
        coracaoFavoritado.style.display = "block";
        salvarNoLocalStorage(filme);
    })
    interacao.appendChild(coracao);

    coracaoFavoritado.classList.add('fa-solid', 'fa-heart', 'fa-heart--favorito');
    coracaoFavoritado.addEventListener('click', () => {
        coracaoFavoritado.style.display = "none";
        coracao.style.display = "block";
        removerDoLocalStorage(id);
      })
    interacao.appendChild(coracaoFavoritado);

    favorito.classList.add('card__icones');
    favorito.textContent = "Favoritar";
    interacao.appendChild(favorito);

    filmeTexto.classList.add('card__texto');
    filmeTexto.textContent = overview;
    filmeInformacao.appendChild(filmeTexto);
}

/*-------------------------------- Local Storage ---------------------------------------*/

function filmesFavoritos(){
    return JSON.parse(localStorage.getItem('filmesFavoritos'));
  }
   
function salvarNoLocalStorage(filme) {
    const filmes = filmesFavoritos() || [];
    filmes.push(filme);
    const filmesJSON = JSON.stringify(filmes);
    localStorage.setItem('filmesFavoritos', filmesJSON);
}

function removerDoLocalStorage(id) {
    const filmes = filmesFavoritos() || [];
    const encontrarFilme = filmes.find(filme => filme.id == id);
    const novoFilme = filmes.filter(filme => filme.id != encontrarFilme.id);
    localStorage.setItem('filmesFavoritos', JSON.stringify(novoFilme));
}
