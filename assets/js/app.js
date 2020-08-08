
// botonBorrar = BorrarBtn

const listaTareas =  document.getElementById('lista-tareas');
const formulario = document.getElementById('formulario');

//evet listeners

iniciarEventListeners();

function iniciarEventListeners(){

    formulario.addEventListener("submit", agregarTarea );

    listaTareas.addEventListener('click', borrarTarea);

    //contenido cargado
    document.addEventListener("DOMContentLoaded" , LocStReady);
 /**carga cuando todo el documento ya termino de cargar que una vez que cargue todos los datos del localStorage los miuestre */



}



function agregarTarea(e){
    e.preventDefault();
    console.log("chequear formulario");
    //leer text area
    const tarea = document.getElementById('tarea').value;
    const BorrarBtn = document.createElement('a');
    BorrarBtn.classList = 'borrar-tarea';
    BorrarBtn.innerText = 'X';


    const li = document.createElement("li");
    li.innerText = tarea;
    li.appendChild(BorrarBtn);
    listaTareas.appendChild(li);
    agregarTareaLocalStorage(tarea);


  
}

function borrarTarea(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tarea'){
            e.target.parentElement.remove();
            borrarTareaLocalStorage(e.target.parentElement.textContent);
   
    } 
  

}

function LocStReady(){
    let tareas;
    tareas = obtenerTareasLocalStorage();
    console.log(tareas);
    tareas.forEach(function(tarea) {
                const BorrarBtn = document.createElement('a');
            BorrarBtn.classList = 'borrar-tarea';
            BorrarBtn.innerText = 'X';


            const li = document.createElement("li");
            li.innerText = tarea;
            li.appendChild(BorrarBtn);
            listaTareas.appendChild(li);

    });

}


function agregarTareaLocalStorage(tarea) {

    let tareas;
    tareas = obtenerTareasLocalStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

//comporbar que haya elementos en local estorage y retorna un arreglo
function obtenerTareasLocalStorage(){
    let tareas;

    if(localStorage.getItem('tareas') === null){
        tareas = [];
    } else{

        tareas = JSON.parse(localStorage.getItem('tareas'));/**si hay algo en el arreglo se lee y se almacena */
    }

    return tareas;
}

function borrarTareaLocalStorage(tarea){

    let tareas, tareaBorrar;
    
    tareaBorrar = tarea.substring(0,tarea.length - 1 );

   

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea, index){
            if(tareaBorrar === tarea){
                tareas.splice(index, 1); //segundo paremetro cuantos elementos despues de la posicion del index en el arreglo se quieren eliminar

            }
       
    });

   localStorage.setItem('tareas', JSON.stringify(tareas)); //guardar arrreglo modificado en local storage
}

//motrar datos de local storege en la lista

