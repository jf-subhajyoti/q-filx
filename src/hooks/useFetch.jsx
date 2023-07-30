import { useEffect, useState } from "react";

import { getDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setData(null);
        setError(null);
        
        getDataFromApi(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;