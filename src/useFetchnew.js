import React, { useState, useEffect } from "react";

function useFetchnew(url, time) {
  const [data, setData] = useState(null); // will be assigned the data fetched from API
  const [error, setError] = useState(null); // will be an error message if we have any
  const [isPending, setIsPending] = useState(true); // will be a loading state if there is a delay in API response

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error(
            "The source of the API is not available right now, please wait. res != ok"
          );
        }
        const data = await res.json();
        setData(data);
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch has been aborted!");
        } else {
          setError(error.message); // Corrected the typo from `massage` to `message`
          setIsPending(false);
        }
      }
    };

    const timer = setTimeout(fetchData, time);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [url, time]);

  return { data, isPending, error };
}

export default useFetchnew;
