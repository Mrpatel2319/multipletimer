
        let timers = [];
        let timerIds = [];

        function startNewTimer() {
            const hours = parseInt(document.getElementById('hours').value) || 0;
            const minutes = parseInt(document.getElementById('minutes').value) || 0;
            const seconds = parseInt(document.getElementById('seconds').value) || 0;

            if (hours === 0 && minutes === 0 && seconds === 0) {
                alert('Please enter a valid time');
                return;
            }

            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            const timerId = timers.length;

            const timerElement = document.createElement('div');
            timerElement.className = 'timer-display';
            timerElement.id = `timer-${timerId}`;
            
            const stopButton = document.createElement('button');
            stopButton.className = 'stop-timer';
            stopButton.textContent = 'Stop Timer';
            stopButton.onclick = () => stopTimer(timerId);

            document.getElementById('timers-container').appendChild(timerElement);
            timerElement.appendChild(stopButton);

            timers.push(totalSeconds);
            updateTimer(timerId);

            // Clear input fields
            document.getElementById('hours').value = '';
            document.getElementById('minutes').value = '';
            document.getElementById('seconds').value = '';
        }

        function updateTimer(timerId) {
            if (timers[timerId] <= 0) {
                const timerElement = document.getElementById(`timer-${timerId}`);
                timerElement.innerHTML = "Time's up!";
                playAlertSound();
                return;
            }

            const hours = Math.floor(timers[timerId] / 3600);
            const minutes = Math.floor((timers[timerId] % 3600) / 60);
            const seconds = timers[timerId] % 60;

            const timerElement = document.getElementById(`timer-${timerId}`);
            timerElement.innerHTML = `Time left: ${hours}h ${minutes}m ${seconds}s
                <button class="stop-timer" onclick="stopTimer(${timerId})">Stop Timer</button>`;

            timers[timerId]--;
            timerIds[timerId] = setTimeout(() => updateTimer(timerId), 1000);
        }

        function stopTimer(timerId) {
            clearTimeout(timerIds[timerId]);
            const timerElement = document.getElementById(`timer-${timerId}`);
            timerElement.remove();
            timers[timerId] = 0;
        }
