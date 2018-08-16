/**
 * Creates a 2D vector
 *
 * @constructor
 * @this {Vector2}
 * @param {(Number|undefined)} x X coord
 * @param {(Number|undefined)} y Y coord
 */
function Vector2(x, y) {
	this.x = Number(x) || 0;
	this.y = Number(y) || 0;

	if(isNaN(this.x) || isNaN(this.y))
		throw new TypeError("X and Y must be numbers");
}

/**
 * Returns a new 2D vector identical to the first one
 *
 * @this {Vector2}
 * @return {Vector2} New 2D vector
 */
Vector2.prototype.clone = function() {
	return new Vector2(this.x, this.y);
};

/**
 * Keeps vector orientation but makes is `factor` times bigger
 *
 * @this   {Vector2}
 * @param  {Number} factor Amount to scale the vector
 * @return {Vector2}        Returns itself for chaining
 */
Vector2.prototype.scale = function(factor) {
	if(typeof factor !== "number")
		throw new TypeError("factor must be a number");

	this.x *= factor;
	this.y *= factor;

	return this;
};

/**
 * Adds `vector` to `this`
 *
 * @this  {Vector2}
 * @param {Vector2} vector vector to be added
 * @return {Vector2}        Returns itself for chaining
 */
Vector2.prototype.add = function(vector) {
	if(!(vector instanceof Vector2))
		throw new TypeError("vector must be a vector!");

	this.x += vector.x;
	this.y += vector.y;

	return this;
};

/**
 * Subtracts `vector` from `this`
 *
 * @this  {Vector2}
 * @param {Vector2} vector vector to be added
 * @return {Vector2}        Returns itself for chaining
 */
Vector2.prototype.sub = function(vector) {
	if(!(vector instanceof Vector2))
		throw new TypeError("vector must be a vector!");

	this.x -= vector.x;
	this.y -= vector.y;

	return this;
};

/**
 * Returns vector's magnitude squared
 *
 * @this   {Vector2}
 * @return {Number} magnitude squared
 */
Vector2.prototype.magSq = function() {
	return this.x * this.x + this.y * this.y;
};

/**
 * Returns vector's magnitude
 *
 * @this   {Vector2}
 * @return {Number} magnitude
 */
Vector2.prototype.mag = function() {
	return Math.sqrt(this.magSq());
};

/**
 * Keeps vector's orientation but makes it 1 unit big
 * 
 * @return {Vector2}        Returns itself for chaining
 */
Vector2.prototype.normalise = function() {
	let magnitude = this.mag();
	if(magnitude == 0)
		throw new Error("Can't normalise a null vector!");

	this.x /= magnitude;
	this.y /= magnitude;

	return this;
};

/**
 * Keeps vector's magnitude and rotates it `angle` degress
 * 
 * @param  {Number} angle Amount of degress to be rotated
 * @return {Vector2}        Returns itself for chaining
 */
Vector2.prototype.rotate = function(angle) {
	if(typeof angle !== "number")
		throw new TypeError("angle must be a number");

	let cosRY = Math.cos(angle * Math.PI / 180),
		sinRY = Math.sin(angle * Math.PI / 180),
		temp  = this.clone();

	this.x = (temp.x * cosRY) - (temp.y * sinRY);
	this.y = (temp.x * sinRY) + (temp.y * cosRY);

	return this;
};