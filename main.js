document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let tasks = [];

    // Función para obtener tareas de localStorage
    function fetchTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = storedTasks ? storedTasks : [];
    }

    // Función para guardar tareas en localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para renderizar la lista de tareas
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task ${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
                <button class="complete-btn" data-index="${index}">${task.completed ? 'Reabrir' : 'Finalizar'}</button>
            `;
            li.querySelector('.delete-btn').addEventListener('click', function () {
                deleteTask(index);
            });
            li.querySelector('.complete-btn').addEventListener('click', function () {
                toggleTaskCompletion(index);
            });
            todoList.appendChild(li);
        });
    }

    // Función para eliminar una tarea
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Función para finalizar o reabrir una tarea
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Renderizar tareas al cargar la página
    fetchTasks();
    renderTasks();

    // Manejar el envío del formulario para agregar nueva tarea
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskName = todoInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            saveTasks();
            todoInput.value = '';
            renderTasks();
        }
    });
});
