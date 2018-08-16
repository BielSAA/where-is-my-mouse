/**
 * Creates an Arrow
 *
 * @constructor
 * @this  {Arrow}
 * @param {(Vector2|undefined)} position  Position of the arrow
 * @param {(Vector2|undefined)} direction Vector to copy direction and size
 */
function Arrow(position, direction) {
	this.position  = position  || new Vector2();
	this.direction = direction || new Vector2();
	this.speed = 1;
	this._oneMinusSpeed = 0;

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
	let currentPosition = this.pos,
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
	this.pos.copyFrom(pos);

	return this;
};
