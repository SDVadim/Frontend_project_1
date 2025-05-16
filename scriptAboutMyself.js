document.addEventListener("DOMContentLoaded", () => {

  // элементы DOM
  const header = document.getElementById("header")
  const feedbackModal = document.getElementById("feedbackModal")
  const openFeedbackBtn = document.getElementById("openFeedbackBtn")
  const feedbackForm = document.getElementById("feedbackForm")
  const submitBtn = document.getElementById("submitBtn")
  const closeButtons = document.querySelectorAll(".close")

  // таймер обратного отсчета
  const graduationDate = new Date("2028-06-01T00:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const diff = graduationDate - now

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) % 365)
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    document.getElementById("years").textContent = years.toString().padStart(2, "0")
    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
  }

  updateCountdown()
  const countdownInterval = setInterval(updateCountdown, 1000)


  // форма обратной связи
  openFeedbackBtn.addEventListener("click", (e) => {
    e.preventDefault()
    openModal(feedbackModal)
  })

  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault()

    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""))

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const message = document.getElementById("message").value

    let isValid = true

    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
      document.getElementById("nameError").textContent = "Имя должно содержать только русские или английские буквы"
      isValid = false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent = "Пожалуйста, введите корректный email адрес"
      isValid = false
    }

    if (!/^\+?[0-9\s\-$$$$]{10,20}$/.test(phone)) {
      document.getElementById("phoneError").textContent = "Пожалуйста, введите корректный номер телефона"
      isValid = false
    }

    if (message.trim() === "") {
      document.getElementById("messageError").textContent = "Пожалуйста, введите ваше сообщение"
      isValid = false
    }

    if (isValid) {
      submitBtn.textContent = "Отправляем..."
      submitBtn.classList.add("sending")
      submitBtn.disabled = true

      setTimeout(() => {
        console.log("Данные формы:", { name, email, phone, message })
        submitBtn.textContent = "Успешно отправлено!"
        submitBtn.classList.remove("sending")
        submitBtn.classList.add("success")
        setTimeout(() => {closeModal(feedbackModal)}, 3000)
      }, 2000)
    }
  })

  // зафиксированный header
  const headerPlaceholder = document.createElement("div")
  headerPlaceholder.className = "header-placeholder"
  document.body.insertBefore(headerPlaceholder, header.nextSibling)

  const headerHeight = header.offsetHeight
  headerPlaceholder.style.height = headerHeight + "px"

  window.addEventListener("scroll", () => {
    const firstScreenHeight = window.innerHeight

    if (window.scrollY > firstScreenHeight) {
      header.classList.add("fixed")
      headerPlaceholder.style.display = "block"
    } else {
      header.classList.remove("fixed")
      headerPlaceholder.style.display = "none"
    }
  })


  function openModal(modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }

  function closeModal(modal) {
    modal.classList.remove("show")
    document.body.style.overflow = ""
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal")
      closeModal(modal)
    })
  })

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target)
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        closeModal(modal)
      })
    }
  })
})
