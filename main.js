const inputTitulo = document.querySelector("#tituloTarea");
const inputTarea = document.querySelector("#tarea");
const importancia = document.querySelector("#select");
const addBtn = document.querySelector("#agregar");
const removeAllBtn = document.querySelector("#borrarTodo");
const empty = document.querySelector(".empty");
const tareas = document.querySelector(".tareas");
const template = document.querySelector("template").content;
const crearPDF = document.querySelector("#crearPDF");
const fragment = new DocumentFragment();
let tareaArray = [];

/*********************************
 *BTN ACCION DEL FORMULARIO
 **********************************/
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const valor1 = inputTitulo.value;
  const valor2 = inputTarea.value;
  const valor3 = importancia.value;

  //--VALIDACION DE LOS INPUT
  if (valor1 == "" || valor2 == "" || valor3 == "")
    return alert("faltan valores");

  const contenido = {
    id: Date.now(),
    inputTitulo: valor1,
    inputTarea: valor2,
    importancia: valor3,
  };
  //console.log(contenido.importancia);
  tareaArray.push(contenido);

  pintarTareas();

  console.log("tareaArray: ", tareaArray);
  /*   inputTitulo.value = "";
  inputTarea.value = "";
; */
  document.querySelector("form").reset();
});

/*********************************
 *PINTAR TAREAS
 **********************************/
const pintarTareas = () => {
  tareas.innerHTML = "";

  tareaArray.map((el) => {
    //console.log(el);
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = el.inputTitulo;
    clone.querySelector(".tareasPCard").textContent = el.inputTarea;
    clone.querySelector(".tareaColor").style.backgroundColor = el.importancia;
    clone.querySelector(".delete").dataset.id = el.id;
    clone.querySelector(".delete").addEventListener("click", eliminarTarea);
    fragment.appendChild(clone);
  });

  tareas.appendChild(fragment);

  //--APARECER Y DESAPARECER COMENTARIO
  tareaArray.length == 0
    ? empty.classList.remove("toggle")
    : empty.classList.add("toggle");
};

/*********************************
 * ELIMINAR TAREAS 1 X 1
 **********************************/
const eliminarTarea = (e) => {
  const btndelete = e.target.dataset.id;
  tareaArray = tareaArray.filter((el) => el.id != btndelete);
  pintarTareas();

  // console.log("tareaArray: ", tareaArray);
  // console.log(tareaArray.length);
};

/*********************************
 * ELIMINAR TAREAS TODAS
 **********************************/
removeAllBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("¿Vas a eliminar todas las tareas?")) {
    tareaArray.length = 0;
    pintarTareas();
    console.log("tareaArray: ", tareaArray);
  }
});

/*********************************
 *CREAR PDF
 **********************************/
crearPDF.addEventListener("click", (e) => {
  e.preventDefault();
  
   window.print(); 


  //OTRA
  let impContenidos = document.querySelector("#sectionTareas").innerHTML;

  w = window.open();
  w.document.write(impContenidos);
  w.document.close(); // necessary for IE >= 10
  w.focus(); // necessary for IE >= 10
  w.print();
  w.close();
});
