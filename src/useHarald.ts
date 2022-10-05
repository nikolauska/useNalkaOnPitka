import useRequest from './useRequest';
import { lunchSchema } from './schemas';

export const useHarald = async () => {
    return useRequest('/api/harald', lunchSchema);
}
