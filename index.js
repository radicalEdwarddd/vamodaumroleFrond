const wrongButton = document.querySelector('.wrongButton');
const buttons = document.querySelector('.buttons');
const h1 = document.querySelector('.h1');
const rightButton = document.querySelector('.rButton');

let countClicksNeg = 0;
let clicouNoSimReal = false;
let clicouNoSimDoBait = false;

function fetching() {
    const message = {
        ClicouNoNao: countClicksNeg,
        ClicouNoSimReal: clicouNoSimReal,
        ClicouNoSimDoBait: clicouNoSimDoBait
    }

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(resp => resp.json())
    .catch(err => console.log(err))
}

rightButton.addEventListener('click', () => {
    clicouNoSimReal = true;
    fetching();
})

wrongButton.addEventListener('click', () => {
    let whyNotInnerText;

    if(countClicksNeg == 5) {
        transformButton();
        fetching();
    } else if(countClicksNeg < 5) {
        randomPos(wrongButton);
        if(countClicksNeg == 0) {
            whyNotInnerText = "throwWhyNotException();"
        }
        else if(countClicksNeg == 1) {
            whyNotInnerText = "throwIDontBelieveItException();";
        }
        else if(countClicksNeg == 2) {
            whyNotInnerText = "throwQueVidaBandidaException();";    
        }
        else if(countClicksNeg == 3) {
            whyNotInnerText = "throwYesIDidThisException();";    
        } 
        else if(countClicksNeg == 4) {  
            whyNotInnerText = "throwLogicNotGateException();";     
        }  
        const whyNot = document.createElement("h3");
        whyNot.innerHTML = whyNotInnerText;
        whyNot.style.cssText = "color: #00FF00;"
        h1.appendChild(whyNot); 
    } else {
        clicouNoSimDoBait = true;
        fetching();
    }
    countClicksNeg++;
    
})

function randomPos(button) {
        let randTop = Math.floor(Math.random() * (17 - 2 + 1) + 2);
        let randBottom = Math.floor(Math.random() * (14 - 2 + 1) + 2);
        let randLeft = Math.floor(Math.random() * (80 - 2 + 1) + 2);
        let randRight = Math.floor(Math.random() * (80 - 2 + 1) + 2);

        let finalPos = `${randTop}em ${randRight}% ${randBottom}em ${randLeft}%`;
        button.style.cssText = `margin: ${finalPos};`;     
}

function transformButton() {
    wrongButton.innerHTML = "<strong>sim</strong>";
    wrongButton.classList.remove('wrongButton');
    wrongButton.classList.add('wButton');
}
