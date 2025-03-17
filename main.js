// main.js

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const calendarContainer = document.getElementById("calendar");

    // 🟢 캘린더 렌더링 함수
    const renderCalendar = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        let calendarHTML = `<div class="calendar-header">${year}년 ${month + 1}월</div>`;
        calendarHTML += `<div class="calendar-grid">`;

        const days = ["일", "월", "화", "수", "목", "금", "토"];
        days.forEach(day => calendarHTML += `<div class="day-header">${day}</div>`);

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="empty"></div>`;
        }

        for (let day = 1; day <= lastDate; day++) {
            calendarHTML += `<div class="calendar-day">${day}</div>`;
        }

        calendarHTML += `</div>`;
        calendarContainer.innerHTML = calendarHTML;
    };

    renderCalendar();

    // 🟢 로컬 저장소에서 저장된 할 일 불러오기
    const loadTodos = () => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todo => addTodo(todo.text, todo.completed));
    };

    // 🟢 할 일 추가 함수
    const addTodo = (text, completed = false) => {
        if (!text.trim()) return;

        const li = document.createElement("li");
        li.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => {
            saveTodos();
            li.classList.toggle("completed", checkbox.checked);
        });

        const span = document.createElement("span");
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        saveTodos();
    };

    // 🟢 할 일 저장 함수 (로컬 저장소)
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll(".todo-item").forEach(li => {
            todos.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector("input").checked
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // 🟢 추가 버튼 클릭 시 할 일 추가
    addButton.addEventListener("click", () => {
        addTodo(inputField.value);
        inputField.value = "";
    });

    // 🟢 Enter 키 입력 시 할 일 추가
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo(inputField.value);
            inputField.value = "";
        }
    });

    // 🟢 페이지 로드 시 저장된 할 일 불러오기
    loadTodos();
});
