var selectedCourse = 0;

function selectCourse(id) {
	let course = courses[id];
	if (course !== undefined) {
		closeCourseList();
		selectedCourse = id;
		document.getElementById("course-title-author").style.opacity = "100%";
		document.getElementById("replay-button").style.cursor = "pointer";
		document.getElementById("course-title").innerHTML = course.name;
		document.getElementById("course-author").innerHTML = `by ${users[course.authorUUID]}`;
		let map = document.getElementById("map");
		map.style.backgroundImage = `url('${courseData[id].image}')`;
		listScores(course, true);
	}
}
function listScores(course, all = false, user = null) {
	let table = document.getElementById("leaderboard");
	resetLeaderboard();
	let scores = [...course.scores];
	scores = scores.sort((a, b) => { return a.compareTo(b); });

	if (!all) {
		let filterList = [];
		scores = scores.filter((score) => {
			if (!filterList.includes(score.uuid)) {
				filterList.push(score.uuid);
				return true;
			}
			return false;
		});
	}
	if (user != null) {
		scores = scores.filter((score) => { return score.name == user; });
	}

	// Create split columns
	let row = table.rows[0], cell;
	for (var i = 0; i < course.regions.length - 1; i++) {
		cell = document.createElement("th");
		cell.innerHTML = regions[course.regions[i]].name;
		cell.style.color = "#fffa";
		cell.style.textAlign = "center";
		row.appendChild(cell);
	}
	row.appendChild(document.createElement("td")); // Empty cell for date column

	// Find fastest splits
	var fastestSplits = [];
	for (var i = 0; i < course.regions.length - 1; i++) {
		let splitSort = scores.sort((a, b) => { return Score.compareBySplitDuration(a, b, i); });
		fastestSplits.push([splitSort[0].getSplitDuration(i), splitSort[1].getSplitDuration(i), splitSort[2].getSplitDuration(i)]);
	}

	// List scores
	var rank = 1;
	scores.sort((a, b) => { return a.compareTo(b); });
	for (var i = 0; i < scores.length; i++) {
		let score = scores[i];

		row = document.createElement("tr");
		if (score.replay === null) row.style.color = "#fff5";

		if (i !== 0 && Score.compareByTime(score, scores[i - 1]) !== 0) rank = i + 1;
		cell = document.createElement("td");
		cell.innerHTML = rank;
		cell.style.textAlign = "center";
		if (rank === 1) {
			cell.style.color = "var(--gold)";
			cell.style.textShadow = "0 0 6px var(--gold), 0 0 6px var(--gold), 0 0 6px var(--gold)";
			row.style.backgroundColor = "var(--transparent-gold)";
		} else if (rank === 2) {
			cell.style.color = "var(--silver)";
			cell.style.textShadow = "0 0 6px var(--silver), 0 0 6px var(--silver), 0 0 6px var(--silver)";
			row.style.backgroundColor = "var(--transparent-silver)";
		} else if (rank === 3) {
			cell.style.color = "var(--bronze)";
			cell.style.textShadow = "0 0 6px var(--bronze), 0 0 6px var(--bronze), 0 0 6px var(--bronze)";
			row.style.backgroundColor = "var(--transparent-bronze)";
		}
		row.appendChild(cell);

		cell = document.createElement("td");
		cell.innerHTML = timeFormat(score.splits[score.splits.length - 1]);
		cell.style.textAlign = "center";
		row.appendChild(cell);

		cell = document.createElement("td");
		cell.innerHTML = score.name;
		cell.style.color = `hsl(${i * 360 / scores.length}, 100%, 80%)`;
		row.appendChild(cell);

		if (course.regions.length >= 3) {
			for (var j = 0; j < course.regions.length - 1; j++) {
				let duration = score.getSplitDuration(j);
				cell = document.createElement("td");
				cell.innerHTML = timeFormat(duration);
				if (duration == fastestSplits[j][0]) {
					cell.style.color = "var(--gold)";
					cell.style.textShadow = "0 0 6px var(--gold), 0 0 6px var(--gold)";
				} else if (duration == fastestSplits[j][1]) {
					cell.style.color = "var(--silver)";
					cell.style.textShadow = "0 0 6px var(--silver), 0 0 6px var(--silver)";
				} else if (duration == fastestSplits[j][2]) {
					cell.style.color = "var(--bronze)";
					cell.style.textShadow = "0 0 6px var(--bronze), 0 0 6px var(--bronze)";
				} else {
					cell.style.color = "#fffa";
				}
				cell.style.textAlign = "center";
				cell.classList.add("time-cell");
				row.appendChild(cell);
			}
		}

		cell = document.createElement("td");
		cell.innerHTML = timeAgo(score.date.getTime());
		cell.style.color = "#fff5";
		cell.style.textAlign = "center";
		row.appendChild(cell);

		table.appendChild(row);
	}
}
function resetLeaderboard() {
	let table = document.getElementById("leaderboard");
	for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(-1);
	}
	while (table.rows[0].cells.length > 3) {
		table.rows[0].deleteCell(-1);
	}
}
function openCourseList() {
	let courseList = document.getElementById("course-list-button");
	courseList.classList.add("dropdown-active");
	let content = courseList.nextElementSibling;
	content.style.maxHeight = `${content.scrollHeight}px`;
}
function closeCourseList() {
	let courseList = document.getElementById("course-list-button");
	courseList.classList.remove("dropdown-active");
	let content = courseList.nextElementSibling;
	content.style.maxHeight = null;
}
function toggleReplayIcon() {
	let button = document.getElementById("replay-button");
	if (viewing) {
		// document.getElementById("replay-button").src = "Web/Images/pause-button.png";
		button.style.opacity = "25%";
		button.style.cursor = "default";
	} else {
		// document.getElementById("replay-button").src = "Web/Images/play-button.png";
		button.style.opacity = "100%";
		button.style.cursor = "pointer";
	}
}
