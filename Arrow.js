/**
 * Creates an Arrow
 *
 * @constructor
 * @this  {Arrow}
 * @param {(Vector2|undefined)} pos  Position of the arrow
 * @param {(Number|undefined)} size Size of the arrow
 */
function Arrow(pos, size) {
	this.pos  = pos || new Vector2();
	this.size = Number(size) || 0;

	if(!(this.pos instanceof Vector2))
		throw new TypeError("pos must be a Vector2");
	if(isNaN(this.size))
		throw new TypeError("size must be a number");
}
