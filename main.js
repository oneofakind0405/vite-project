document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const themeToggle = document.getElementById("toggle-theme");
    const calendarContainer = document.getElementById("calendar");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    let currentDate = new Date();
    let selectedDate = new Date();

    // 🟢 테마 변경 (다크 모드)
    const toggleTheme = () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDark ? "☀️ 라이트 모드" : "🌙 다크 모드";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    // 🟢 로컬 저장소에서 테마 불러오기
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ 라이트 모드";
    }
    themeToggle.addEventListener("click", toggleTheme);

    // 🟢 캘린더 생성 함수
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        let calendarHTML = `<div class="calendar-header">${year}년 ${month + 1}월</div>`;
        calendarHTML += `<div class="calendar-grid">`;

        ["일", "월", "화", "수", "목", "금", "토"].forEach(day => {
            calendarHTML += `<div class="day-header">${day}</div>`;
        });

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="empty"></div>`;
        }

        for (let day = 1; day <= lastDate; day++) {
            calendarHTML += `<div class="calendar-day">${day}</div>`;
        }

        calendarHTML += `</div>`;
        calendarContainer.innerHTML = calendarHTML;
    };

    // 🟢 이전/다음 달 이동 기능
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // 🟢 할 일 추가 함수
    const addTodo = (text, important = false) => {
        if (!text.trim()) return;

        const li = document.createElement("li");
        li.classList.add("todo-item");

        const starBtn = document.createElement("button");
        starBtn.textContent = "⭐";
        starBtn.classList.add("star-btn");
        if (important) li.classList.add("important");

        starBtn.addEventListener("click", () => {
            li.classList.toggle("important");
            saveTodos();
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

        li.appendChild(starBtn);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        saveTodos();
    };

    addButton.addEventListener("click", () => {
        addTodo(inputField.value);
        inputField.value = "";
    });

    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo(inputField.value);
            inputField.value = "";
        }
    });
});
