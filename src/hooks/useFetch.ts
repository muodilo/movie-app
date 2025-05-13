import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
  ratingsSummary?:{aggregateRating:string}
}

interface MovieApiResponse {
  results: Movie[];
}

const useFetch = (listType: string, page = 1) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const options = {
          method: "GET",
          url: `${import.meta.env.VITE_BASE_URL}/titles`,
          params: {
            startYear: '2015',
            info: "base_info",
            list: listType,
            page: currentPage.toString(),
          },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
          },
        };

        const response = await axios.request<MovieApiResponse>(options);
        setData(response.data.results);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listType, currentPage]);

  return { data, loading, error, page: currentPage, setPage: setCurrentPage };
};

export default useFetch;
