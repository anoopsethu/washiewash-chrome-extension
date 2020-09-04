'use strict';

var tips = [
	"Clean hands are one of the best defences against antibiotic-resistant infections.",
	"80% of communicable diseases are transferred by touch.",
	"The most critical times for hand washing are before preparing food and after going to the bathroom.",
	"The recommended hand washing time is 15 seconds. The ideal washing time is 30 seconds.",
	"Most bacteria on our hands is on the fingertips and under the nails.",
	"Damp hands are 1,000x more likely to spread bacteria than dry hands.",
	"Hand washing and hand hygiene initiatives greatly reduce the number of absences, sick leaves, and lost productivity.",
	];

document.getElementById('footer-text').innerText = tips[Math.floor(Math.random()*tips.length)];

chrome.storage.sync.get(['minutes'], function (result) {
	if(result.minutes){
		document.getElementById('hours').innerText = (result.minutes)/60;
	} else {
		document.getElementById('hours').innerText = 1;
	}
});

function setAlarm() {
  let minutes = 60*parseFloat(document.getElementById("hours").innerText);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function countDown(){
	if(document.getElementById("hours").innerText>1){
		document.getElementById("hours").innerText--;
	}
}

function countUp(){
	if(document.getElementById("hours").innerText<24){
		document.getElementById("hours").innerText++;
	}
}

document.getElementById('set-reminder').addEventListener('click', setAlarm);
// document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('cancel-alarm').addEventListener('click', clearAlarm);

document.getElementById('btn-minus').addEventListener('click', countDown);
document.getElementById('btn-plus').addEventListener('click', countUp);
