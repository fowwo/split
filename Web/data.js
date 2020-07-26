/**
 * Parses the data files and generates html elements.
 * @author fowwo
 */

var users = {};
var regions = {};
var courses = {};
var courseData = {};

fetch("Data/users.txt")
	.then(r => r.text())
	.then(d => {
		d = d.split("\n");
		for (var i = 0; i < d.length - 1; i++) {
			let args = d[i].split(":");
			users[args[0]] = args[1];
		}
		fetch("Data/regions.txt")
			.then(r => r.text())
			.then(d => {
				d = d.split("\n");
				for (var i = 1; i < d.length - 1; i++) {
					/* 0;1;bfa9b579-ec3f-4170-bdc0-23be13f78810;28;90;30;28;90;30
						0 - id
						1 - name
						2 - worldUUID
						3 - x1
						4 - y1
						5 - z1
						6 - x2
						7 - y2
						8 - z2
					*/
					let args = d[i].split(";");
					regions[Number.parseInt(args[0])] = new Region(args[1], args[2], Number.parseInt(args[3]), Number.parseInt(args[4]), Number.parseInt(args[5]), Number.parseInt(args[6]), Number.parseInt(args[7]), Number.parseInt(args[8]));
				}
				fetch("Data/courses.txt")
					.then(r => r.text())
					.then(d => {
						d = d.split("\n");
						let courseList = document.getElementById("course-list");
						for (var i = 1; i < d.length - 1; i++) {
							let args = d[i].split(";");
							let courseID = Number.parseInt(args[0]);
							let courseName = args[1];
							let authorUUID = args[2];
							let description = args[3];
							let worldUUID = args[4];
							let spawnX = args[5];
							let spawnY = args[6];
							let spawnZ = args[7];
							let spawnYaw = args[8];
							let spawnPitch = args[9];
							let splitIDs = args[10].split(",").map(Number);
							courses[courseID] = new Course(courseName, authorUUID, description, splitIDs);
						}
						fetch("Data/scores.txt")
							.then(r => r.text())
							.then(d => {
								d = d.split("\n");
								for (var i = 1; i < d.length - 1; i++) {
									let args = d[i].split(";");
									let scoreID = Number.parseInt(args[0]);
									let playerName = args[1];
									let playerUUID = args[2];
									let courseID = Number.parseInt(args[3]);
									let splits = args[4].split(",").map(Number);
									let date = new Date(Number.parseInt(args[5]));
									let score = new Score(playerName, playerUUID, courseID, splits, date);
									
									// Check for replay
									if (score.getTime() <= 15 * 60 * 1000) {
										fetch("Data/Replays/" + args[0] + ".txt")
											.then(r => {
												if (!r.ok) {
													throw Error(r.statusText);
												}
												return r.text();
											})
											.then(d => {
												score.replay = [];
												d = d.split("\n");
												for (var j = 1; j < d.length - 1; j++) {
													let args2 = d[j].split(";");
													score.replay.push({
														time: Number.parseInt(args2[0]),
														x: Number.parseFloat(args2[1]),
														y: Number.parseFloat(args2[2]),
														z: Number.parseFloat(args2[3]),
														yaw: Number.parseFloat(args2[4]),
														pitch: Number.parseFloat(args2[5])
													});
												}
											})
											.catch((error) => { console.log(`The replay does not exist for this score (${args[0]}).`); });
									}
									courses[courseID].scores.push(score);
								}
								if (Object.keys(courses).length > 0) {
									document.getElementById("course-list").innerHTML = "";
								}
								for (var id of Object.keys(courses)) {
									let course = courses[id];

									// Sort course scores
									course.scores = course.scores.sort((a, b) => { return a.compareTo(b); });

									// Add to course list
									let li, div, span;

									li = document.createElement("li");
									div = document.createElement("div");

									span = document.createElement("span");
									span.innerHTML = course.name;
									div.appendChild(span);
						
									span = document.createElement("span");
									let bestScore = course.scores[0];
									span.innerHTML = ` by ${users[course.authorUUID]} - ${timeFormat(bestScore.getTime())} by ${bestScore.name}`;
									span.style.color = "#fff5"
									div.appendChild(span);

									li.appendChild(div);
									li.onclick = (() => { selectCourse(id); });
									document.getElementById("course-list").appendChild(li);
								}
								openCourseList();

							});
					});
			});
	});
fetch("Web/courseData.json")
	.then(r => r.json())
	.then(d => {
		courseData = d;
	});
