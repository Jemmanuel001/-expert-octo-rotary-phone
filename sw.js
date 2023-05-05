window.onload = function(){

    const goButton = document.getElementsByClassName("go")[0];
    const lapButton = document.getElementsByClassName("lap")[0];
    const resetButton = document.getElementsByClassName("reset")[0];
    const clearButton = document.getElementsByClassName("clear")[0];
    const minute = document.getElementsByClassName("minute")[0];
    const second = document.getElementsByClassName("sec")[0];
    const centisecond = document.getElementsByClassName("msec")[0];
    const lapse = document.getElementsByClassName("lapse")[0];
    const abg = document.getElementsByClassName("out")[0];


    let isPlay = false;
    let secCounter = 0;
    let min;
    let minCounter = 0;
    let sec;
    let centiSec;
    let centiCounter = 0;
    let lapitem = 0;
    let isReset = false;

    const toggleButton = () => {
        resetButton.classList.toggle("hidden");
        lapButton.classList.toggle("hidden");
    }

    const go = () => {
        if (!isPlay && !isReset) {
            goButton.innerHTML = 'Pause';
            abg.classList.add("animationbg");
            min = setInterval(() => {
                if (minCounter === 60) {
                    minCounter = 0;
                }
                minute.innerHTML = `&nbsp;${++minCounter} : `;
            }, 60*1000);

            sec = setInterval(() => {
                if (secCounter === 60) {
                    secCounter = 0;
                }
                second.innerHTML = `&nbsp;${++secCounter} :`;
            }, 1000);

            centiSec = setInterval(() => {
                if (centiCounter === 100) {
                    centiCounter = 0;
                }
                centisecond.innerHTML = `&nbsp;${++centiCounter}`;
            }, 10);

            isPlay = true;
            isReset = true;
        } else {
            goButton.innerHTML = 'Go';
            clearInterval(min);
            clearInterval(sec);
            clearInterval(centiSec);
            isPlay = false;
            isReset = false;
            abg.classList.remove("animationbg");
        }
        toggleButton();
    }

    const reset = () => {
        isReset = true;
        go();
        lapButton.classList.add("hidden"); 
        resetButton.classList.add("hidden");
        secCounter = 0;
        centiCounter = 0;
        minCounter = 0;
        second.innerHTML = '&nbsp; 0 :';
        centisecond.innerHTML = '&nbsp; 0';
        minute.innerHTML = '0 :';
    }

    const lap = () => {
        const li = document.createElement("li");
        const nmbr = document.createElement("span");
        const stamp = document.createElement("span");

        li.setAttribute("class", "lapse-item");
        nmbr.setAttribute("class", "nmbr");
        stamp.setAttribute("class","stamp");

        nmbr.innerText = `#${++lapitem}`;
        stamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

        li.append(nmbr, stamp);
        lapse.append(li);

        clearButton.classList.remove("hidden");
    }

    const clear = () =>{
        lapse.innerHTML = '';
        lapse.append(clearButton);
        clearButton.classList.add("hidden");
        lapitem = 0;

    }

    goButton.addEventListener("click", go);
    resetButton.addEventListener("click", reset);
    lapButton.addEventListener("click", lap);
    clearButton.addEventListener("click", clear);
    

}
