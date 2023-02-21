import API from "./APIKey.js";
import adicionarFilme from "./carregarFilme.js"
import limparFilme from "./script.js";

async function buscar(titulo) {
    const conexao = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${titulo}&language=en-US&page=1`);
    const { results } = await conexao.json();

    return results;
}

export default async function buscarFilme() {
    const pesquisarValor = document.getElementById("cabecalho__pesquisa").value;
    limparFilme();
    const busca = await buscar(pesquisarValor);
    busca.forEach(filme => adicionarFilme(filme));

    if (busca.length == 0){
        listaDeFilmes.innerHTML = `<h2 class"mensagem__titulo">Não existem filmes com esse termo</h2>`
    }
}
