const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const GenresId = selectedGenres.map((item) => item.id);
    return GenresId.reduce((acc, curr) => acc + ',' + curr, '');
};

export default useGenres;