import adicionarFilme from "./carregarFilme.js";
import API from "./APIKey.js";
import buscarFilme from "./buscarFilme.js";

/* -------------------------------------- Inserir filmes populares ------------------------------------------- */

async function colocarCatalogoDeFilmes() {
    const catalogo = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=1`);
    const { results } = await catalogo.json();
    
    return results;
}

async function colocarTodosOsFilmes() {
  const filmes = await colocarCatalogoDeFilmes();
  filmes.forEach(filme => adicionarFilme(filme));
}

window.onload = async function() {
    colocarTodosOsFilmes();
}

/*------------------------------------------- Buscar filme ----------------------------------------------------*/ 

const botaoDePesquisa = document.getElementById("botao-pesquisa");
botaoDePesquisa.addEventListener("click", buscarFilme);

const pesquisar = document.getElementById("cabecalho__pesquisa");
pesquisar.addEventListener("keyup", evento => {
    if (evento.code == "Enter") {
      buscarFilme();
      return;
    }
})

/*-------------------------------------------- Limpar ---------------------------------------------------------*/

export default function limparFilme (){
  const listaDeFilmes = document.querySelector(".filmes");

  while (listaDeFilmes.firstChild) {
    listaDeFilmes.removeChild(listaDeFilmes.firstChild);
  }
}

/*----------------------------------------- Checkbox de Favoritos --------------------------------------------*/

const checkFavoritos = document.querySelector("#cabecalho__favoritos");
checkFavoritos.addEventListener("change", filmesCheck => {
  const check = checkFavoritos.checked;
  if (check) {
    limparFilme();
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    favoritos.forEach(filme => adicionarFilme(filme));
  } else {
    limparFilme();
    colocarTodosOsFilmes();
  }
});







  