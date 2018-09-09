class Timer {
  constructor() {
    this.interval = null;
    this.elapsedTime = 0;
  }
  
  start(callback) {
    this.interval = setInterval(() => {
      this.elapsedTime++
      callback();
    }, 1000);
  }
  
  stop() {
    clearInterval(this.interval);
    this.elapsedTime = 0;
  }
  
  formatTime() {
    const seconds = this.timeElapsed;
  }
  
  getMinutes() {
    return Math.floor(this.elapsedTime / 60); 
  }
  
  getSeconds() {
    if(this.elapsedTime <= 59) {
      return this.elapsedTime;
    } else {
      return this.elapsedTime - this.getMinutes() * 60;
    }
  }
  
  getMinutes() {
    if(this.elapsedTime < 60) {
      return 0;
    } else {
      return Math.floor(this.elapsedTime / 60);
    }
  }
  
  getTime() {
    return this.getMinutes() + 'm' + ' ' + this.getSeconds() + 's';
  }
  
  printTime(el) {
    if(el) {
      el.innerHTML = this.getMinutes() + 'm' + ' ' + this.getSeconds() + 's';
    }
  }
}

export default Timer;