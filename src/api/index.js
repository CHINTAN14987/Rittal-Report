import axios from 'axios';
import moment from 'moment';
// import { polyfill } from 'es6-promise'
// import $ from 'jquery';
import { validateCpath } from '../utils/validate';
import { isObject } from 'lodash';
// import base64 from 'base-64'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import moment from 'moment';

const API_PATH = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_PATH : '../api';
const NEW_API_PATH = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_PATH : '../api';



const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_PATH || '../api' });

const createAxiosBaseQuery = () => async (args, api, extraOptions) => {
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

const getManagerRepport = () => {
    let { mailType, system_type, id } = config;
    let report_manager = {};
    mailType = mailType ? mailType.toLocaleLowerCase() : "";

    if (mailType !== 'management') {
        if (system_type === 'territory' && mailType === 'dist') {
            report_manager = { "report_dist": id }
        } else {
            report_manager = { "report_manager": id }
        }
    }
    return { ...report_manager };
}
const dateFormatter = (date) => {
    return moment(date).format("YYYY-MM-DD");
}



const headers = {
    'Content-Type': 'application/json',
    'TerritoryBased': config.system_type,
    'LeadTerritoryBased': config.lead_territory_based,
    'Authorization': ` Bearer ${config.api_token}`,
    'SalesColumn': config.SalesColumn,
    'Report-Date': dateFormatter(config.date),
    'ForwardBased': config.forward_based,
    "SystemId": config.system_id


}

polyfill();
const getDateRangeType = () => {
    const content = $(".date-range-toggle").html();
    if (content) {
        return content.split("<")[0];
    }

    return "Prior Month"

}
// const getPrirMnt = () => {
//     const endDate = config.pos_date;
//     return { ms: dateFormatter(moment(endDate).startOf("month")), me: dateFormatter(moment(endDate).endOf("month")) }
// }


let hierarchy = null;
let call = null;
let nestedCall = null;
let dashboardCall = null;
let detailedFilter = null;
let detailedCall = null;
let chartCall = null;
let brandFilter = null;
let mapData = null;
axios.defaults.params = getManagerRepport();
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {

        //NotificationManager.error('Oops, something went wrong...');
    }
    return Promise.reject(error);
});

polyfill();
export default {

    exportDataById(id, slug) {
        window.open( `${NEW_API_PATH}/${slug.replace(/[_]/g, '/')}/export/${id}?api_token=${config.api_token}` )
    },

    getFieldsObject(filePath) {
        return axios.get(`${filePath}.json`)
        .then(resp => resp.data);
    },

    getTabsTooltipContent() {
        return axios.get(`tabs.json`, {
            headers
        })
            .then(resp => resp.data);
    },
    getServerNav() {
        return axios.get(`${NEW_API_PATH}/navigation/json`, {
            headers
        })
            .then(resp => resp.data);
    },
    getDrapDrop() {
        return axios.get(`drop-drag.json`, {
            headers
        })
            .then(resp => resp.data);
    },
    sendEmail(id, emailtext, mailType, contactID) {
        headers['SecFetchGo'] = base64.encode(emailtext);
        return axios.get(`${API_PATH}/otp/send`, { headers })
            .then(resp => resp.data);
    },

    getDashboard(report_manager, cpath_mailType, endDate, startDate, brand, slug, system_type) {
        const prirMonth = getPrirMnt();
        if (dashboardCall) {
            dashboardCall.cancel()
        }
        dashboardCall = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${slug}?${brand}`, {
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                ...prirMonth
            },
            headers,
            cancelToken: dashboardCall.token
        })
            .then(resp => {
                dashboardCall = null;
                return resp.data
            });
    },
    getHomePage(cpath_date, cpath_id, cpath_mailType, endDate, startDate) {
        if (call) {
            call.cancel();
        }
        call = axios.CancelToken.source();
        const prirMonth = getPrirMnt();
        return axios.get(`${NEW_API_PATH}/overview`, {
            params: {
                s: prirMonth.ms,
                e: prirMonth.me
            },
            headers,
            cancelToken: call.token
        })
            .then(resp => {
                call = null;
                return resp.data
            });
    },

    getDetailedReport(report_manager, cpath_mailType, endDate, filters, startDate, nextSlug, page, system_type, q, brandFilter, search_field, sortingObj, paylaod = {}) {
        q = isObject(q) ? q : { q };
        if (detailedCall) {
            detailedCall.cancel();
        }
        detailedCall = axios.CancelToken.source();
        report_manager = cpath_mailType.toLocaleLowerCase() !== 'management' ? report_manager : null;
        return axios.get(`${NEW_API_PATH}/${nextSlug}?${filters}`, {
            cancelToken: detailedCall.token,
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                page,
                search_field: search_field,
                ...q,
                ...sortingObj,
                ...paylaod

            }
        }).then(resp => {
            detailedCall = null
            return resp.data
        });
    },

    getMapReport(report_manager, cpath_mailType, endDate, startDate, nextSlug, filters, system_type, searchText) {

        if (mapData) {
            mapData.cancel();
        }
        mapData = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${nextSlug}?${filters}`, {
            cancelToken: mapData.token,
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                q: searchText
            }
        })
            .then(resp => {
                mapData = null
                return resp.data
            });
    },


    getHeirarchyReport(report_manager, cpath_mailType, endDate, startDate, fileName, brand, system_type, lead_date_type = null, date_type, q, search_field) {

        if (hierarchy) {
            hierarchy.cancel();
        }
        const prirMonth = getPrirMnt();
        hierarchy = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${fileName}?${brand}`, {
            cancelToken: hierarchy.token,
            headers,
            params: {
                ...prirMonth,
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                lead_date_type,
                date_type,
                q,
                search_field: search_field
            }
        }).then(resp => resp.data);
    },

    getNestedReport(report_manager, cpath_mailType, endDate, startDate, fileName, brand, system_type, forward_parent, url_params = {}, lead_date_type = null, date_type, q, track_root) {
        nestedCall = axios.CancelToken.source();
        const prirMonth = getPrirMnt();
        return axios.get(`${NEW_API_PATH}/${fileName}?${brand}`, {
            cancelToken: nestedCall.token,
            headers,
            params: {
                ...prirMonth,
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                forward_parent,
                ...url_params,
                lead_date_type,
                date_type,
                q,
                track_root
            }
        })
            .then(resp => resp.data);
    },
    getValidateOtp(value) {
        value = value.trim();
        return axios.post(`${API_PATH}/otp/${value}/validate`, {}, { headers })
            .then(resp => resp.data);
    },
    getLeadHistory(luid, token) {
        headers.Authorization = `Bearer ${token}`
        return axios.get(`${API_PATH}/lead/history/${luid}`, { headers })
            .then(resp => resp.data);
    },
    getQuoteHistory(luid, token) {
        headers.Authorization = `Bearer ${token}`
        return axios.get(`${API_PATH}/quote/history/${luid}`, { headers })
            .then(resp => resp.data);
    },
    getSearchDetailedReport(report_manager, cpath_mailType, hashKey, page, system_type, filter, module) {
        return axios.get(`${NEW_API_PATH}/${module}/handle/${hashKey}?${filter}`, {
            headers,
            params: {
                page

            }
        }).then(resp => resp.data);
    },

    getCompanyLogo(id) {
        return axios.get(`${NEW_API_PATH}/navigation/logo`, { id, headers })
            .then(resp => resp.data);
    },

    getSearchResult(slug, q, endDate, startDate, page, system_type, cpath_mailType, report_manager, filters, search_field) {

        return axios.get(`${NEW_API_PATH}/${slug}?${filters}`, {
            headers,
            params: {
                e: dateFormatter(endDate),
                s: dateFormatter(startDate),
                page,
                q,
                search_field: search_field,
            }
        })
            .then(resp => resp.data);

    },
    getDetailedReportFilter(slug, cpath_mailType, report_manager, parentSlug, system_type) {
        report_manager = getManagerRepport();
        if (detailedFilter) {
            detailedFilter.cancel();
        }
        detailedFilter = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${slug}`, {
            headers,
            params: { mailType: cpath_mailType, ...report_manager },
            cancelToken: detailedFilter.token

        }).then(resp => {
            detailedFilter = null
            return resp.data
        });
    },
    getMapFilter(report_manager, mailType, system_type) {
        return axios.get(`${API_PATH}/filter/detailed`, {
            headers,

        })
            .then(resp => resp.data);
    },

    getActivityFeed(report_manager, mailType) {
        return axios.get(`${NEW_API_PATH}/activity-feed`, {
            headers
        })
            .then(resp => resp.data);
    },
    getBrand(slug, cpath_mailType, report_manager, system_type, extraParams, searchtext = {}) {
        if (brandFilter) {
            brandFilter.cancel();
        }
        brandFilter = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${slug}`, {
            cancelToken: brandFilter.token,
            headers,
            params: { ...extraParams, ...searchtext }
        })
            .then(resp => {
                brandFilter = null
                return resp.data
            });
    },
    cancelNestedRequest() {
        if (nestedCall) {
            nestedCall.cancel();
            nestedCall = null
        }
    },

    getConfig(cpath) {
        return axios.get(`${NEW_API_PATH}/get_config/${cpath}`, {
            headers
        }).then(resp => resp.data);
    },
    getCustomDash(slug) {
        const priorM = getPrirMnt();
        return axios.get(`${NEW_API_PATH}/${slug}`, {
            headers,
            params: {
                ...priorM
            }
        }).then(resp => resp.data);
    },
    getChartReport(report_manager, cpath_mailType, endDate, filters, startDate, nextSlug) {

        if (chartCall) {
            chartCall.cancel();
        }
        chartCall = axios.CancelToken.source();
        report_manager = cpath_mailType.toLocaleLowerCase() !== 'management' ? report_manager : null;
        return axios.get(`${NEW_API_PATH}/${nextSlug}?${filters}`, {
            cancelToken: chartCall.token,
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate)

            }
        }).then(resp => {
            chartCall = null
            return resp.data
        });
    },
    getNestedData(slug, startDate, endDate) {
        const priorM = getPrirMnt();
        return axios.get(`${NEW_API_PATH}/${slug}`, {
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate)
            }
        }).then(resp => resp.data);
    },
    submitText(leadId, text) {
        return axios.post(`${API_PATH}/lead/screened/disagree/${leadId}`, { "disagree_reason": text }, { headers })
            .then(resp => resp.data);
    },
    addToCart(id, partnumber_id, delivery_time, quantity, list_price, distributor_id) {
        return axios.post(`${NEW_API_PATH}/inventory/exchange/cartUpsert`, { id, partnumber_id, delivery_time, quantity, list_price, distributor_id }, {
            headers
        }).then(resp => resp.data);
    },
    sendInquiries(listing) {
        return axios.post(`${NEW_API_PATH}/inventory/exchange/sendInquiry`, listing, {
            headers
        }).then(resp => resp.data);
    },

    getCartCount() {
        return axios.get(`${NEW_API_PATH}/inventory/exchange/getCartTotal`, {
            headers
        }).then(resp => resp.data);
    },
    deleteCartItem(item_id) {
        return axios.get(`${NEW_API_PATH}/inventory/exchange/deleteCartItem/${item_id}`, {
            headers
        }).then(resp => resp.data);

    },
    submitInquire(enquired_by, enquired_to, partnumber_id, quantity, comment, inventory_id) {
        return axios.post(`${NEW_API_PATH}/inventory/exchange/distributor_part_inquiry`, { enquired_by, enquired_to, partnumber_id, quantity, comment, inventory_id }, {
            headers
        }).then(resp => resp.data);
    },
    getNotificationCount() {
        return axios.get(`${NEW_API_PATH}/inventory/exchange/getSlugNoficationCount`, {
            headers
        }).then(resp => resp.data);
    },
    submitAction(params) {
        return axios.post(`${NEW_API_PATH}/inventory/exchange/update_dist_inquiry_status`, {
            ...params
        }, { headers }).then(resp => resp.data);
    },
    getSearchSuggestion(search) {
        return axios.get(`${NEW_API_PATH}/inventory/exchange/autocomplete/${search}`, { headers }).then(resp => resp.data);
    },
    updateWalkThrought(walkthrough_id) {
        return axios.post(`${NEW_API_PATH}/walkthrough`, { walkthrough_id }, { headers }).then(resp => resp.data);
    },
    getProduct(route, q, sorting, filterString = "") {
        return axios.get(`${NEW_API_PATH}/${route}?${filterString}`, { headers, params: { q, ...sorting } }).then(resp => resp.data);
    },

    getUserSaveSearches(route) {
        return axios.get(`${NEW_API_PATH}/${route}`, { headers }).then(resp => resp.data);
    },
    saveUserSaveSearches(payload, next) {
        return axios.post(`${NEW_API_PATH}/${next}`, { ...payload }, { headers }).then(resp => resp.data);
    },
    saveContactMyList(payload, next) {
        return axios.post(`${NEW_API_PATH}/${next}`, { ...payload }, { headers }).then(resp => resp.data);
    },
    getContactMyList(route) {
        return axios.get(`${NEW_API_PATH}/${route}`, { headers }).then(resp => resp.data);
    },
    deleteContactFromList(route, payload) {
        return axios.post(`${NEW_API_PATH}/${route}`, { ...payload }, { headers }).then(resp => resp.data);
    },
    deleteSaveSearch(route) {
        return axios.post(`${NEW_API_PATH}/${route}`, {}, { headers }).then(resp => resp.data);
    },
    updateSaveSearches(payload, next) {
        return axios.post(`${NEW_API_PATH}/${next}`, { ...payload }, { headers }).then(resp => resp.data);
    },

    getCurrency() {
        return axios.get(`${NEW_API_PATH}/pos/currency`, { headers }).then(resp => resp.data);
    },
    saveSalesplanning(route, props) {
        return axios.post(`${NEW_API_PATH}/${route}`, { ...props }, { headers }).then(resp => resp.data);
    },
    getData(url, page = 1) {
        return axios.get(`${NEW_API_PATH}/${url}`, { headers, params: { page } }).then(resp => resp.data);
    },

    getThreatsOpp(next) {
        return axios.get(`${NEW_API_PATH}/${next}`, { headers }).then(resp => resp.data);
    },
    applyPosTags(tagsProps, path) {
        return axios.post(`${NEW_API_PATH}/${path}/${tagsProps.id}`, { ...tagsProps }, { headers }).then(resp => resp.data);
    },
    submitQuoteText(quoteId, text) {
        return axios.post(`${API_PATH}/lead/screened/disagree/${quoteId}`, { "disagree_reason": text }, { headers })
            .then(resp => resp.data);
    },
    deleteOppsAndThreats(item) {
        return axios.post(`${API_PATH}/pos/threats/opportunities/dismiss`, { "custUniqueKey": `${item.id}`, "UID": `${item.__uidval}`, "DistAccNbr": `${item.__DistAccNbrval}`, "invoice_date": `${item.invoice_date}`, "source": `${item.source}` }, { headers }).then(resp => resp.data);
    },
    moveToFuturePotential(item, date, comment) {
        return axios.post(`${API_PATH}/pos/threats/opportunities/potential`, { data: { date: dateFormatter(date) }, comment, "custUniqueKey": `${item.id}`, "UID": `${item.__uidval}`, "DistAccNbr": `${item.__DistAccNbrval}`, "invoice_date": `${item.invoice_date}`, "source": `${item.source}` }, { headers }).then(resp => resp.data);
    },
    assignPerson(item, comment) {
        return axios.post(`${API_PATH}/pos/threats/opportunities/assign`, { "custUniqueKey": `${item.id}`, "UID": `${item.__uidval}`, "DistAccNbr": `${item.__DistAccNbrval}`, "invoice_date": `${item.invoice_date}`, "comment": comment, "source": `${item.source}` }, { headers }).then(resp => resp.data);
        return axios.post(`${API_PATH}/pos/threats/opportunities/dismiss`, { "custUniqueKey": `${item.id}`, "UID": `${item.__uid}`, "DistAccNbr": `${item.__DistAccNbr}`, "invoice_date": `${item.__invoice_date}` }, { headers }).then(resp => resp.data);
    },
    moveToFuturePotential(id, date, comment) {
        return axios.post(`${API_PATH}/pos/threats/opportunities/potential`, { data: { date: dateFormatter(date) }, comment, "custUniqueKey": `${id}` }, { headers }).then(resp => resp.data);
    },
    assignPerson(item, comment) {
        return axios.post(`${API_PATH}/pos/threats/opportunities/assign`, { "custUniqueKey": `${item.id}`, "UID": `${item.__uid}`, "DistAccNbr": `${item.__DistAccNbr}`, "invoice_date": `${item.__invoice_date}`, "comment": comment }, { headers }).then(resp => resp.data);
    },
    deleteSalesPerson(id) {
        return axios.delete(`${API_PATH}/salesperson/${id}`, { headers }).then(resp => resp.data);
    },
    editSalesPerson(id, firstName, lastName, email) {
        return axios.post(`${API_PATH}/salesperson/${id}`, { firstName, lastName, email }, { headers }).then(resp => resp.data);
    },
    addSalesPerson(firstName, lastName, email) {
        return axios.post(`${API_PATH}/salesperson`, { lastName, email, firstName }, { headers }).then(resp => resp.data);
    },
    getSalePerson() {
        return axios.get(`${API_PATH}/salespersons`, { headers }).then(resp => resp.data);
    },
    getHeadersData() {
        return axios.get(`${API_PATH}/pos/categary`, { headers }).then(resp => resp.data);
    },
    updateDisputeStatus(partNum) {
        return axios.get(`${API_PATH}/rebate/dispute/${partNum}`, { headers }).then(resp => resp.data);
    },
    // updateDisputeStatus(partNum) {
    //     return axios.get(`${API_PATH}/rebate/dispute/${partNum}`,{ headers }).then(resp => resp.data);
    // },

    getPaginationHeirarchyReport(report_manager, cpath_mailType, endDate, startDate, fileName, brand, system_type, lead_date_type = null, date_type, page, q, search_field, sortingObj) {

        if (hierarchy) {
            hierarchy.cancel();
        }

        const prirMonth = getPrirMnt();
        hierarchy = axios.CancelToken.source();
        return axios.get(`${NEW_API_PATH}/${fileName}?${brand}`, {
            cancelToken: hierarchy.token,
            headers,
            params: {
                ...prirMonth,
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                lead_date_type,
                date_type,
                search_field: search_field,
                q,
                ...sortingObj,
                page
            }
        }).then(resp => resp.data);
    },
    postContactItems(ids) {
        return axios.post(`${NEW_API_PATH}/contact/list/details/tocart`, {
            contact_ids: ids},
            {headers
        }).then(resp => resp.data);
    },
    getDynamicFormData() {
        return axios.get(`${API_PATH}/contact/list/formjson`,{ headers }).then(resp => resp.data);
    },
    getDisputeData(companyName, dispID, startDate, endDate) {
        return axios.get(`${NEW_API_PATH}/rebate/bycompany/get-contract-api/${companyName}/${dispID}`, {
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
            }
        }).then(resp => resp.data)
    },

    getDisputeDatafromSearch(searchValue, companyName, dispID, startDate, endDate) {
        return axios.get(`${NEW_API_PATH}/rebate/bycompany/get-contract-api/${companyName}/${dispID}`, {
            headers,
            params: {
                s: dateFormatter(startDate),
                e: dateFormatter(endDate),
                q: searchValue
            }
        }).then(resp => resp.data)
    },

    submitDisputeSearch(contractID, compNameArray, dispIDArray, startDate, endDate, inputtext) {
        const prirMonth = getPrirMnt();
        return axios.post(`${NEW_API_PATH}/rebate/bycompany/dispute/${compNameArray}/${dispIDArray}/${contractID}`, {
            ...prirMonth,
            s: dateFormatter(startDate),
            e: dateFormatter(endDate),
            q: contractID,
            comment: inputtext
        }, { headers })
    },
    getQuanUnavailData(partNum, c_id) {
        return axios.get(`${API_PATH}/deal/rebates/invoice/credit/${partNum}/${c_id}`, { headers }).then(resp => resp.data);
    },
    //     updateDisputeComments(inputComment,disputeId) {
    //         return axios.get(`${API_PATH}/rebate/dispute/${disputeId}`,{headers,
    //         params:{
    //           comment:inputComment
    //     }
    // })
    //     },
    updateDisputeComments(inputComment, disputeId) {
        return axios.get(`${API_PATH}/rebate/dispute/${disputeId}`, {
            headers,
            params: {
                comment: inputComment
            }
        }).then(resp => resp.data)
    },
    changeHomePageStatus(feature_list, email) {
        return axios.post(`${API_PATH}/homepage`, { feature_list, email }, {
            headers
        }).then(resp => resp.data)
    },
    getHomePageStatus(email) {
        return axios.get(`${API_PATH}/gethomepage`, {
            headers,
            params: {
                email
            }
        }).then(resp => resp.data)
    },

    getApiVersion() {
        return axios.get(`${NEW_API_PATH}/pos/version`, { headers }).then(resp => resp.data);
    },
    filteredData(name, type, searchParam) {
        return axios
          .post(
            `${NEW_API_PATH}/rebate/singlefilter?name=${name}&type=${type}&q=${searchParam}&api_token=${config.api_token}`
          )
          .then((resp) => resp.data);
      },
}