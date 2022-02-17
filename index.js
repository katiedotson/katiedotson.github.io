document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas-ocean')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let movingObjYPos = 0
  let movingObjXPos = 100

  let mouseX = 0
  let mouseY = 0

  let caught = 0

  let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPointer()
    drawMovingObjects()
    updateMovingObjects()
  }

  let resetMovingObj = () => {
    movingObjYPos = 0
    movingObjXPos = Math.floor(Math.random() * (canvas.width - 10))
    if (movingObjXPos >= canvas.width) {
      Math.floor(Math.random() * (canvas.width - 10))
    }
  }

  let updateMovingObjects = () => {
    const leeway = 10

    let distanceX = Math.abs(movingObjXPos - mouseX)
    let distanceY = Math.abs(movingObjYPos - mouseY)

    if (
      Math.max(distanceX, leeway) == leeway &&
      Math.max(distanceY, leeway) == leeway
    ) {
      resetMovingObj()
      caught += 1
    }
    movingObjYPos += getSpeed()
    if (movingObjYPos >= canvas.height) {
      resetMovingObj()
    }
  }

  let getSpeed = () => {
    if (caught < 3) {
      return 1
    } else if (caught < 10) {
      return 2
    }
    return 4
  }

  let updatePointerPosition = (event) => {
    const pos = event.touches ? event.touches[0] : event
    let x = Math.round(pos.pageX)
    let y = Math.round(pos.pageY)
    mouseX = x
    mouseY = y
  }

  let drawMovingObjects = () => {
    ctx.beginPath()
    ctx.rect(movingObjXPos, movingObjYPos, 10, 10)
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.closePath()
  }

  let drawPointer = () => {
    ctx.beginPath()
    ctx.rect(mouseX, mouseY, 10, 10)
    ctx.fillStyle = '#fcba03'
    ctx.fill()
    ctx.closePath()
  }

  setInterval(draw, 10)
  canvas.addEventListener('mousemove', updatePointerPosition, false)
  canvas.addEventListener('touchmove', updatePointerPosition, false)
})
