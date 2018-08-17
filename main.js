$(() => {
	const canvas = document.getElementById("mouse"),
			 ctx = canvas.getContext("2d");

	const BACKGROUND_COLOR = "#000", // Color of the page background
		  ARROW_DISTANCE   = 250,
		  ARROW_SIZE       = 100,
		  ARROW_SPEED      = 0.02,
		  ARROW_ROTATION   = 0.02,
		  MOUSE_PUSH       = 7;

	const ARROW_DISTANCE_SQ = ARROW_DISTANCE * ARROW_DISTANCE;

	const mouse = new Vector2(-1e3, -1e3), // Starting mouse far from screen
		  arrow = new Arrow().setSpeed(ARROW_SPEED);  // Starting arrow
	window.arrow = arrow;

	let rotation = 0; // Rotation of the arrow

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

		// Updating rotation
		rotation = (rotation + ARROW_ROTATION) % (Math.PI * 2);

		// Moving arrow
		let rotationVector = new Vector2(Math.cos(rotation), Math.sin(rotation)) // Magnitude 1
				.scale(ARROW_DISTANCE);                                          // Magnitude ARROW_DISTANCE
		let targetPosition = mouse.clone().add(rotationVector);
		arrow.move(targetPosition);

		// "Colliding" with border
		if(arrow.position.x < 0)
			arrow.position.x = 0;
		else if(arrow.position.x > canvas.width)
			arrow.position.x = canvas.width;

		if(arrow.position.y < 0)
			arrow.position.y = 0;
		else if(arrow.position.y > canvas.height)
			arrow.position.y = canvas.height;

		// Shrinking and pushing arrow if inside mouse
		let mouseArrowDistanceSq = mouse.clone().sub(arrow.position).magSq();
		if(mouseArrowDistanceSq < ARROW_SIZE * ARROW_SIZE){
			let distance = Math.sqrt(mouseArrowDistanceSq);
			arrow.direction.copyFrom(new Vector2(0, distance)); // Shrink

			let pushVector = arrow.position.clone().sub(mouse).normalise()     // Vector from mouse to arrow (magnitude 1)
					.scale(MOUSE_PUSH * (ARROW_DISTANCE_SQ - mouseArrowDistanceSq) / ARROW_DISTANCE_SQ); // Magnitude that deppends on the distance
			arrow.position.add(pushVector);
		}else arrow.direction.copyFrom(new Vector2(0, ARROW_SIZE));

		//  Pointing to mouse drawing arrow
		arrow.point(mouse).draw(ctx);

		// Adding next frame to the queue
		requestAnimationFrame(drawFrame);
	}
	// First frame
	requestAnimationFrame(drawFrame);

	// Mouse moved, update mouse object
	$(window).on("mousemove", e => {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	});
});
