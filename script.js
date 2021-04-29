const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results') 
let playerPosition = 232
let width = 16
let direction = 1
let enemiesRemoved = []
let enemyId
let goingRight = true;
let results = 0
var fired = false
var leftFired = false
var middleFired = false
var rightFired = false
var rocketFired = false



for(let i = 0; i < 256; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

const coordinates = Array.from(document.querySelectorAll('.grid div'));


const enemies = [
    0,1,2,3,4,5,6,
    16,17,18,19,20,21,22,
    32,33,34,35,36,37,38,
    48,49,50,51,52,53,54
]
function draw(){
    for(let i = 0; i < enemies.length; i++){
      if(!enemiesRemoved.includes(i)){
        coordinates[enemies[i]].classList.add('invader');
    }
  }
}

function remove(){
    for(let i = 0; i < enemies.length; i++){
        coordinates[enemies[i]].classList.remove('invader')   
    }
}

coordinates[playerPosition].classList.add('player')

function movePlayer(e) {
    coordinates[playerPosition].classList.remove('player')
    switch(e.key) {
      case 'a':
        if (playerPosition % width !== 0) playerPosition -=1
        break
      case 'd' :
        if (playerPosition % width < width - 1) playerPosition +=1
        break
    }
    coordinates[playerPosition].classList.add('player')
}
document.addEventListener('keydown', movePlayer)

function moveInvaders() {
    const leftEdge = enemies[0] % width === 0
    const rightEdge = enemies[enemies.length -1] % width === width -1
    remove()
  
    if (rightEdge && goingRight) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i] += width -1 
        direction = -1
        goingRight = false
      }
    }
  
    if(leftEdge && !goingRight) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i] += width +1
        direction = 1
        goingRight = true
      }
    }
  
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += direction
    }
  
    draw()

    if (coordinates[playerPosition].classList.contains('invader', 'player')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(enemyId)
      coordinates[playerPosition].classList.remove('player');
    }
  
    for (let i = 0; i <= enemies.length; i++) {
      if(enemies[i] > (coordinates.length)) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(enemyId) 
      }
    }
    if (enemiesRemoved.length >= enemies.length) {
      resultsDisplay.innerHTML = 'YOU WIN'
      clearInterval(enemyId)
      
    }
}

enemyId = setInterval(moveInvaders, 200)



function singleLaser(pew){
  let laserId
  let laserPosition = playerPosition
  
  function movingSingleLaser(){
      
      coordinates[laserPosition].classList.remove('laser')
      laserPosition -= width 
      coordinates[laserPosition].classList.add('laser')
      
      if (coordinates[laserPosition].classList.contains('invader')){
          coordinates[laserPosition].classList.remove('laser')
          coordinates[laserPosition].classList.remove('invader')
          coordinates[laserPosition].classList.add('boom')

          setTimeout(()=> coordinates[laserPosition].classList.remove('boom'), 300)
          clearInterval(laserId)

          const enemyRemoved = enemies.indexOf(laserPosition)
          enemiesRemoved.push(enemyRemoved)
          results++
          resultsDisplay.innerHTML = results
      } 
  }
  switch(pew.key){
      case 'k':
        
        if(!fired){
            var audio = new Audio('audio/sound-effects-library-laser-gun.mp3');
            audio.play();
            laserId = setInterval(movingSingleLaser, 100);
            setTimeout(() => {
              fired = false
            }, 190);
            fired = true
          }
  }
}
document.addEventListener('keydown', singleLaser)


function leftLaser(pew){
    let laserLeftId
    let laserPosition = playerPosition
    function movingLeftLaser(){
        coordinates[laserPosition-1].classList.remove('laser')
        laserPosition -= width 
        coordinates[laserPosition-1].classList.add('laser')

        if (coordinates[laserPosition-1].classList.contains('invader')){
            coordinates[laserPosition-1].classList.remove('laser')
            coordinates[laserPosition-1].classList.remove('invader')
            coordinates[laserPosition-1].classList.add('boom')

            setTimeout(()=> coordinates[laserPosition-1].classList.remove('boom'), 300)
            clearInterval(laserLeftId)

            const enemyRemoved = enemies.indexOf(laserPosition-1)
            enemiesRemoved.push(enemyRemoved)
            results++
            resultsDisplay.innerHTML = results

        } 
    }
    switch(pew.key){
        case 'j':
          if(!leftFired){
            laserLeftId = setInterval(movingLeftLaser, 100);
            setTimeout(() => {
              leftFired = false
            }, 1000);
            leftFired = true
          }
  
    }
}

document.addEventListener('keydown', leftLaser)

function middleLaser(pew){
  let laserMiddleId
  let laserPosition = playerPosition
  function movingMiddleLaser(){
      coordinates[laserPosition].classList.remove('laser')
      laserPosition -= width 
      coordinates[laserPosition].classList.add('laser')

      if (coordinates[laserPosition].classList.contains('invader')){
          coordinates[laserPosition].classList.remove('laser')
          coordinates[laserPosition].classList.remove('invader')
          coordinates[laserPosition].classList.add('boom')

          setTimeout(()=> coordinates[laserPosition].classList.remove('boom'), 300)
          clearInterval(laserMiddleId)

          const enemyRemoved = enemies.indexOf(laserPosition)
          enemiesRemoved.push(enemyRemoved)
          results++
          resultsDisplay.innerHTML = results
      } 
  }
  switch(pew.key){
      case 'j':
        if(!middleFired){
          var audio = new Audio('audio/sfx_wpn_cannon6.mp3');
          audio.play();
          laserMiddleId = setInterval(movingMiddleLaser, 100);
          setTimeout(() => {
            middleFired = false
          }, 1000);
          middleFired = true
        }
  }
}
document.addEventListener('keydown', middleLaser)

function rightLaser(pew){
  let laserRightId
  let laserPosition = playerPosition
  function movingRightLaser(){
      coordinates[laserPosition+1].classList.remove('laser')
      laserPosition -= width 
      coordinates[laserPosition+1].classList.add('laser')

      if (coordinates[laserPosition+1].classList.contains('invader')){
          coordinates[laserPosition+1].classList.remove('laser')
          coordinates[laserPosition+1].classList.remove('invader')
          coordinates[laserPosition+1].classList.add('boom')

          setTimeout(()=> coordinates[laserPosition+1].classList.remove('boom'), 300)
          clearInterval(laserRightId)

          const enemyRemoved = enemies.indexOf(laserPosition+1)
          enemiesRemoved.push(enemyRemoved)
          results++
          resultsDisplay.innerHTML = results
      } 
    }
  switch(pew.key){
      case 'j':
        if(!rightFired){
          laserRightId = setInterval(movingRightLaser, 100);
          setTimeout(() => {
            rightFired = false
          }, 1000);
          rightFired = true
        }
  }
}
document.addEventListener('keydown', rightLaser)





function rocket(pew){
   let rocketId
   let rocketPosition = playerPosition
   function movingRocket(){
     coordinates[rocketPosition].classList.remove('rocket')
     rocketPosition -= width;
     coordinates[rocketPosition].classList.add('rocket')

     if(coordinates[rocketPosition].classList.contains('invader')){
      coordinates[rocketPosition].classList.remove('rocket')
      coordinates[rocketPosition].classList.remove('invader')
      coordinates[rocketPosition].classList.add('boom')
      coordinates[rocketPosition-1].classList.add('boom')
      coordinates[rocketPosition +1].classList.add('boom');
      coordinates[rocketPosition -16].classList.add('boom');
      setTimeout(() => coordinates[rocketPosition].classList.remove('boom'), 300 
      && coordinates[rocketPosition -1].classList.remove('boom'), 300 
      && coordinates[rocketPosition +1].classList.remove('boom'), 300
      && coordinates[rocketPosition-16].classList.remove('boom'), 300) 
      clearInterval(rocketId)

      const middleRocketEnemyRemoved = enemies.indexOf(rocketPosition)
      enemiesRemoved.push(middleRocketEnemyRemoved)

      if(coordinates[rocketPosition-1].classList.contains('invader')){
        coordinates[rocketPosition].classList.remove('rocket')
        coordinates[rocketPosition-1].classList.remove('invader')
  
        const leftRocketEnemyRemoved = enemies.indexOf(rocketPosition-1)
        enemiesRemoved.push(leftRocketEnemyRemoved)
        results++ 
      }
      if(coordinates[rocketPosition+1].classList.contains('invader')){
        coordinates[rocketPosition].classList.remove('rocket')
        coordinates[rocketPosition+1].classList.remove('invader')

        const rightRocketEnemyRemoved = enemies.indexOf(rocketPosition +1)
        enemiesRemoved.push(rightRocketEnemyRemoved)
        results++ 
      }
      if(coordinates[rocketPosition-16].classList.contains('invader')){
        coordinates[rocketPosition].classList.remove('rocket')
        coordinates[rocketPosition-16].classList.remove('invader')
  
        const topRocketEnemyRemoved = enemies.indexOf(rocketPosition -16)
        enemiesRemoved.push(topRocketEnemyRemoved)
        results++ 
      }
      console.log(enemiesRemoved)
      results++ 
     }
    
    resultsDisplay.innerHTML = results
  
   }
   switch(pew.key){
     case 'l':
      if(!rocketFired){
        var audio = new Audio('audio/sfx_weapon_rocket.mp3');
        audio.play();
        rocketId = setInterval(movingRocket, 100);
        setTimeout(() => {
          rocketFired = false
        }, 2000);
        rocketFired = true
      }
   }

}
document.addEventListener('keydown', rocket);

function restartingGame(){
  location.reload();
}

