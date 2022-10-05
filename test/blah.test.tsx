import 'whatwg-fetch';
import _react from 'react';
import { renderHook } from '@testing-library/react-hooks'

import { useHarald } from '../src';

describe('it', () => {
  it('renders without crashing', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHarald());

    console.log(result.current);

    await waitForNextUpdate({ timeout: 10000 });

    console.log(result.current);

    await waitForNextUpdate();

    console.log(result.current);
  });
});
