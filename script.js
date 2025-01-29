const input = document.querySelector('.input');
const button = document.querySelector('.button');
const output = document.querySelector('.output');

let tasks = []; // Array to store tasks as objects

// click enter button
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        button.click(); 
    }
});


// Add a new task
button.addEventListener('click', () => {
    let get = input.value.trim();

    if (get !== '') {
        tasks.unshift({ description: get, isActive: false }); // Add task with default inactive state
        input.value = '';
        renderTasks();
    }
});

// Render the tasks
function renderTasks() {
    output.innerText = ''; // Clear the output

    tasks.forEach((task, index) => {
        // Create task wrapper div
        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("task-wrapper"); // Add class for styling

        // Create task description div
        const item = document.createElement("div");
        item.classList.add("main");
        if (task.isActive) item.classList.add("active"); // Highlight if active
        item.innerText = task.description;

        // Create a delete button icon
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash-can','ic');

        icon.addEventListener('click', () => {
            tasks.splice(index, 1); // Remove task from array
            renderTasks(); // Re-render tasks
        });

        // Create the toggleable QT button
        const qt = document.createElement('button');
        qt.classList.add("box");

        if (task.isActive) {
            qt.classList.add("active");
        }

        // create line
        const line = document.createElement('hr');
        line.classList.add("line");

        // Toggle active state and re-order task
        qt.addEventListener('click', () => {
            task.isActive = !task.isActive; // Toggle the active state
            if (task.isActive) {
                tasks.push(...tasks.splice(index, 1)); // Move to the end
            } else {
                tasks.unshift(...tasks.splice(index, 1)); // Move to the beginning
            }
            renderTasks(); // Re-render tasks
        });

        // Append elements to taskWrapper
        taskWrapper.appendChild(qt);
        taskWrapper.appendChild(item);
        taskWrapper.appendChild(icon);
        
        // Append taskWrapper to output
        output.appendChild(taskWrapper);
        output.appendChild(line);
    });
}
