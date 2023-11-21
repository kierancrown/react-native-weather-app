import {useCallback, useEffect, useState} from 'react';
import {API_KEY, API_URL, API_HOST} from '@env';
import axios, {AxiosError} from 'axios';
import {ForecastResult} from '../types/api';
import {Alert} from 'react-native';

const useForecast = (query: string) => {
  const [result, setResult] = useState<ForecastResult>();
  const [loading, setLoading] = useState(false);

  const performRequest = useCallback(async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: `${API_URL}/forecast.json`,
      params: {q: query, days: 3},
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    try {
      const response = await axios.request<ForecastResult>(options);
      console.log(JSON.stringify(response.data.forecast.forecastday, null, 2));
      setResult(response.data);
    } catch (e) {
      // Would normally log to an error to Sentry or similar
      const error = e as AxiosError;
      Alert.alert('Error', error.message);
      setResult(undefined);
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setResult(undefined);
      return;
    }

    performRequest();
  }, [performRequest, query]);

  return {result, loading, refetch: performRequest};
};

export {useForecast};
