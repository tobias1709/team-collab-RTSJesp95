document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.querySelector('#loadingscreen').style.marginTop="-100vh";
		document.querySelector('#wrapper').style.display="block";
	}, 2000);
	
	console.log("test");
});