document.addEventListener("DOMContentLoaded", () => {

  // элементы DOM
  const header = document.getElementById("header")
  const feedbackModal = document.getElementById("feedbackModal")
  const openFeedbackBtn = document.getElementById("openFeedbackBtn")
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


  // галерея + попап
  let currentImageIndex = 0
  const totalImages = galleryItems.length

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

  // сообщение по истечении 30 секунд
  let hasClosedTimedPopup = localStorage.getItem("hasClosedTimedPopup") === "true"

  if (!hasClosedTimedPopup) {
    console.log("Показать всплывающее окно через 3 секунды")
    setTimeout(() => {
      openModal(timedPopup)
    }, 30000)
  }

  closeTimedPopupBtn.addEventListener("click", () => {
    closeModal(timedPopup)
    localStorage.setItem("hasClosedTimedPopup", "true")
    hasClosedTimedPopup = true
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