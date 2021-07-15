$(document).ready(function(){
  let startTime;
  let intervalId;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = d.getUTCHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = Math.floor(d.getMilliseconds() / 100);
    $("#timer").text(`${h}:${m}:${s}:${ms}`);
  }
  
  function setButtonStateInitial() {
    $("#start").prop("disabled", false);
    $("#stop").prop("disabled", true);
    $("#reset").prop("disabled", true);
  }

  function setButtonStateRunning() {
    $("#start").prop("disabled", true);
    $("#stop").prop("disabled", false);
    $("#reset").prop("disabled", true);
  }

  function setButtonStateStopped() {
    $("#start").prop("disabled", false);
    $("#stop").prop("disabled", true);
    $("#reset").prop("disabled", false);
  }

  setButtonStateInitial();

  $("#start").click(function(){
    setButtonStateRunning();
    startTime = Date.now();
    intervalId = setInterval(countUp, 10);
  });

  $("#stop").click(function(){
    setButtonStateStopped();
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
  });

  $("#reset").click(function(){
    setButtonStateInitial();
    $("#timer").text("0:0:0:0");
    elapsedTime = 0;
  });
});




  