document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="remove-btn">Remove</button>
    `;

    // Add click event to toggle completion
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Add click event to remove button
    li.querySelector('.remove-btn').addEventListener('click', (e) => {
       
        li.remove();
    });

    // Append to the list
    document.getElementById('todo-list').appendChild(li);

    // Clear the input
    taskInput.value = '';
}
