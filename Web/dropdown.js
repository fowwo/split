var dropdown = document.getElementsByClassName("dropdown");
for (var i = 0; i < dropdown.length; i++) {
	dropdown[i].addEventListener("click", function() {
		this.classList.toggle("dropdown-active");
		let content = this.nextElementSibling;
		let parent = this.parentElement;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
			while (parent.classList.contains("dropdown-content-container")) {
				parent.style.maxHeight = `${parent.scrollHeight - content.scrollHeight}px`;
				parent = parent.parentElement;
			}
		} else {
			content.style.maxHeight = `${content.scrollHeight}px`;
			while (parent.classList.contains("dropdown-content-container")) {
				parent.style.maxHeight = `${parent.scrollHeight + content.scrollHeight}px`;
				parent = parent.parentElement;
			}
		}
	});
}
