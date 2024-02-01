const textarea = document.getElementById('message');
const submit = document.getElementById('quick_reply_submit');
const texts = ['Bumping this cop it']

const lastRan = () => localStorage.getItem("last-ran");

const minToMs = (min) => min * 60 * 1000;

function autobump() {
    textarea.innerText = `${texts[0]} [${Math.floor(100000 + Math.random() * 900000)}]`
    submit.click();
    localStorage.setItem("last-ran", Date.now());
    console.log("Ran Auto Bumper");

    return true;
}

function moreThanOneHourAgo (date) {
    const HOUR = 1000 * 60 * 60;
    const anHourAgo = Date.now() - HOUR;

    return date < anHourAgo;
}

function lastRanCalculate() {
    const anHourAgo = Date.now() - lastRan();
    const oneHour = 3600000;
		
    return oneHour - anHourAgo;
}

/* Checking when it last ran with local storage to see when to run it again */
if (moreThanOneHourAgo(lastRan())) {
    autobump();
    /* Running Every 1 Hour */
    setInterval(() => {
       autobump();
    }, minToMs(60));
} else {
    /* Run from time difference of last bump */
    setTimeout(() => {
  	autobump();
        /* Running Every 1 Hour */
        setInterval(() => {
            autobump();
        }, minToMs(60));
   }, lastRanCalculate()) 

   console.log(`Auto Bumper is running, next bump is in ${Math.floor(lastRanCalculate() / 1000 / 60)} minutes`);
}


/* Running Every 5 Minutes */

setInterval(() => {
    console.log(`Auto Bumper is running, next bump is in ${Math.floor(lastRanCalculate() / 1000 / 60)} minutes`);
}, minToMs(60));
