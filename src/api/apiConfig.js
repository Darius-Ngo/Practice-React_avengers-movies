const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '8e793215b8fc93fb3e3312432f9a76e8',
    originnalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    getStreamMovie: (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`,
    getStreamTv: (id, season, episode) => `https://www.2embed.ru/embed/tmdb/tv?id=${id} ID&s=${season}&e=${episode}`,
}

export default apiConfig;