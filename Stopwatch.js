let [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let startButton = document.getElementById("st");
let resetButton = document.getElementById("rst");
let lapButton = document.getElementById("lp");
let clearAllButton = document.getElementById("lpcl");
let laps = document.getElementById("laps");
let bg = document.getElementById("outercircle");
let int;
let running=false;
let lapnumber=0;
let ch= 0;
let cm= 0;
let cs= 0;
let cms= 0;

function start() 
{
    if(!running)
    {
        startButton.innerHTML='PAUSE';
        bg.classList.add("bg");
        int = setInterval(displayTimer, 10);
        running=true;
    }
    else
    {
        startButton.innerHTML='START';
        bg.classList.remove("bg");
        clearInterval(int);
        running=false;
    }
    resetButton.classList.remove("hidden");
    lapButton.classList.remove("hidden");
};

function displayTimer() 
{
    miliseconds += 1;
    if (miliseconds == 100) 
    {
        miliseconds = 0;
        seconds++;
        if (seconds == 60) 
        {
            seconds = 0;
            minutes++;
            if (minutes == 60)
             {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = miliseconds < 10 ? "0" + miliseconds : miliseconds;

    timerRef.innerHTML = h + ' : ' + m + ' : ' + s + ' : ' + ms;
}


function reset() 
{
    clearInterval(int);
    clearAll();
    startButton.innerHTML='START';
    lapnumber=0;
    [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = ' 00 : 00 : 00 : 00 ';
    running=false;
    bg.classList.remove("bg");
    resetButton.classList.add("hidden");
    lapButton.classList.add("hidden");
};

function lap()
{
    let li=document.createElement("li");
    let number= document.createElement("span");
    let timerlap=document.createElement("span");
    let timerlap1=document.createElement("span");
    li.setAttribute("class","lap-items");
    number.setAttribute("class","number");
    timerlap.setAttribute("class","timerlap");
    timerlap1.setAttribute("class","timerlap1");
    if(lapnumber<9)
    {
        number.innerText='#0' +(++lapnumber);
    }
    else
    {
        number.innerText='#' +(++lapnumber);
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = miliseconds < 10 ? "0" + miliseconds : miliseconds;
    timerlap.innerHTML= '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + h + ' : ' + m + ' : ' + s + ' : ' + ms;
    let lh;
    let lm;
    let ls;
    let lms;
    if(h>=ch)
    {
        lh= h-ch;
    }
    else
    {
        lh= ((60-(Number(ch)))+Number(h));
    }
    if(m>=cm)
    {
        lm= m-cm;
    }
    else
    {
        lm= ((60-(Number(cm)))+Number(m));
        lh--;
    }
    if(s>=cs)
    {
        ls= s-cs;
    }
    else
    {
        ls= ((60-(Number(cs)))+Number(s));
        lm--;
    }
    if(ms>=cms)
    {
        lms= ms-cms;
    }
    else
    {
        lms= ((100-(Number(cms)))+Number(ms));
        ls--;
    }
    timerlap1.innerHTML= '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + (lh< 10 ? "0" + lh : lh) + ' : ' + (lm< 10 ? "0" + lm : lm) + ' : ' + (ls< 10 ? "0" + ls : ls) + ' : ' + (lms< 10 ? "0" + lms : lms);
    ch= hours;
    cm= minutes;
    cs= seconds;
    cms= miliseconds;
    li.append(number,timerlap,timerlap1);
    laps.append(li);
    clearAllButton.classList.remove("hidden");
};

function clearAll()
{
    laps.innerHTML="";
    lapnumber=0;
    ch=0;
    cm=0;
    cs=0;
    cms=0;
    laps.append(clearAllButton);
    clearAllButton.classList.add("hidden");
};

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
clearAllButton.addEventListener('click', clearAll);