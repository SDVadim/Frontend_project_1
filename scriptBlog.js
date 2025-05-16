document.addEventListener("DOMContentLoaded", () => {

  // элементы DOM
  const feedbackModal = document.getElementById("feedbackModal")
  const openFeedbackBtn = document.getElementById("openFeedbackBtn")
  const feedbackForm = document.getElementById("feedbackForm")
  const submitBtn = document.getElementById("submitBtn")
  const closeButtons = document.querySelectorAll(".close")

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
