class Score {

	// 0;fowwo;419d1977-7429-4d4a-ae0b-51691854d707;0;2900,7700,11450,15400,21900;1595545305340
	constructor(name, uuid, courseID, splits, date) {
		this.name = name;
		this.uuid = uuid;
		this.courseID = courseID;
		this.splits = splits;
		this.date = date;
		this.replay = null;
	}

	getTime() {
		return this.splits[this.splits.length - 1];
	}
	getSplitDuration(index) {
		if (index > 0) {
			return this.splits[index] - this.splits[index - 1];
		}
		return this.splits[index];
	}

	compareTo(that) {
		let result = Score.compareByTime(this, that);
		if (result == 0) {
			return Score.compareByDate(this, that);
		}
		return result;
	}
	static compareByTime(score1, score2) {
		let a = score1.getTime();
		let b = score2.getTime();
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	}
	static compareByDate(score1, score2) {
		let a = score1.date;
		let b = score2.date;
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	}
	static compareBySplit(score1, score2, index) {
		let a = score1.splits[index];
		let b = score2.splits[index];
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	}
	static compareBySplitDuration(score1, score2, index) {
		let a = score1.getSplitDuration(index);
		let b = score2.getSplitDuration(index);
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	}

}
