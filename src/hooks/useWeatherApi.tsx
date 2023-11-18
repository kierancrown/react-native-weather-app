import {useEffect, useState} from 'react';
import {API_KEY, API_URL, API_HOST} from '@env';
import axios from 'axios';

const useAutoComplete = (query: string) => {
  const [results, setResults] = useState<AutoCompleteResult[]>([]);

  useEffect(() => {
    const performRequest = async () => {
      const options = {
        method: 'GET',
        url: `${API_URL}search.json`,
        params: {q: query},
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      };

      try {
        const response = await axios.request<AutoCompleteResult[]>(options);
        setResults(response.data);
      } catch (error) {
        // Would normally log to an error to Sentry or similar
        console.error(error);
        setResults([]);
      }
    };
    performRequest();
  }, [query]);

  return results;
};

export {useAutoComplete};
