document.addEventListener('DOMContentLoaded', () => {
  var font = new FontFace('press-start', 'url(PressStart2P-Regular.ttf)')

  font.load().then(function (font) {
    document.fonts.add(font)

    const canvas = document.getElementById('canvas-ocean')
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth - 5
    canvas.height = window.innerHeight - 5

    let randomXPos = () => {
      return Math.floor(Math.random() * (canvas.width - 10))
    }

    let randomYPos = () => {
      return Math.floor(Math.random() * canvas.height)
    }

    let movingObjs = [
      {
        xPos: 100,
        yPos: 0,
        image: './trash_1.png',
        width: 70,
        height: 120,
        leeway: 70,
        speed: 2,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './fish_1.png',
        width: 20,
        height: 30,
        leeway: 30,
        speed: 1,
        type: 'fish',
      },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1.2 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 0.8 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1.3 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1.5 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1.1 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 0.7 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 1 },
      { xPos: randomXPos(), yPos: randomYPos(), speed: 0.6 },
    ]

    let mouseX = 0
    let mouseY = 0

    let caught = 0

    let coralReef = new Image()
    coralReef.src = './coral_reef.png'

    let draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '10px press-start'
      ctx.fillText('8-bit Ocean Cleaning Service', 30, 30)
      ctx.fillText(caught, canvas.width - 30, 30)
      drawPointer()
      drawCoralReef()
      drawMovingObjects()
      updateMovingObjects()
    }

    let drawCoralReef = () => {
      ctx.drawImage(coralReef, 30, canvas.height - 300, 300, 300)
    }

    let resetMovingObj = (obj) => {
      obj.yPos = -100
      obj.xPos = randomXPos()
    }

    let updateMovingObjects = () => {
      movingObjs.forEach((obj) => {
        const leeway = obj.leeway

        let distanceX = Math.abs(obj.xPos - mouseX)
        let distanceY = Math.abs(obj.yPos - mouseY)

        if (
          leeway != undefined &&
          Math.max(distanceX, leeway) == leeway &&
          Math.max(distanceY, leeway) == leeway
        ) {
          resetMovingObj(obj)
          caught += 1
        }
        obj.yPos += obj.speed
        if (obj.yPos >= canvas.height) {
          resetMovingObj(obj)
        }
      })
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
        if (obj.image) {
          let imageElement = new Image()
          imageElement.src = obj.image
          ctx.drawImage(imageElement, obj.xPos, obj.yPos, obj.width, obj.height)
        } else {
          ctx.beginPath()
          ctx.rect(obj.xPos, obj.yPos, 3, 3)
          ctx.fillStyle = '#FFFFFF'
          ctx.fill()
          ctx.closePath()
        }
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
    drawCoralReef()
    canvas.addEventListener('mousemove', updatePointerPosition, false)
    canvas.addEventListener('touchmove', updatePointerPosition, false)
  })
})
