import useRequest from './useRequest';
import { lunchSchema } from './schemas';

export const useHarald = () => {
    return useRequest('harald', '/api/lunch/harald', lunchSchema);
}
