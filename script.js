document.addEventListener("DOMContentLoaded", () => {

  // элементы DOM
  const galleryItems = document.querySelectorAll(".gallery-item")
  const galleryModal = document.getElementById("galleryModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const feedbackForm = document.getElementById("feedbackForm")
  const submitBtn = document.getElementById("submitBtn")
  const timedPopup = document.getElementById("timedPopup")
  const closeButtons = document.querySelectorAll(".close")
  const closeTimedPopupBtn = document.getElementById("closeTimedPopup")
  const openFeedbackBtn = document.getElementById("openFeedbackBtn")
  const feedbackModal = document.getElementById("feedbackModal")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const messageInput = document.getElementById("message")
  let currentImageIndex = 0
  const totalImages = galleryItems.length


  // попап галереи
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentImageIndex = index
      const imgSrc = item.querySelector("img").src
      const imgTitle = item.querySelector(".gallery-item-title").textContent
      modalImage.src = imgSrc
      modalTitle.textContent = imgTitle
      openModal(galleryModal)
      updateNavigationButtons()
    })
  })

  prevBtn.addEventListener("click", () => {
    if (currentImageIndex > 0) {
      currentImageIndex--
      updateModalImage()
      updateNavigationButtons()
    }
  })

  nextBtn.addEventListener("click", () => {
    if (currentImageIndex < totalImages - 1) {
      currentImageIndex++
      updateModalImage()
      updateNavigationButtons()
    }
  })

  function updateModalImage() {
    const item = galleryItems[currentImageIndex]
    modalImage.src = item.querySelector("img").src
    modalTitle.textContent = item.querySelector(".gallery-item-title").textContent
  }

  function updateNavigationButtons() {
    prevBtn.classList.toggle("hidden", currentImageIndex === 0)
    nextBtn.classList.toggle("hidden", currentImageIndex === totalImages - 1)
  }

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

  // всплывающее окно
  function shouldShowTimedPopup() {
    const popupData = JSON.parse(localStorage.getItem("timedPopupData") || "{}")
    if (!popupData.firstVisit) {
      popupData.firstVisit = new Date().toISOString()
      localStorage.setItem("timedPopupData", JSON.stringify(popupData))
      return true
    }
    const firstVisitDate = new Date(popupData.firstVisit)
    const currentDate = new Date()
    const timeDifference = currentDate - firstVisitDate
    const tenDaysInMs = 10 * 24 * 60 * 60 * 1000
    if (timeDifference > tenDaysInMs) {
      return false
    }
    return true
  }

  if (timedPopup && shouldShowTimedPopup()) {
    setTimeout(() => {
      openModal(timedPopup)
    }, 30000)
  }

  if (closeTimedPopupBtn) {
    closeTimedPopupBtn.addEventListener("click", () => {
      closeModal(timedPopup)
    })
  }

  // зафиксированный header
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