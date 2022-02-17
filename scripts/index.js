async function pokemonLoad(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    try {
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            return data;
        } else if (response.status === 404){
            console.log("Este pokemon no existe");
        } else {
            console.log("Hubo un error en la peticion");
        }
    } catch (error) {
        console.log(error)
    }
}

async function datosHTML(inicio,fin){  
    //let datos = ''
    for(let i=inicio; i<=fin; i++){
        const data = await pokemonLoad(i);
        let contenido = `<div class="pokemon-card">
                        <h2 class="pokemon-name">${data.name}</h2>
                        <img src="${data.sprites.front_default}" alt="imagen frontal pokemon">
                        <div class="descripcion">
                        <p>peso: ${data.weight}</p>
                        <p>altura: ${data.height}</p>
                        <p>tipo: ${data.types[0].type.name}</p>
                        </div>
                        </div>`;
        datos = datos + contenido
    }
    const pokemonCard = document.getElementById("pokemon");
    pokemonCard.innerHTML = datos;    
    return datos; 
}

let pokemonContador = 1;
let final = 2;
let datos = '';
datosHTML(1,9);


const botonVer = document.getElementById("boton-ver");
botonVer.addEventListener("click", async (e) => {
    let auxiliar = pokemonContador*9;
    let auxiliarFinal = final*9
    if (auxiliarFinal >= 150){
        auxiliarFinal = 151;
    }
    datosHTML((auxiliar+1), auxiliarFinal);
    pokemonContador +=1;
    final += 1;
})


