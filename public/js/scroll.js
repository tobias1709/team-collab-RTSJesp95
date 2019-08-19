document.addEventListener('DOMContentLoaded', () => {
	let navbar = document.querySelectorAll('.menuBar li');
	let navIndex = 0;

	for(let i=0; i<navbar.length; i++){
		navbar[i].addEventListener('click', () => {
			let valueInVh = i*100;
			navIndex = i;
			window.scroll(0, valueInVh * window.innerHeight/100);
			for(let x=0; x<navbar.length; x++){
				navbar[x].classList.remove("active");
			}
			navbar[i].classList.add("active");
		})
	}

	// let animation = false;
	// window.onscroll = (e) => {
	// 	if(this.oldScroll > this.scrollY){
			
	// 		console.log("test2)");
	// 	}
	// 	else if(this.oldScroll < this.scrollY){
	// 		if(animation == false){
	// 			navIndex++;
	// 			window.scroll(0, navIndex*100 * window.innerHeight/100);
	// 			animation = true;
	// 		}
	// 		animation = false;
	// 	}
	// 	this.oldScroll = this.scrollY;
	// }
});