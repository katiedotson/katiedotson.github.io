document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas-ocean')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth - 5
  canvas.height = window.innerHeight - 5

  let movingObjs = [
    { xPos: 100, yPos: 0 },
    { xPos: 11, yPos: 12 },
    { xPos: 110, yPos: 120 },
  ]

  let mouseX = 0
  let mouseY = 0

  let caught = 0

  let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '20px Courier New'
    ctx.fillText(caught, canvas.width - 30, 30)
    drawPointer()
    drawMovingObjects()
    updateMovingObjects()
  }

  let resetMovingObj = (obj) => {
    obj.yPos = 0
    obj.xPos = Math.floor(Math.random() * (canvas.width - 10))
  }

  let updateMovingObjects = () => {
    movingObjs.forEach((obj) => {
      const leeway = 10

      let distanceX = Math.abs(obj.xPos - mouseX)
      let distanceY = Math.abs(obj.yPos - mouseY)

      if (
        Math.max(distanceX, leeway) == leeway &&
        Math.max(distanceY, leeway) == leeway
      ) {
        resetMovingObj(obj)
        caught += 1
      }
      obj.yPos += getSpeed()
      if (obj.yPos >= canvas.height) {
        resetMovingObj(obj)
      }
    })
  }

  let getSpeed = () => {
    if (caught < 3) {
      return 1
    } else if (caught < 10) {
      return 2
    }
    return 3
  }

  let updatePointerPosition = (event) => {
    const pos = event.touches ? event.touches[0] : event
    let x = Math.round(pos.pageX)
    let y = Math.round(pos.pageY)
    mouseX = x
    mouseY = y
  }

  let drawMovingObjects = () => {
    movingObjs.forEach((obj) => {
      ctx.beginPath()
      ctx.rect(obj.xPos, obj.yPos, 10, 10)
      ctx.fillStyle = '#FFFFFF'
      ctx.fill()
      ctx.closePath()
    })
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
