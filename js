document.addEventListener('DOMContentLoaded', function() {
  const breakLabel = document.getElementById('break-label');
  const sessionLabel = document.getElementById('session-label');
  const breakDecrement = document.getElementById('break-decrement');
  const breakIncrement = document.getElementById('break-increment');
  const sessionDecrement = document.getElementById('session-decrement');
  const sessionIncrement = document.getElementById('session-increment');
  const breakLength = document.getElementById('break-length');
  const sessionLength = document.getElementById('session-length');
  const timerLabel = document.getElementById('timer-label');
  const timeLeft = document.getElementById('time-left');
  const startStop = document.getElementById('start_stop');
  const reset = document.getElementById('reset');
  const beep = document.getElementById('beep');

  let breakDuration = 5;
  let sessionDuration = 25;
  let isSession = true;
  let isRunning = false;
  let countdown;

  // Function to format time in mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Function to update break or session duration
  function updateDuration(isBreak, increment) {
    // Update break duration
    if (isBreak) {
      if (increment && breakDuration < 60) {
        breakDuration++;
      } else if (!increment && breakDuration > 1) {
        breakDuration--;
      }
      breakLength.textContent = breakDuration;
    } 
    // Update session duration
    else {
      if (increment && sessionDuration < 60) {
        sessionDuration++;
      } else if (!increment && sessionDuration > 1) {
        sessionDuration--;
      }
      sessionLength.textContent = sessionDuration;
      if (!isRunning) {
        timeLeft.textContent = formatTime(sessionDuration * 60);
      }
    }
  }

  // Function to start the timer
  function startTimer() {
    isRunning = true;
    startStop.textContent = 'Pause';
    countdown = setInterval(function() {
      const timeLeftInSeconds = parseInt(timeLeft.textContent.split(':')[0]) * 60 +
                                parseInt(timeLeft.textContent.split(':')[1]);
      if (timeLeftInSeconds === 0) {
        beep.play();
        isSession = !isSession;
        if (isSession) {
          timerLabel.textContent = 'Session';
          timeLeft.textContent = formatTime(sessionDuration * 60);
        } else {
          timerLabel.textContent = 'Break';
          timeLeft.textContent = formatTime(breakDuration * 60);
        }
      } else {
        timeLeft.textContent = formatTime(timeLeftInSeconds - 1);
      }
    }, 1000);
  }

  // Function to pause the timer
  function pauseTimer() {
    isRunning = false;
    startStop.textContent = 'Start';
    clearInterval(countdown);
  }

  // Function to reset the timer
  function resetTimer() {
    pauseTimer();
    breakDuration = 5;
    sessionDuration = 25;
    isSession = true;
    isRunning = false;
    breakLength.textContent = breakDuration;
    sessionLength.textContent = sessionDuration;
    timerLabel.textContent = 'Session';
    timeLeft.textContent = formatTime(sessionDuration * 60);
    beep.pause();
    beep.currentTime = 0;
  }

  // Event listeners for increment and decrement buttons
  breakDecrement.addEventListener('click', function() {
    updateDuration(true, false);
  });

  breakIncrement.addEventListener('click', function() {
    updateDuration(true, true);
  });

  sessionDecrement.addEventListener('click', function() {
    updateDuration(false, false);
  });

  sessionIncrement.addEventListener('click', function() {
    updateDuration(false, true);
  });

  // Event listener for the Start/Stop button
  startStop.addEventListener('click', function() {
    if (!isRunning) {
      startTimer();
    } else {
      pauseTimer();
    }
  });

  // Event listener for the Reset button
  reset.addEventListener('click', resetTimer);
});
