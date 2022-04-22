import IRate from "./Rate";

export default interface ISong {
    uri: string;
    img: string;
    title: string;
    artist: string;
    rating: number[]
    id: number;
}

export interface IRatedSong extends ISong {
    rate: IRate;
}