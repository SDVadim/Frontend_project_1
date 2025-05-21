document.addEventListener("DOMContentLoaded", () => {
  // элементы DOM
  const feedbackModal = document.getElementById("feedbackModal")
  const openFeedbackBtn = document.getElementById("openFeedbackBtn")
  const feedbackForm = document.getElementById("feedbackForm")
  const submitBtn = document.getElementById("submitBtn")
  const closeButtons = document.querySelectorAll(".close")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const messageInput = document.getElementById("message")
  const graduationDate = new Date("2028-06-01T00:00:00").getTime()

  // таймер обратного отсчета
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
  if (openFeedbackBtn) {
    openFeedbackBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(feedbackModal)
    })
  }

  function validateName(value) {
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
      document.getElementById("nameError").textContent = "Имя должно содержать только русские или английские буквы"
      nameInput.classList.add("invalid")
      nameInput.classList.remove("valid")
      return false
    } else {
      document.getElementById("nameError").textContent = ""
      nameInput.classList.remove("invalid")
      nameInput.classList.add("valid")
      return true
    }
  }

  function validateEmail(value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      document.getElementById("emailError").textContent = "Пожалуйста, введите корректный email адрес"
      emailInput.classList.add("invalid")
      emailInput.classList.remove("valid")
      return false
    } else {
      document.getElementById("emailError").textContent = ""
      emailInput.classList.remove("invalid")
      emailInput.classList.add("valid")
      return true
    }
  }

  function validatePhone(value) {
    if (!/^\+?[0-9\s\-$$$$]{10,12}$/.test(value)) {
      document.getElementById("phoneError").textContent = "Пожалуйста, введите корректный номер телефона"
      phoneInput.classList.add("invalid")
      phoneInput.classList.remove("valid")
      return false
    } else {
      document.getElementById("phoneError").textContent = ""
      phoneInput.classList.remove("invalid")
      phoneInput.classList.add("valid")
      return true
    }
  }

  function validateMessage(value) {
    if (value.trim() === "") {
      document.getElementById("messageError").textContent = "Пожалуйста, введите ваше сообщение"
      messageInput.classList.add("invalid")
      messageInput.classList.remove("valid")
      return false
    } else {
      document.getElementById("messageError").textContent = ""
      messageInput.classList.remove("invalid")
      messageInput.classList.add("valid")
      return true
    }
  }

  if (nameInput) {
    nameInput.addEventListener("input", () => validateName(nameInput.value))
    nameInput.addEventListener("blur", () => validateName(nameInput.value))
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => validateEmail(emailInput.value))
    emailInput.addEventListener("blur", () => validateEmail(emailInput.value))
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => validatePhone(phoneInput.value))
    phoneInput.addEventListener("blur", () => validatePhone(phoneInput.value))
  }

  if (messageInput) {
    messageInput.addEventListener("input", () => validateMessage(messageInput.value))
    messageInput.addEventListener("blur", () => validateMessage(messageInput.value))
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = nameInput.value
      const email = emailInput.value
      const phone = phoneInput.value
      const message = messageInput.value
      const isNameValid = validateName(name)
      const isEmailValid = validateEmail(email)
      const isPhoneValid = validatePhone(phone)
      const isMessageValid = validateMessage(message)
      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        submitBtn.textContent = "Отправляем..."
        submitBtn.classList.add("sending")
        submitBtn.disabled = true
        setTimeout(() => {
          console.log("Данные формы:", { name, email, phone, message })
          submitBtn.textContent = "Успешно отправлено!"
          submitBtn.classList.remove("sending")
          submitBtn.classList.add("success")
          setTimeout(() => {
            feedbackForm.reset()
            submitBtn.textContent = "Отправить"
            submitBtn.classList.remove("success")
            submitBtn.disabled = false
            document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""))
            nameInput.classList.remove("valid", "invalid")
            emailInput.classList.remove("valid", "invalid")
            phoneInput.classList.remove("valid", "invalid")
            messageInput.classList.remove("valid", "invalid")
            closeModal(feedbackModal)
          }, 3000)
        }, 2000)
      }
    })
  }

  // фиксированный заголовок
  const header = document.getElementById("header")
  const mediaContainer = document.querySelector(".media")
  const headerPlaceholder = document.createElement("div")
  headerPlaceholder.className = "header-placeholder"
  document.body.insertBefore(headerPlaceholder, header.nextSibling)

  function updateFixedHeader() {
    if (header.classList.contains("fixed")) {
      const mediaWidth = mediaContainer.offsetWidth
      const galleryRect = mediaContainer.getBoundingClientRect()
      const galleryLeft = galleryRect.left + window.scrollX
      header.style.width = `${mediaWidth}px`
      header.style.left = `${galleryLeft}px`
      header.style.right = "auto"
      header.style.margin = "0"
      headerPlaceholder.style.height = `${header.offsetHeight}px`
    }
  }

  window.addEventListener("scroll", () => {
    const firstScreenHeight = window.innerHeight
    if (window.scrollY > firstScreenHeight) {
      if (!header.classList.contains("fixed")) {
        header.classList.add("fixed")
        headerPlaceholder.style.display = "block"
      }
      updateFixedHeader()
    } else {
      header.classList.remove("fixed")
      headerPlaceholder.style.display = "none"
      header.style.width = ""
      header.style.left = ""
      header.style.right = ""
      header.style.margin = ""
    }
  })

  window.addEventListener("resize", () => {
    if (header.classList.contains("fixed")) {
      updateFixedHeader()
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
