const calculateAbout = (data) =>{
    if(data == 1){
        result = parseInt(pokemon.weight)/10;
        return(
        '<div class="poke-type '+ pokemon.types[0] +' row">'+
            '<h4 class="poke-type-text"><i class="fa fa-weight-hanging"></i> '+ result +' KG</h4>'+
            '<p class="col content-center poke-type-text">Weight</p>'+
        '</div>'
        );
        
    }
    if(data == 2){
        result = parseInt(pokemon.height)/10;
        return(
        '<div class="poke-type '+ pokemon.types[0] +' row">'+
            '<h4 class="poke-type-text"><i class="fa fa-ruler"></i> '+ result +' M</h4>'+
            '<p class="col content-center poke-type-text">Height</p>'+
        '</div>'
        );
    }
}

const getPokeAbilities = (data) =>{
    var pokeAbilities = [];
    for(let i = 0; i < data.abilities.length; i++) {
        pokeAbilities.push(data.abilities[i].ability.name);
    }
    return pokeAbilities;
};
const generatePokeAbilities = () =>{
    var pokeAbilities = '';
    pokemon.abilities.forEach(abilities => pokeAbilities = pokeAbilities +
        '<div class="col  content-center">'+
            '<div class="poke-type '+ pokemon.types[0] +' row abilities-name">'+                         
                '<p class="col content-center poke-type-text">'+ abilities +'</p>'+
            '</div>'+
        '</div>'
    );
    return pokeAbilities;
}

const generatePokeCharts = () =>{
    var pokeCharts = '';
    for (let i = 0; i < pokemon.stats.length; i++) {
        pokeCharts = pokeCharts +
        '<li class="row content-center"><span class="col number-stat '+ pokemon.types[0] +'">'+ pokemon.stats[i] +'</span><div class="base-bar col '+ pokemon.types[0] +'"><span class="progress-bar '+ pokemon.types[0] +'" style="width: '+ calcStatChart(pokemon.stats[i]) +'%;"></span></div></li>'
    }
    
    return pokeCharts;
}

const calcStatChart = (number) =>{
    result = (100/300)*number;
    if(result>100){
        return 100
    }else{
        return result;
    }
}

const ocultElement = () =>{
    document.getElementById("pokeDataCardInitial").classList.remove("invisible-card");
    document.getElementById("pokeDataCard").classList.add("invisible-card");
    document.getElementById("scape").classList.add("invisible-card");
    document.getElementById("favorite").classList.add("invisible-card");
    document.getElementById("right-division").classList.add("card-data-pokemon");
    document.getElementById("left-division").classList.remove("card-data-pokemon");
}

functionPokeList();