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
        xPos: randomXPos(),
        yPos: randomYPos(),
        image: './images/trash_1.png',
        width: 30,
        height: 80,
        leeway: 30,
        speed: 2,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './images/wrapper.png',
        width: 20,
        height: 30,
        leeway: 30,
        speed: 1.5,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './images/bag.png',
        width: 60,
        height: 60,
        leeway: 60,
        speed: 1.1,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './images/bottle.png',
        width: 60,
        height: 60,
        leeway: 60,
        speed: 1.3,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './images/paper.png',
        width: 60,
        height: 60,
        leeway: 60,
        speed: 0.8,
        type: 'trash',
      },
      {
        xPos: 11,
        yPos: 12,
        image: './images/television.png',
        width: 100,
        height: 100,
        leeway: 100,
        speed: 1.6,
        type: 'trash',
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
    let missed = 0

    let coralReef = new Image()
    coralReef.src = './images/coral_reef.png'

    let bg = new Image()
    bg.src = './images/bg.png'

    let pointer = new Image()
    pointer.src = './images/crosshairs.png'

    let draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const background = ctx.createPattern(bg, 'repeat')
      ctx.fillStyle = background
      ctx.font = '10px press-start'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawPointer()
      drawCoralReef()
      drawMovingObjects()
      updateMovingObjects()

      ctx.fillText('8-bit Ocean Cleaning Service', 30, 30)
      ctx.fillText("Press 'Space' to pause", 30, 50)
      ctx.fillText('Caught: ' + caught, 30, 70)
      ctx.fillText('Missed: ' + missed, 30, 90)
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
          if (obj.type == 'trash') {
            caught += 1
          }
        }
        obj.yPos += obj.speed
        if (obj.yPos >= canvas.height) {
          resetMovingObj(obj)
          if (obj.type == 'trash') {
            missed += 1
          }
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
      ctx.drawImage(pointer, mouseX - 50, mouseY - 50, 100, 100)
    }

    let interval = setInterval(draw, 10)
    let isPaused = false

    document.addEventListener('keydown', (event) => {
      if (event.code == 'Space' && !isPaused) {
        clearInterval(interval)
        isPaused = true
      } else if (event.code == 'Space' && isPaused) {
        interval = setInterval(draw, 10)
        isPaused = false
      }
    })

    drawCoralReef()
    canvas.addEventListener('mousemove', updatePointerPosition, false)
    canvas.addEventListener('touchmove', updatePointerPosition, false)
  })
})
