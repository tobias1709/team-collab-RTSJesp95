document.addEventListener('DOMContentLoaded', () => {
	let navbar = document.querySelectorAll('.menuBar li');

	for(let i=0; i<navbar.length; i++){
		navbar[i].addEventListener('click', () => {
			let valueInVh = i*100;
			window.scroll(0, valueInVh * window.innerHeight/100);
			for(let x=0; x<navbar.length; x++){
				navbar[x].classList.remove("active");
			}
			navbar[i].classList.add("active");
		})
	}
});