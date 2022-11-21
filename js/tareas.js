// Creo las constante de dia,mes,año y el texto
const dateNumber = document.getElementById('diaNumber');
const dateText = document.getElementById('diaText');
const dateMonth = document.getElementById('diaMonth');
const dateYear = document.getElementById('diaYear');

// Creo donde van a estar todos los eventos
const tasksContainer = document.getElementById('tasksContainer');

//Creo la constante date y creo una nueva fecha con sus metodos.
const setDate = () => {
    const date = new Date();
    diaNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    diaText.textContent = date.toLocaleString('es', { weekday: 'long' });
    diaMonth.textContent = date.toLocaleString('es', { month: 'short' });
    diaYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

//Creo una constante para añadir eventos.
const AñadirNuevaTarea = event => {

    //Evitamos que nos lleve a otra pagina.
    event.preventDefault();

    //Tomamos el valor que tiene dentro el input.
    const { value } = event.target.taskText;

    //Controlamos si el valor esta vacio o no.
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'lista');

    //Controlamos que cuando haga click realize la funcion changeTaskState(Cambiar el estado de la tarea)
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);

    //Reseteamos para que nos deje introducir mas tareas.
    event.target.reset();
};

//Cambiamos el estado de la tarea(Si esta realizada o no).
const changeTaskState = event => {
    event.target.classList.toggle('done');
};

//Ordenamos las tareas para poner arriba las que no estan hechas y abajo las que estan ya realizadas.
const order = () => {
    const done = [];
    const toDo = [];

    //Vamos a cada una de las tareas.
    tasksContainer.childNodes.forEach( el => {
         //Preguntamos si la tarea tiene la clase done(marcada o no marcada) y la añadimos al final del array(push).
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    //Primeros devolvemos los toDo(Tareas no realizadas) y luego los done(tareas realizadas).
    return [...toDo, ...done];
}


//Funcion que llama al boton ordenar.
const renderOrderedTasks = () => {
    //Llamamos a order para que nos devuelva el array y añadimos los elementos al tasksContainer(Donde van a estar todas las tareas)
    order().forEach(el => tasksContainer.appendChild(el))
}

setDate();