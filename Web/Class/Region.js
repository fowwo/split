class Region {

	// 0;1;bfa9b579-ec3f-4170-bdc0-23be13f78810;28;90;30;28;90;30
	constructor(name, worldUUID, x1, y1, z1, x2, y2, z2) {
		this.name = name;
		this.worldUUID = worldUUID;
		this.locations = [{x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}];
	}

}
