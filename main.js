$(() => {
	const canvas = document.getElementById("mouse"),
			 ctx = canvas.getContext("2d");

	const BACKGROUND_COLOR = "#000";

	function drawFrame() {
		if(canvas.width != $(window).innerWidth()
				|| canvas.height != $(window).innerHeight()){
			canvas.width = $(window).innerWidth();
			canvas.height = $(window).innerHeight();
		}

		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		requestAnimationFrame(drawFrame);
	}
	requestAnimationFrame(drawFrame);
});