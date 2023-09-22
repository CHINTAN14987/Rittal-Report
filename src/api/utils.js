
import { validateCpath } from '../utils/validate';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';


const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_PATH || '../api' });

export const createAxiosBaseQuery = () => async (args, api, extraOptions) => {
    const config = validateCpath(); 

  const headers = {
    'Content-Type': 'application/json',
    'TerritoryBased': config.system_type,
    'LeadTerritoryBased': config.lead_territory_based,
    'Authorization': `Bearer ${config.api_token}`,
    'SalesColumn': config.SalesColumn,
    'Report-Date': moment(config.date).format('YYYY-MM-DD'),
    'ForwardBased': config.forward_based,
    'SystemId': config.system_id,
    ...args.headers,
  };

  // Add other common headers or interceptors as needed

  // Example: Intercept and handle errors globally
  const response = await baseQuery(args, api, extraOptions);
  if (response.error) {
    // Handle errors here
  }

  return response;
};
