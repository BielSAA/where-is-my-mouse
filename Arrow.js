/**
 * Creates an Arrow
 *
 * @constructor
 * @this  {Arrow}
 * @param {(Vector2|undefined)} position  Position of the arrow
 * @param {(Vector2|undefined)} direction Vector to copy direction and size
 */
function Arrow(position, direction, color) {
	this.position  = position  || new Vector2();
	this.direction = direction || new Vector2();
	this.speed = 1;
	this._oneMinusSpeed = 0;
	this.color = color || "#FFF";

	if(!(this.position instanceof Vector2))
		throw new TypeError("position must be a Vector2");
	if(!(this.direction instanceof Vector2))
		throw new TypeError("direction must be a Vector2");
}

/**
 * Sets this arrow's speed for the .move method
 * 
 * @this   {Arrow}
 * @param  {Number} speed new speed
 * @return {Arrow}     Returns itself for chaining
 */
Arrow.prototype.setSpeed = function(speed) {
	if(typeof speed != "number")
		throw new TypeError("speed must be a number");
	if(speed < 0 || speed > 1)
		throw new RangeError("speed must be between 0 and 1");

	this.speed = speed;
	this._oneMinusSpeed = 1 - speed;

	return this;
};

/**
 * Moves arrow to `pos`
 *
 * @this   {Arrow}
 * @param  {Vector2} pos Position to be moved to
 * @return {Arrow}     Returns itself for chaining
 */
Arrow.prototype.move = function(pos) {
	if(!(pos instanceof Vector2))
		throw new TypeError("pos must be a Vector2");

	let currentPosition = this.position,
		   nextPosition = pos.clone();

	currentPosition.scale(this._oneMinusSpeed);
	nextPosition.scale(this.speed);

	currentPosition.add(nextPosition);

	return this;
};

/**
 * Teleports arrow to `pos`
 *
 * @this   {Arrow}
 * @param  {Vector2} pos Position to be teleported to
 * @return {Arrow}     Returns itself for chaining
 */
Arrow.prototype.teleport = function(pos) {
	this.position.copyFrom(pos);

	return this;
};

/**
 * Keeps arrow's size but makes it point to `pos`
 * 
 * @this   {Arrow}
 * @param  {Vector2} pos Position to point to
 * @return {Arrow}     Returns itself for chaining
 */
Arrow.prototype.point = function(pos) {
	if(!(pos instanceof Vector2))
		throw new TypeError("pos must be a Vector2");

	let size = this.direction.mag();
	let newDirection = pos.clone().sub(this.position) // Now it's a vector from `this.position` to `pos`
			.normalise().scale(size);                 // Now it has the original length

	this.direction.copyFrom(newDirection);

	return this;
};

/**
 * Draws `this` on canvas context `ctx`
 * 
 * @this   {Arrow}
 * @param  {CanvasRenderingContext2D} ctx canvas context to draw `this` into
 * @return {Arrow}     Returns itself for chaining
 */
Arrow.prototype.draw = function(ctx) {
	let tail = this.position,
		tip  = this.position.clone().add(this.direction),
		tipA = this.direction.clone().rotate(195).normalise().scale(10).add(tip),
		tipB = this.direction.clone()  // Direction of the arrow
				.rotate(165)           // Rotated a bit
				.normalise().scale(10) // 10px long
				.add(tip);             // Starting in the tip

	ctx.save();

	ctx.strokeStyle = this.color;
	ctx.lineWidth   = 3;
	ctx.lineCap     = "round";
	ctx.lineJoin    = "round";

	ctx.beginPath();
	ctx.moveTo(tail.x, tail.y);
	ctx.lineTo(tip.x,  tip.y);
	ctx.lineTo(tipA.x, tipA.y);
	ctx.moveTo(tipB.x, tipB.y);
	ctx.lineTo(tip.x,  tip.y);
	ctx.stroke();

	ctx.restore();

	return this;
};
