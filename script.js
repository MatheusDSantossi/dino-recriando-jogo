const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const pointsHTML = document.querySelector(".points")
let position = 0;

// pontos do player e quantos mortes, que só vai parar de salvar quando 
// o mesmo fechar a janela (talvez)

let isJumping = false;

let points = 0;
let deaths = 0;

function handleKeyUp(event) {
    if(event.keyCode == 32) {
        // console.log('Pressionou espaço!');
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    // let position = 0;
    isJumping = true;
    let upInterval = setInterval(() => {
        // codigo será executado a cada 20 milisegundos
        if (position >= 150) {
            clearInterval(upInterval); // parar de subir

            // descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    points+=1;
                    console.log(points)
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //subindo
            position += 20;

            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    

    cactus.classList.add('cactus');
    // cactus.style.left = cactusPosition + 'px';
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
            deaths += 1;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}

createCactus();

pointsHTML.innerHTML = "<h1>Points: " + points + "</h1>"

document.addEventListener('keyup', handleKeyUp);

// document.addEventListener('keyup' , () => {
//     console.log('Pressionpou uma tecla')
// });
