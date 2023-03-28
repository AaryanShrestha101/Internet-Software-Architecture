function digitalClock() {
    const clock = document.getElementById("clock");
    const time = new Date();
    const hours = time.getHours().toString().padStart(1, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    const clockString = `${hours}:${minutes}:${seconds}`;
    clock.textContent = clockString;
  }
  
  setInterval(digitalClock, 1000);
  