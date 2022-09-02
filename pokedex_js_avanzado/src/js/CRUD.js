const setFavorite = () =>{
    var elemento = document.getElementById("favorite");
    id = elemento.getAttribute("data-pokeID");
    pokeName =  elemento.getAttribute("data-pokeName");
    htmlPoke = document.getElementById("pokeList"+id).innerHTML;
    // arrayStorage = localStorage;
    // console.log(localStorage.getItem(pokeName));
    if(localStorage.getItem(pokeName)){
        localStorage.removeItem(pokeName)
        document.getElementById("star-favorite-status").classList.remove("star-favorite-on");
    }else{
        if(id != ""){
            localStorage.setItem(pokeName,htmlPoke)
            document.getElementById("star-favorite-status").classList.add("star-favorite-on");
        }
    }
    // elemento.setAttribute("data-pokeID",123);
    // console.log(elemento.getAttribute("data-pokeID"));
}

const showFavorites = () =>{
    var elements = [];
    for(var x = 0; x < localStorage.length; x++) {
        elements.push(localStorage.getItem(localStorage.key(x)));
    }
    document.getElementById("favorite-pokemon-list").innerHTML = elements.map(pokemon => innerFavList(pokemon)).join("");
    buttonDownload = document.getElementById("download-button");
    if(localStorage.length > 0){
        document.getElementById("text-empty").innerHTML = "";
        buttonDownload.disabled = false
    }else{
        document.getElementById("text-empty").innerHTML = "Add your favorites pokemons to show in this list";
        buttonDownload.disabled = true
    }
    // return elements
}
const innerFavList = (pokemon) =>{
    return(
        '<div class="col pokemon" data-bs-dismiss="modal">'+
        pokemon+
        '</div>'
    );
}
const downloadJSON = () =>{
    var storageObj = localStorage;
    var fileName = 'favorites.json'
    // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
    var fileToSave = new Blob([JSON.stringify(storageObj)], {
    // var fileToSave = new Blob([storageObj], {   
        type: 'application/json'
    });
    saveAs(fileToSave,fileName);
}


var file;
document.getElementById('inputFile').addEventListener('change', function() {
    file = new FileReader();
    file.onload = () => {
        document.getElementById('output').textContent = "If you want save this data, press upload to continue";
    }
    file.readAsText(this.files[0]);
});

const loadFavorites = () =>{
    arrayFavorites = JSON.parse(file.result);
    console.log(arrayFavorites);
    tamFav = Object.keys(arrayFavorites);
    tamFav.forEach(element =>{
        console.log(arrayFavorites[element]);
        localStorage.setItem(element,arrayFavorites[element]);
    })
}

const eraseFavorites = ()=>{
    document.getElementById("star-favorite-status").classList.remove("star-favorite-on");
    localStorage.clear();
    showFavorites();
}