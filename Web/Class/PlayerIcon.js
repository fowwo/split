class PlayerIcon {
	constructor(id, hue) {
		// Create image element
		var e = document.createElement("img");
		e.id = `Player${id}`;
		e.classList.add("player-icon");
		e.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 5px hsl(${hue}, 100%, 20%))`;
		document.getElementById("map").appendChild(e);

		// Add properties
		this.element = e;
	}

	move(x, z, yaw) {
		let range = courseData[selectedCourse];
		this.element.style.left = `${(x - range.min.x) / (range.max.x - range.min.x) * 100 - 1}%`;
		this.element.style.top = `${(z - range.min.z) / (range.max.z - range.min.z) * 100 - 1}%`;
		this.element.style.transform = `rotate(${yaw - 45 - 180}deg)`;
	}

}
