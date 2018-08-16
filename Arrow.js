/**
 * Creates an Arrow
 *
 * @constructor
 * @this  {Arrow}
 * @param {(Vector2|undefined)} pos  Position of the arrow
 * @param {(Number|undefined)} size Size of the arrow
 */
function Arrow(pos, size) {
	this.pos   = pos || new Vector2();
	this.size  = Number(size) || 0;
	this.speed = 1;
	this._oneMinusSpeed = 0;

	if(!(this.pos instanceof Vector2))
		throw new TypeError("pos must be a Vector2");
	if(isNaN(this.size))
		throw new TypeError("size must be a number");
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
