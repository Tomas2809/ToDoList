console.log('Vamos los pibes')

const Formulario=document.getElementById('Formulario')
const input=document.getElementById('input')
const ListaTareas=document.getElementById('Lista-Tareas')
const TemplateAlertas=document.getElementById('template-alerta').content

const fragment = document.createDocumentFragment()
let tareas = {}

document.addEventListener('DOMContentLoaded',() => {
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

ListaTareas.addEventListener('click', e =>{
    btnAccion(e)
})

Formulario.addEventListener('submit', e =>{ 
    e.preventDefault()
    setTareas(e)
}
)

const setTareas = e => {
    if(input.value.trim() === ''){
        console.log('Esta vacio')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }

    tareas[tarea.id] = tarea
    
    Formulario.reset()
    input.focus()

    pintarTareas()
}

const pintarTareas = () => {

    localStorage.setItem('tareas',JSON.stringify(tareas))

    if(Object.values(tareas).length == 0){
        ListaTareas.innerHTML = `
        <div id="Lista-Tareas" class="mt-3">
            <div class="alert alert-dark text-center">
                No hay tareas pendientes
            </div>
        `
        return 
    }


    ListaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea =>{
        const clone = TemplateAlertas.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if(tarea.estado){
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    ListaTareas.appendChild(fragment)

}

const btnAccion = e => {
    if (e.target.classList.contains('fa-check-circle')){
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        input.focus()
    }

    if(e.target.classList.contains('fa-minus-circle')){
        delete tareas[e.target.dataset.id]
        pintarTareas()
        input.focus()
    }

    if (e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
        input.focus()
    }



    e.stopPropagation()
}