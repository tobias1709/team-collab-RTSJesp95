document.addEventListener('DOMContentLoaded', () => {
	
	let navbar = document.querySelectorAll('.menuBar li');

	for(let i=0; i<navbar.length; i++){
		navbar[i].addEventListener('click', () => {
			let valueInVh = i*100;
			navIndex = i;
			window.scroll(0, valueInVh * window.innerHeight/100);
		})
	}

	window.addEventListener('scroll', () => {
		console.log(window.scrollY, window.innerHeight*3-window.innerHeight/2);
		if(window.scrollY >= 0){
			for(let i=0; i<navbar.length; i++){
				navbar[i].classList.remove("active");
			}
			navbar[0].classList.add("active");
		}
		if(window.scrollY >= window.innerHeight*1-window.innerHeight/2){
			for(let i=0; i<navbar.length; i++){
				navbar[i].classList.remove("active");
			}
			navbar[1].classList.add("active");
		}
		if(window.scrollY >= window.innerHeight*2-window.innerHeight/2){
			for(let i=0; i<navbar.length; i++){
				navbar[i].classList.remove("active");
			}
			navbar[2].classList.add("active");
		}
		if(window.scrollY >= window.innerHeight*3-window.innerHeight/2){
			for(let i=0; i<navbar.length; i++){
				navbar[i].classList.remove("active");
			}
			navbar[3].classList.add("active");
		}
	});

	// let animation = false;
	// window.addEventListener('scroll', (e) => {
	// 	let scrollNow = window.scrollY;
	// 	if(window.scrollY > 0){
	// 		e.preventDefault();
	// 		console.log("test2)");
	// 		window.scrollTo({
	// 			left: 0, 
	// 			top: window.innerHeight*1, 
	// 			behavior: 'smooth'
	// 		});
	// 	}
	// });
});