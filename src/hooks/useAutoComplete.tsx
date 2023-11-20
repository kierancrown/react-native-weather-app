import {useEffect, useState} from 'react';
import {API_KEY, API_URL, API_HOST} from '@env';
import axios, {AxiosError} from 'axios';

const useAutoComplete = (query: string) => {
  const [results, setResults] = useState<AutoCompleteResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const performRequest = async () => {
      setLoading(true);
      const options = {
        method: 'GET',
        url: `${API_URL}/search.json`,
        params: {q: query},
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      };

      try {
        const response = await axios.request<AutoCompleteResult[]>(options);
        setResults(response.data);
      } catch (e) {
        // Would normally log to an error to Sentry or similar
        const error = e as AxiosError;
        console.error(error);
        setResults([]);
      }
      setLoading(false);
    };
    performRequest();
  }, [query]);

  return {results, loading};
};

export {useAutoComplete};
