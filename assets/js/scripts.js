const search = document.getElementById("find");
search.addEventListener("click", ()=>{
    clearTypeDiv();
    fetchPokemon(); 
})


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./assets/img/404.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

            createTypes(data.types);

            const pokeName = document.getElementById("name");
            pokeName.textContent = "#"+data.id + " " + data.name.toUpperCase();

            var stats = data.stats;
            createGraph( [stats[0].base_stat, 
                          stats[1].base_stat, 
                          stats[2].base_stat, 
                          stats[3].base_stat, 
                          stats[4].base_stat, 
                          stats[5].base_stat],
                          data.name );
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const createTypes = ( types ) =>{
    types.forEach(element => {
        const divTipes = document.getElementById("types");
        const span = document.createElement("span");

        span.classList.add( "typeBox" );
        span.classList.add( element.type.name );

        var text = document.createTextNode(element.type.name.toUpperCase());
        span.appendChild(text);

        


        divTipes.appendChild(span);
    }); 
} 

const clearTypeDiv = () =>{
    const divTipes = document.getElementById("types");
    var first = divTipes.firstElementChild;
    while (first) {
        first.remove();
        first = divTipes.firstElementChild;
    }
}


// radar

const radialConf =  {
    type: 'radar',
    data: {
      labels: ["Hp", "Attack", "Defense", "Special attack", "Special defense", "Speed"],
      datasets: [
        {
          label: "",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: []
        }
      ]
    },
    options: {
    }
};

const clearGraph = () =>{
    const canvasContainer = document.getElementById("canvasContainer");
    var first = canvasContainer.firstElementChild;
    while (first) {
        first.remove();
        first = canvasContainer.firstElementChild;
    }
}

const createGraph = ( data, name ) =>{

    clearGraph();
    const canvas = document.createElement("canvas");
    canvas.setAttribute('id','myChart');

    canvasContainer.appendChild(canvas);

    radialConf.data.datasets[0].data = data;
    radialConf.data.datasets[0].label = name;

    new Chart(
        document.getElementById('myChart'),
        radialConf
    );

}