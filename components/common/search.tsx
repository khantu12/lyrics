'use client';

import { useCallback, useState } from 'react';
import { Input } from '../ui/input';
import { debounce } from 'lodash';
import axios from 'axios';

export const Search = () => {
  const [result, setResult] = useState([]);
  console.log(1111, result);

  const search = debounce(async (query: string) => {
    const res = await axios.get('/api/search', {
      params: {
        query,
      },
    });
    setResult(res.data);
  }, 1000);

  const debouncedCallback = useCallback((query: string) => search(query), []);

  return (
    <Input
      placeholder="Search songs, artists, or lyrics..."
      onChange={(event) => {
        debouncedCallback(event.target.value);
      }}
    />
  );
};
