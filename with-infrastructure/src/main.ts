import { UserData, ConfettiPiece } from "./type"

const form = document.querySelector("form") as HTMLFormElement
const emailOrPhone = document.querySelector("input[type='text']") as HTMLInputElement
const password = document.querySelector("input[type='password']") as HTMLInputElement
const showPassword = document.querySelector(".show") as HTMLElement
const signInBtn = document.getElementById("signin-btn") as HTMLButtonElement

const correctLogin = "uvivanova@edu.hse.ru"
const correctPassword = "12345Ul"

showPassword?.addEventListener("click", () => {
  if (password) {
    password.type = password.type === "password" ? "text" : "password"
  }
})

export function validateInput(emailOrPhoneValue: string, passwordValue: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\+?\d{10,14}$/
  const passwordRegex = /^(?=.*\d).{6,}$/

  let valid = true

  if (!emailOrPhone || !password) return false

  if (!emailRegex.test(emailOrPhoneValue) && !phoneRegex.test(emailOrPhoneValue)) {
    emailOrPhone.classList.add("error")
    alert("Введите корректный email или номер телефона.")
    valid = false
  }

  if (!passwordRegex.test(passwordValue)) {
    password.classList.add("error")
    alert("Пароль должен содержать хотя бы одну цифру и быть не короче 6 символов.")
    valid = false
  }

  setTimeout(() => {
    emailOrPhone.classList.remove("error")
    password.classList.remove("error")
  }, 1000)

  return valid
}

function shake(inputElement: HTMLElement) {
  inputElement.classList.remove("error")
  void inputElement.offsetWidth
  inputElement.classList.add("error")
}


form?.addEventListener("submit", (e: Event) => {
  e.preventDefault()

  if (!emailOrPhone || !password) return

  const isValid = validateInput(emailOrPhone.value, password.value)
  if (!isValid) return

  if (emailOrPhone.value === correctLogin && password.value === correctPassword) {
    alert("Авторизация прошла успешно!")
    const userData: UserData = {
      login: emailOrPhone.value,
      password: password.value,
    }
    localStorage.setItem("userData", JSON.stringify(userData))
    displayUserData()
  } else {
    alert("Неверный логин или пароль.")
  }

  shake(emailOrPhone)
  shake(password)
})

function displayUserData(): void {
  const raw = localStorage.getItem("userData")
  if (!raw) return

  const userData: UserData = JSON.parse(raw)
  if (userData?.login) {
    alert(`Добро пожаловать, ${userData.login}!`)
  }
}

const canvas = document.getElementById("confetti") as HTMLCanvasElement

if (canvas) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const confettiPieces: ConfettiPiece[] = []

  function randomColor(): string {
    const colors = ["#FFC107", "#E91E63", "#3F51B5", "#4CAF50", "#FF5722", "#9C27B0"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function createConfetti(): void {
    for (let i = 0; i < 150; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        width: Math.random() * 10 + 5,
        height: Math.random() * 8 + 5,
        color: randomColor(),
        velocityY: Math.random() * 3 + 2,
        velocityX: Math.random() * 1 - 0.5,
        angle: Math.random() * 360,
        rotateSpeed: Math.random() * 10,
      })
    }
  }

  function drawConfetti(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    confettiPieces.forEach((piece) => {
      ctx.save()
      ctx.translate(piece.x, piece.y)
      ctx.rotate((piece.angle * Math.PI) / 180)
      ctx.fillStyle = piece.color
      ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height)
      ctx.restore()
    })
    moveConfetti()
  }

  function moveConfetti(): void {
    confettiPieces.forEach((piece) => {
      piece.y += piece.velocityY
      piece.x += piece.velocityX
      piece.angle += piece.rotateSpeed
      if (piece.y > canvas.height) {
        piece.y = -10
        piece.x = Math.random() * canvas.width
      }
    })
  }

  createConfetti()
  setInterval(drawConfetti, 30)
}

window.addEventListener("load", () => {
  displayUserData()
})
