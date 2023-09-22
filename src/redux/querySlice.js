import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { validateCpath } from "../utils/index";
// import base64 from 'base-64';
const REACT_APP_API_PATH = "https://rittal-interlynx.com/srv/api";

const NEW_API_PATH =
  process.env.NODE_ENV === "development" ? REACT_APP_API_PATH : "../api";

// Create a base query using fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_PATH,
});
const getManagerRepport = () => {
  let { mailType, system_type, id } = config;
  let report_manager = {};
  mailType = mailType ? mailType.toLocaleLowerCase() : "";

  if (mailType !== "management") {
    if (system_type === "territory" && mailType === "dist") {
      report_manager = { report_dist: id };
    } else {
      report_manager = { report_manager: id };
    }
  }
  return { ...report_manager };
};
const dateFormatter = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

console.log(process.env.REACT_APP_API_PATH);
// https://rittal-interlynx.com/srv/api/pos/categary
const config = validateCpath();
const formattedData = (newItem) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const transformed = {};
  for (let key in newItem) {
    if (newItem.hasOwnProperty(key)) {
      if (typeof newItem[key] === "string") {
        let newKey = key
          ?.replace(/_/g, " ")
          ?.split(" ")
          ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        transformed[newKey] = newItem[key].replace(urlPattern, "").trim();
      }
      if (
        typeof newItem[key] === "object" &&
        Object.keys(newItem[key])?.length
      ) {
        transformed[key] = formattedData(newItem[key]);
      }
    }
  }
  return transformed;
};
const checkDataHasUrl = (data) => {
  const modifiedData = data?.map((item) => {
    const newItem = { ...item };
    return formattedData(newItem);
  });
  return modifiedData;
};
// const config = validateCpath();

// const headers = {
//     'Content-Type': 'application/json',
//     'TerritoryBased': config.system_type,
//     'LeadTerritoryBased': config.lead_territory_based,
//     'Authorization': ` Bearer ${config.api_token}`,
//     'SalesColumn': config.SalesColumn,
//     'Report-Date': dateFormatter(config.date),
//     'ForwardBased': config.forward_based,
//     "SystemId": config.system_id

// }
// Define your API using createApi
let detailedFilter = null;
export const api = createApi({
  reducerPath: "reportQuery",
  baseQuery,
  endpoints: (builder) => ({
    // getManagerReport: builder.query({
    //   query: () => {
    //     const config = validateCpath();
    //     return {
    //       url: 'your_endpoint_for_manager_report', // Replace with the actual endpoint
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'TerritoryBased': config.system_type,
    //         'LeadTerritoryBased': config.lead_territory_based,
    //         'Authorization': `Bearer ${config.api_token}`,
    //         'SalesColumn': config.SalesColumn,
    //         'Report-Date': moment(config.date).format('YYYY-MM-DD'),
    //         'ForwardBased': config.forward_based,
    //         'SystemId': config.system_id,
    //       },
    //     };
    //   },
    // }),

    getFieldsObject: builder.query({
      query: (filePath) => `${filePath}.json`,
    }),

    getTabsTooltipContent: builder.query({
      query: () => "tabs.json", // Replace with the actual endpoint
    }),

    getServerNav: builder.query({
      query: () => `${NEW_API_PATH}/navigation/json`, // Replace with the actual endpoint
    }),

    getDrapDrop: builder.query({
      query: () => "drop-drag.json", // Replace with the actual endpoint
    }),
    getHeadersData: builder.query({
      query: () => ({
        url: `${NEW_API_PATH}/pos/categary`,
        headers: {
          Authorization: "Bearer a689b41cf3357b23a757ea2fe5cf2689",
        },
      }),
    }),
    getDetailedReport: builder.query({
      query: () => ({
        url: `https://rittal-interlynx.com/srv/api/detailed?&s=2023-08-06&e=2023-08-12&page=1&search_field=`,
        headers: {
          Authorization: "Bearer a689b41cf3357b23a757ea2fe5cf2689",
        },
      }),
      transformResponse: (response) => {
        const transformedData = checkDataHasUrl(response.data);
        return transformedData;
      },
    }),

    // sendEmail: builder.query({
    //   query: (params) => ({
    //     url: `${API_PATH}/otp/send`,
    //     method: 'GET',
    //     headers: {
    //       ...params.headers,
    //       'SecFetchGo': base64.encode(params.emailtext),
    //     },
    //   }),
    // }),

    // // getDashboard: builder.query({
    // //   query: (params) => {
    // //     const prirMonth = getPrirMnt();
    // //     if (dashboardCall) {
    // //       dashboardCall.cancel();
    // //     }
    // //     dashboardCall = axios.CancelToken.source();
    // //     return {
    // //       url: `${NEW_API_PATH}/${params.slug}`,
    // //       method: 'GET',
    // //       params: {
    // //         s: dateFormatter(params.startDate),
    // //         e: dateFormatter(params.endDate),
    // //         ...prirMonth,
    // //       },
    // //       headers,
    // //       cancelToken: dashboardCall.token,
    // //     };
    // //   },
    // // }),

    // // getHomePage: builder.query({
    // //   query: (params) => {
    // //     if (call) {
    // //       call.cancel();
    // //     }
    // //     call = axios.CancelToken.source();
    // //     const prirMonth = getPrirMnt();
    // //     return {
    // //       url: `${NEW_API_PATH}/overview`,
    // //       method: 'GET',
    // //       params: {
    // //         s: prirMonth.ms,
    // //         e: prirMonth.me,
    // //       },
    // //       headers,
    // //       cancelToken: call.token,
    // //     };
    // //   },
    // }),
  }),
});

// Export generated hooks
export const { useGetHeadersDataQuery, useGetDetailedReportQuery } = api;
