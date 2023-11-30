
export type TPoint = {
	x: number
	y: number
}
export const IntersectCircleLine = (
	center: TPoint,
	radius: number,
	p1: TPoint,
	p2: TPoint
) => {
	const x01 = p1.x - center.x;
	const y01 = p1.y - center.y;
	const x02 = p2.x - center.x;
	const y02 = p2.y - center.y;

	const dx = x02 - x01;
	const dy = y02 - y01;

	const a = dx * dx + dy * dy;
	const b = 2.0 * (x01 * dx + y01 * dy);
	const c = x01 * x01 + y01 * y01 - radius * radius;

	if (-b < 0) return (c < 0);
	if (-b < (2.0 * a)) return (4.0 * a * c - b * b < 0);
	return (a + b + c < 0);
}