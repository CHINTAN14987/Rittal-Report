import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {},
  config: {
    id: null,
    date: null,
    mailType: null,
    email: null,
    contactID: null,
  },
  currentSelection: {},
  isAuthVaild: true,
  loader: true,
  navData: [],
  startDate: "",
  endDate: "",
  isSearchAvailable: false,
  searchText: "",
  search_field: "",
  detailFilter: {},
  mapState: "region",
  openDetail: false,
  clientEmail: "",
  checkedIds: [],
  detailResponse: [],
  topLevelFilter: {},
  brandFilter: {},
  featureList: [],
  cart_count: 0,
  infoPopup: {
    show: false,
    title: "",
    content: null,
    contentType: null,
  },
  reportMode: "activity",
  walkThroughtIds: [],
  saveSearch: { status: false, route: "" },
  currency: {
    country: "usa",
    symbol: "$",
    flag: "us",
    value: "USD",
  },
};

const reducerSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // setConfig: () => {
    //   return {
    //     ...state,
    //     config: action.config,
    //     isSearchAvailable: false,
    //     featureList: action.feature_list || [],
    //   };
    // },
    // updateSetting: () => {
    //   return {
    //     ...state,
    //     settings: action.settings,
    //     isSearchAvailable: false,
    //   };
    // },
    // upDateCurrentSelection: () => {
    //   return {
    //     ...state,
    //     currentSelection: action.selection,
    //     isSearchAvailable: action.isSearchAvailable,
    //     searchText: action.searchText,
    //     detailFilter: {},
    //     saveSearch: { status: false, route: null },
    //   };
    // },

    // updatePageonCloseXbtn: () => {
    //   return {
    //     ...state,
    //     currentSelection: action.selection,
    //     isSearchAvailable: action.isSearchAvailable,
    //     searchText: action.searchText,
    //     search_field: action.search_field,
    //     detailFilter: {},
    //     saveSearch: { status: false, route: null },
    //   };
    // },
    // loaderUpdate: () => {
    //   return {
    //     ...state,
    //     loader: action.status,
    //     isSearchAvailable: false,
    //   };
    // },
    // setAuthStatus: () => {
    //   return {
    //     ...state,
    //     isAuthVaild: action.status,
    //     isSearchAvailable: false,
    //   };
    // },
    // UpdateNavSection: () => {
    //   return {
    //     ...state,
    //     navData: action.navData,
    //     isSearchAvailable: false,
    //   };
    // },
    // updateDateRange: () => {
    //   return {
    //     ...state,
    //     startDate: action.startDate,
    //     endDate: action.endDate,
    //   };
    // },
    // getSearchResult: () => {
    //   return {
    //     ...state,
    //     isSearchAvailable: true,
    //     searchText: action.searchValue,
    //     search_field: action.search_field,
    //   };
    // },
    // applyDetailFilter: () => {
    //   return {
    //     ...state,
    //     detailFilter: action.filters,
    //   };
    // },
    // updateMapState: () => {
    //   return {
    //     ...state,
    //     mapState: action.state,
    //   };
    // },

    // updateDetailedOpen: () => {
    //   return {
    //     ...state,
    //     openDetail: action.status,
    //   };
    // },
    // updateApplicationEmailAddress: () => {
    //   return {
    //     ...state,
    //     clientEmail: action.email,
    //   };
    // },
    // updateCheckIds: () => {
    //   return {
    //     ...state,
    //     checkedIds: action.ids,
    //   };
    // },
    // setDetailResponse: () => {
    //   return {
    //     ...state,
    //     detailResponse: action.data,
    //   };
    // },
    // setTopLevelFilter: () => {
    //   return {
    //     ...state,
    //     topLevelFilter: action.data,
    //   };
    // },
    // setDateRangeCat: () => {
    //   return {
    //     ...state,
    //     dateRangeCat: action.category,
    //   };
    // },
    // applyBrandFilter: () => {
    //   return {
    //     ...state,
    //     brandFilter: action.filters,
    //   };
    // },
    // updateCartCount: () => {
    //   return {
    //     ...state,
    //     cart_count: action.count,
    //   };
    // },
    // updateInfoPopUp: () => {
    //   return {
    //     ...state,
    //     infoPopup: {
    //       show: action.show,
    //       title: "",
    //       content: null,
    //       contentType: action.contentType,
    //     },
    //   };
    // },
    // updateReportFilter: () => {
    //   return {
    //     ...state,
    //     reportMode: action.mode,
    //   };
    // },
    // updateWalkinThroughIds: () => {
    //   return {
    //     ...state,
    //     walkThroughtIds: action.ids,
    //   };
    // },
    // updateSaveSearch: () => {
    //   return {
    //     ...state,
    //     saveSearch: action.obj,
    //     isSearchAvailable: action.obj.status,
    //   };
    // },
    // updateCurrency: () => {
    //   return {
    //     ...state,
    //     currency: action.currency,
    //   };
    // },
  },
});
export const action = reducerSlice.actions;
export default reducerSlice.reducer;
