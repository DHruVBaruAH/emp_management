document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      window.location.href = "index.html"
      return
    }
  
    // Set user email from localStorage
    const userEmail = localStorage.getItem("userEmail")
    document.getElementById("userEmail").textContent = userEmail
    document.getElementById("employeeEmail").textContent = userEmail
  
    // Load employee data
    loadEmployeeData()
  
    // Initialize clock
    updateClock()
    setInterval(updateClock, 1000)
  
    // Initialize calendar
    renderCalendar()
  
    // Initialize holiday table
    renderHolidayTable()
  
    // Event listeners for edit profile
    document.getElementById("editProfileBtn").addEventListener("click", openEditProfileModal)
  
    // Event listeners for modals
    const modals = document.querySelectorAll(".modal")
    const closeButtons = document.querySelectorAll(".close-modal")
  
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".modal")
        modal.classList.remove("active")
      })
    })
  
    // Close modal when clicking outside
    modals.forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active")
        }
      })
    })
  
    // Edit profile form submission
    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
      e.preventDefault()
      updateEmployeeData()
    })
  
    // Cancel edit button
    document.getElementById("cancelEditBtn").addEventListener("click", () => {
      document.getElementById("editProfileModal").classList.remove("active")
    })
  
    // Calendar navigation
    document.getElementById("prevMonth").addEventListener("click", () => {
      const currentMonth = document.getElementById("currentMonth").textContent
      const [month, year] = currentMonth.split(" ")
      const date = new Date(`${month} 1, ${year}`)
      date.setMonth(date.getMonth() - 1)
      document.getElementById("currentMonth").textContent =
        `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
      renderCalendar()
    })
  
    document.getElementById("nextMonth").addEventListener("click", () => {
      const currentMonth = document.getElementById("currentMonth").textContent
      const [month, year] = currentMonth.split(" ")
      const date = new Date(`${month} 1, ${year}`)
      date.setMonth(date.getMonth() + 1)
      document.getElementById("currentMonth").textContent =
        `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
      renderCalendar()
    })
  
    // Holiday controls
    document.getElementById("holidayYear").addEventListener("change", renderHolidayTable)
    document.getElementById("holidayMonth").addEventListener("change", renderHolidayTable)
  })
  
  // Sample employee data
  const employeeData = {
    id: "CPCG020",
    name: "Binod Baruah",
    email: "bbaruah985@gmail.com",
    phone: "8800332429",
    gender: "MALE",
    joiningDate: "01-06-1997",
    birthDate: "01-10-1971",
    highestDegree: "Class 10 Pass",
  }
  
  // Load employee data
  function loadEmployeeData() {
    // In a real application, you would fetch this data from a server
    // For this demo, we'll use the sample data
  
    document.getElementById("employeeName").textContent = employeeData.name
    document.getElementById("employeeId").textContent = employeeData.id
    document.getElementById("employeePhone").textContent = employeeData.phone
    document.getElementById("employeeEmail").textContent = employeeData.email
    document.getElementById("employeeGender").textContent = employeeData.gender
    document.getElementById("employeeJoiningDate").textContent = employeeData.joiningDate
    document.getElementById("employeeBirthDate").textContent = employeeData.birthDate
    document.getElementById("employeeDegree").textContent = employeeData.highestDegree
  
    // Also update the profile view modal
    document.getElementById("profileViewName").textContent = employeeData.name
    document.getElementById("profileViewId").textContent = employeeData.id
    document.getElementById("profileViewEmail").textContent = employeeData.email
    document.getElementById("profileViewPhone").textContent = employeeData.phone
    document.getElementById("profileViewGender").textContent = employeeData.gender
    document.getElementById("profileViewJoiningDate").textContent = employeeData.joiningDate
    document.getElementById("profileViewBirthDate").textContent = employeeData.birthDate
    document.getElementById("profileViewDegree").textContent = employeeData.highestDegree
  }
  
  // Update employee data
  function updateEmployeeData() {
    const name = document.getElementById("editName").value
    const email = document.getElementById("editEmail").value
    const phone = document.getElementById("editPhone").value
    const gender = document.getElementById("editGender").value
    const joiningDate = document.getElementById("editJoiningDate").value
    const birthDate = document.getElementById("editBirthDate").value
    const degree = document.getElementById("editDegree").value
  
    // Update the employee data object
    employeeData.name = name
    employeeData.email = email
    employeeData.phone = phone
    employeeData.gender = gender
    employeeData.joiningDate = joiningDate
    employeeData.birthDate = birthDate
    employeeData.highestDegree = degree
  
    // Update the UI
    loadEmployeeData()
  
    // Close the modal
    document.getElementById("editProfileModal").classList.remove("active")
  
    // In a real application, you would send this data to a server
    // For this demo, we'll just update the UI
  }
  
  // Open edit profile modal
  function openEditProfileModal() {
    // Populate the form with current data
    document.getElementById("editName").value = employeeData.name
    document.getElementById("editEmail").value = employeeData.email
    document.getElementById("editPhone").value = employeeData.phone
    document.getElementById("editGender").value = employeeData.gender
    document.getElementById("editJoiningDate").value = employeeData.joiningDate
    document.getElementById("editBirthDate").value = employeeData.birthDate
    document.getElementById("editDegree").value = employeeData.highestDegree
  
    // Show the modal
    document.getElementById("editProfileModal").classList.add("active")
  }
  
  // Update clock
  function updateClock() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
  
    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6
    const secondDegrees = (seconds / 60) * 360
  
    document.querySelector(".hour-hand").style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`
    document.querySelector(".minute-hand").style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`
    document.querySelector(".second-hand").style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`
  }
  
  // Render calendar
  function renderCalendar() {
    const calendarDays = document.getElementById("calendarDays")
    calendarDays.innerHTML = ""
  
    const currentMonthText = document.getElementById("currentMonth").textContent
    const [month, year] = currentMonthText.split(" ")
  
    const date = new Date(`${month} 1, ${year}`)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay()
  
    // Get the last day of the previous month
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  
    // Get the total days in the current month
    const daysInMonth = lastDay.getDate()
  
    // Get today's date
    const today = new Date()
  
    // Add days from the previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("calendar-day", "other-month")
      dayElement.textContent = prevLastDay - i + 1
      calendarDays.appendChild(dayElement)
    }
  
    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("calendar-day")
  
      // Check if it's today
      if (i === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
        dayElement.classList.add("today")
      }
  
      dayElement.textContent = i
      calendarDays.appendChild(dayElement)
    }
  
    // Add days from the next month
    const totalDaysDisplayed = calendarDays.children.length
    const daysToAdd = 42 - totalDaysDisplayed // 6 rows of 7 days
  
    for (let i = 1; i <= daysToAdd; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("calendar-day", "other-month")
      dayElement.textContent = i
      calendarDays.appendChild(dayElement)
    }
  }
  
  // Render holiday table
  function renderHolidayTable() {
    const holidayTableBody = document.getElementById("holidayTableBody")
    holidayTableBody.innerHTML = ""
  
    const year = document.getElementById("holidayYear").value
    const month = document.getElementById("holidayMonth").value - 1 // JavaScript months are 0-indexed
  
    const date = new Date(year, month, 1)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay()
  
    // Get the last day of the previous month
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  
    // Get the total days in the current month
    const daysInMonth = lastDay.getDate()
  
    // Add days from the previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("holiday-date", "other-month")
      dayElement.textContent = prevLastDay - i + 1
      holidayTableBody.appendChild(dayElement)
    }
  
    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("holiday-date")
      dayElement.textContent = i
      holidayTableBody.appendChild(dayElement)
    }
  
    // Add days from the next month
    const totalDaysDisplayed = holidayTableBody.children.length
    const daysToAdd = 42 - totalDaysDisplayed // 6 rows of 7 days
  
    for (let i = 1; i <= daysToAdd; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("holiday-date", "other-month")
      dayElement.textContent = i
      holidayTableBody.appendChild(dayElement)
    }
  }
  
  