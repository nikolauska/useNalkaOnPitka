import 'whatwg-fetch';
import _react from 'react';
import { renderHook, waitFor } from '@testing-library/react'

import { NalkaOnPitkaProvider, useHarald } from '../src';

describe('useHarald', () => {
  it('fetches data from server', async () => {
    const { result } = renderHook(() => useHarald(), { wrapper: NalkaOnPitkaProvider });

    await waitFor(() => {
      expect(result.current.isFetched).toBeTruthy();
    }, { timeout: 5000 });

    expect(result.current.data?.monday).not.toBeUndefined;
  });
});
