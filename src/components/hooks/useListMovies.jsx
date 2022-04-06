import { useContext } from 'react';

import Context from './context/Context';

const useListMovies = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
}

export default useListMovies;