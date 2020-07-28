var viewing = false;

document.getElementById("replay-button").onclick = (() => {
    if (!viewing) {
        watchCourse(courses[selectedCourse]);
    }
    toggleReplayIcon();
});

function clearPlayers() {
    let map = document.getElementById("map");
    for (var i = 0; i < map.childElementCount; i++) {
        if (map.children[i].classList.contains("player-icon") || map.children[i].classList.contains("player-canvas")) {
            map.children[i].remove();
            i--;
        }
    }
}
function watchCourse(course, user = null) {
    if (!viewing) {
        viewing = true;
        clearPlayers();

        // Get sorted scores with replays
        let scores = [...course.scores].sort((a, b) => -a.compareTo(b)).filter((a) => { return a.replay !== null; });
        if (user !== null) scores = scores.filter((a) => { return a.name === user; });

        // Create players
        var replays = [];
        for (var i = 0; i < scores.length; i++) {
            let hue = (scores.length - i - 1) * 360 / scores.length;
            replays.push({ player: new PlayerIcon(i, hue, i + scores.length), path: [...scores[i].replay], canvas: new PlayerCanvas(i, hue, i) });
            let pop = replays[i].path.shift();
            replays[i].player.move(pop.x, pop.z, pop.yaw);
            replays[i].canvas.moveTo(pop.x, pop.z);
        }

        // Watch replays
        let timer = document.getElementById("timer");
        timer.innerHTML = "0:00.000";
        var replayStart = (new Date).getTime();
        var x = setInterval(() => {
            timer.innerHTML = timeFormat(roundToTick(timeSince(replayStart)));
            for (var i = 0; i < replays.length; i++) {
                while (replays[i].path.length > 0 && replays[i].path[0].time <= timeSince(replayStart)) {
                    let pop = replays[i].path.shift();
                    replays[i].player.move(pop.x, pop.z, pop.yaw);
                    replays[i].canvas.lineTo(pop.x, pop.z);
                }
                if (replays[i].path.length === 0) {
                    replays.splice(i, 1);
                    i--;
                }
            }
            if (replays.length === 0) {
                clearInterval(x);
                viewing = false;
                toggleReplayIcon();
            }
        }, 10);
    }
}
