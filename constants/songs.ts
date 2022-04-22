import ISong from "../types/Song";

export default [
    {
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        img: 'https://350927.smushcdn.com/1388247/wp-content/uploads/2020/11/Unknown-Album-Cover-PP1.jpg?lossy=0&strip=1&webp=1',
        title: 'The Unknown',
        artist: 'Sound Eternity FX',
        rating: [5, 1, 3, 5, 4, 5, 2, 1, 2],
        id: 1
    },
    {
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        img: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/114/posts/34296/final_image/Final-image.jpg',
        title: 'Sweet Home',
        artist: 'Anarchy',
        rating: [5, 1, 3, 5, 4, 5, 2, 1, 2],
        id: 2,
    },
    {
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        img: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/37618e100194625.5f03b7eec6e1c.png',
        title: 'Ready To Die',
        artist: 'The Baby',
        rating: [5, 1, 3, 5, 4, 5, 2, 1, 2],
        id: 3
    }
] as ISong[]

export const avgRating = (rating: number[]) => rating.reduce((acc, curr) => acc + curr, 0) / rating.length;