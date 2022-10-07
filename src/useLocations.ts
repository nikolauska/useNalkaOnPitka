import useRequest from './useRequest';
import { locationSchema } from './schemas';

export const useLocations = () => {
    return useRequest('locations', '/api/lunch', locationSchema);
}
