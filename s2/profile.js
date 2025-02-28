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
  
    // Load employee data
    loadEmployeeData()
  
    // Event listeners for edit profile
    document.getElementById("profileEditBtn").addEventListener("click", openEditProfileModal)
  
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
  
    document.getElementById("profileName").textContent = employeeData.name
    document.getElementById("profileId").textContent = employeeData.id
    document.getElementById("fullName").textContent = employeeData.name
    document.getElementById("email").textContent = employeeData.email
    document.getElementById("phone").textContent = employeeData.phone
    document.getElementById("gender").textContent = employeeData.gender
    document.getElementById("birthDate").textContent = employeeData.birthDate
    document.getElementById("employeeId").textContent = employeeData.id
    document.getElementById("joiningDate").textContent = employeeData.joiningDate
    document.getElementById("degree").textContent = employeeData.highestDegree
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
  
  