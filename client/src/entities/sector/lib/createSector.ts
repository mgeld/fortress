import { getDestination } from './getDestination';

type TLatLong = [number, number];

export type TSectors = [
    TLatLong,
    TLatLong,
    TLatLong,
    TLatLong,
    TLatLong,
    TLatLong
];

export interface ICreateSector {
	lat_0: number
	long_0: number
	w_sector : number
}

export const createSector = (coords: ICreateSector): TSectors => {

	let { lat_0, long_0, w_sector } = coords;

	let [ lat_p1, long_p1 ] = getDestination(lat_0, long_0, w_sector, 30);
	let [ lat_p2, long_p2 ] = getDestination(lat_0, long_0, w_sector, 90);
	let [ lat_p3, long_p3 ] = getDestination(lat_0, long_0, w_sector, 150);
	let [ lat_p4, long_p4 ] = getDestination(lat_0, long_0, w_sector, 210);
	let [ lat_p5, long_p5 ] = getDestination(lat_0, long_0, w_sector, 270);
	let [ lat_p6, long_p6 ] = getDestination(lat_0, long_0, w_sector, 330);

	let sector_coords: TSectors = [
		[ +lat_p1.toFixed(6), +long_p1.toFixed(6) ],
		[ +lat_p2.toFixed(6), +long_p2.toFixed(6) ],
		[ +lat_p3.toFixed(6), +long_p3.toFixed(6) ],
		[ +lat_p4.toFixed(6), +long_p4.toFixed(6) ],
		[ +lat_p5.toFixed(6), +long_p5.toFixed(6) ],
		[ +lat_p6.toFixed(6), +long_p6.toFixed(6) ]
	];

	return sector_coords;

}