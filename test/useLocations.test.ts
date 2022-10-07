import 'whatwg-fetch';
import _react from 'react';
import { renderHook, waitFor } from '@testing-library/react'

import { NalkaOnPitkaProvider, useLocations } from '../src';

describe('useLocations', () => {
  it('fetches data from server', async () => {
    const { result } = renderHook(() => useLocations(), { wrapper: NalkaOnPitkaProvider });

    await waitFor(() => {
        expect(result.current.isFetched).toBeTruthy();
    });

    expect((result.current.data?.length ?? 0) > 0).toBeTruthy();
  });
});
