# CS624-PE03-Enzo-Nguyen

The user enters a task ( example: do homework ) into the text input field and presses the "Add" button. The application captures the text from the input field and displays it within the app.

The application uses React Native to build the user interface. The "inputChange" function updates the content as the user types. When the user presses the "Add" button, the "addTodo" function checks whether the input field is empty. If it is not, the application creates a new task and adds it to the "todos" list. Each task consists of a name, an index number, and a completion status. Afterward, the application clears the input field and logs the task information to the terminal using "console.log()".

The new task appears on the screen below the input field. The terminal displays the list of tasks along with their respective details. Users can add multiple tasks, one after another.