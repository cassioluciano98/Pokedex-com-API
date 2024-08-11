const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Funcao para Buscar Pokemon
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}

// Funcao para Renderizar o Pokemon
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not Found :c";
        pokemonNumber.innerHTML = "";
    } 
}

// Funcao para Envio do Formulario de Busca
form.addEventListener('submit', (event) =>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

// Botao de Voltar 1 Pokemon
buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
})

// Botao de Proximo Pokemon
buttonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

renderPokemon(searchPokemon);