import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

export const NalkaOnPitkaProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
   return (
     <QueryClientProvider client={queryClient}>
       {children}
     </QueryClientProvider>
   )
 }
