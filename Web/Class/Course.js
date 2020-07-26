class Course {
	
	//0;test;419d1977-7429-4d4a-ae0b-51691854d707;;bfa9b579-ec3f-4170-bdc0-23be13f78810;22.5;90;31.5;-99.5;15;9,10,11,12,13,14
	constructor(name, authorUUID, description, regions) {
		this.name = name;
		this.authorUUID = authorUUID;
		this.description = description;
		this.regions = regions;
		this.scores = [];
	}

}
