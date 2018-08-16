$(() => {
	const canvas = document.getElementById("mouse"),
			 ctx = canvas.getContext("2d");

	const BACKGROUND_COLOR = "#000"; // Color of the page background

	/**
	 * Draws a frame and adds the next one to the quere (requestAnimationFrame)
	 */
	function drawFrame() {
		// Checking if it's different before updating because canvas.width and canvas.height are setters
		if(canvas.width != $(window).innerWidth()
				|| canvas.height != $(window).innerHeight()){
			canvas.width = $(window).innerWidth();
			canvas.height = $(window).innerHeight();
		}

		// Clearing the canvas by filling it with the BACKGROUND_COLOR
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Adding next frame to the queue
		requestAnimationFrame(drawFrame);
	}
	// First frame
	requestAnimationFrame(drawFrame);
});