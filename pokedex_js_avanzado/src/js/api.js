let pokemonListContent ;
let pokemonListFinal;
document.addEventListener("keyup", e=>{
    if(e.target.matches("#search-pokemon")){
        searchPokeResults = pokemonListFinal.filter(pokemon => pokemon.name.includes(e.target.value.toLowerCase()));
        document.getElementById("pokemon-list").innerHTML = searchPokeResults.map(pokemon => innerPoke(pokemon)).join("");
    }
});

class Pokemon {
    constructor(image,name,types,weight,height,abilities,stats){
        this.image = image;
        this.name = name;
        this.types = types;
        this.weight = weight;
        this.height = height;
        this.abilities = abilities;
        this.stats = stats;
    }
}

const functionPokeList = () =>{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1154')
    .then(data => data.json())
    .then(response => savePokeList(response));

}
const innerPoke = (pokemon) =>{
    
    const { id, name, image } = pokemon;
    return(
        '<div class="col pokemon" id="pokeList'+ id +'">'+
            '<div class="content-center card text-white space-card-top poke-card-list bg-card "onclick="dataPoke('+ id +')">'+
                '<img class="" src="'+ image +'" alt="qwe" style="width: 75px;">'+
                '<p>'+ name +'</p>'+
            '</div>'+
        '</div>'
    );
}
const savePokeList = (data) =>{
    // console.log(data.results);
    pokemonListFinal = data.results.map((pokemon) => {
        return {
            id: pokemon.url.split('/')[6],
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.url.split('/')[6]}.png`,
        }
    });

    document.getElementById("pokemon-list").innerHTML = pokemonListFinal.map(pokemon => innerPoke(pokemon)).join("");
    // console.log(data.results);

    pokemonListContent = document.getElementById("pokemon-list")
    return pokemonListFinal;
}

const dataPoke = (id) =>{
    fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    .then(data => data.json())
    .then(response => savedataPoke(response,id));
    // console.log(pokemon.types[0])
    
}


const savedataPoke = (data,id) =>{
    pokemon = new Pokemon(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'+id+'.png',
        data.forms[0].name,
        getPokeTypes(data),
        data.weight,
        data.height,
        getPokeAbilities(data),
        [data.stats[0].base_stat,data.stats[1].base_stat,data.stats[2].base_stat,data.stats[3].base_stat,data.stats[4].base_stat,data.stats[5].base_stat]
    );
    // console.log(pokemon);
    // console.log(data);
    let elemento = document.getElementById("favorite");
    elemento.setAttribute("data-pokeID",id);
    elemento.setAttribute("data-pokeName",pokemon.name);
    if(localStorage.getItem(pokemon.name)==null){
        document.getElementById("star-favorite-status").classList.remove("star-favorite-on");
    }else{
        document.getElementById("star-favorite-status").classList.add("star-favorite-on");
    }
    document.getElementById("poke-image-card").src = pokemon.image;
    document.getElementById("poke-name-card").innerHTML = pokemon.name;
    document.getElementById("poke-type-card").innerHTML = generatePokeTypes();
    document.getElementById("poke-weight-card").innerHTML = calculateAbout(1);
    document.getElementById("poke-height-card").innerHTML = calculateAbout(2);
    document.getElementById("poke-abilities-card").innerHTML = generatePokeAbilities();
    document.getElementById("poke-stats-card").innerHTML = generatePokeCharts();
    document.body.className = pokemon.types[0];
    // document.getElementById("left-division").className = "invisible";
    document.getElementById("pokeDataCardInitial").classList.add("invisible-card");
    document.getElementById("pokeDataCard").classList.remove("invisible-card");
    document.getElementById("scape").classList.remove("invisible-card");
    document.getElementById("favorite").classList.remove("invisible-card");
    document.getElementById("right-division").classList.remove("card-data-pokemon");
    document.getElementById("left-division").classList.add("card-data-pokemon");
}

const getPokeTypes = (data) =>{
    pokeType = [];
    // console.log(data.types[1].type.name);
    for(let i = 0; i < data.types.length; i++) {
        pokeType.push(data.types[i].type.name);
    }
    return pokeType;
};

const generatePokeTypes = () =>{
    let pokeTypeCard = '';
    pokemon.types.forEach(types => pokeTypeCard = pokeTypeCard + 
    '<div class="col ">'+
        '<div class="poke-type '+ types +' row ">'+
            '<img class=" poke-type-icon" src="./img/types/Icon_'+ types +'.webp" alt="">'+
            '<p class="col content-center poke-type-text">'+ types +'</p>'+
        '</div>'+
    '</div>');
    return pokeTypeCard;
}