class PlayerCanvas {
	constructor(id, hue, z = 0) {

		// Create canvas element
		let e = document.createElement("canvas");
		e.id = `PlayerCanvas${id}`;
		e.classList.add("player-canvas");
		e.style.zIndex = z;
		e.width = 1000;
		e.height = 1000;
		document.getElementById("map").appendChild(e);

		// Add properties
		this.canvas = e.getContext("2d");
		this.canvas.lineCap = "round";
		this.canvas.lineJoin = "round";
		this.canvas.lineWidth = 1;
		this.canvas.strokeStyle = `hsl(${hue}, 70%, 60%)`;

	}

	moveTo(x, z) {
		let range = courseData[selectedCourse];
		this.canvas.moveTo((x - range.min.x) / (range.max.x - range.min.x) * 1000, (z - range.min.z) / (range.max.z - range.min.z) * 1000);
	}
	lineTo(x, z) {
		let range = courseData[selectedCourse];
		this.canvas.lineTo((x - range.min.x) / (range.max.x - range.min.x) * 1000, (z - range.min.z) / (range.max.z - range.min.z) * 1000);
		this.canvas.stroke();
	}

}
