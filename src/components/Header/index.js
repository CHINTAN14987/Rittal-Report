import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import $ from "jquery";
import axios from 'axios';
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import ExportPromt from "./export-promt";
import { messageService, dateChange, updateMenu } from "../../utils/messaging.service";
import Tags from './tags'
import DateRangeService from '../../utils/dateRange.service';
import { getInitialPath, saveDateRange } from "../../utils/validate";
import { increaseCartCount, decreaseCartCount, updateContactCartCount, UpdateNavSection, updateDateRange, getSearchResult, setDateRangeCat, updateBrandFilters, updateCartCount, updateReportFilter, updateSaveSearchStatus, updateCurrency, updatePageonClose, updatePageonCloseXbtn, setConfig, updateCheckIds, contactListItemsCleared, loadContactMyList, updateDynamicFormJson } from "../../actions/app.actions";
import NavigationHandler from '../../utils/navigation.handler.service';
import { isUndefined, rest, some, uniq } from 'lodash';
import BrandMenu from "./brandMenu";
import classNames from "classnames";
import APiService from "../../api/apiServices";
import SearchExampleStandard from "./autoComplete";
import InfoIcon from "./infoIcon";
import { Button, Popup } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import helper from '../../utils/common'
import { Redirect } from "react-router-dom";
import "./dropdown.css";
import tabsTooltipService from "../../utils/tabs-tooltip.service";
import WalkThroughtPopup from "./walk-throught.popup";
import SaveSearch from "./save-searches";
import SaveSearchPopup from "./save-search-popup";
import GeneralPopup from "./popup.component";
import saveSearchIcon from '../../assets/images/save.png'
import { getContent } from '../../utils/lock.screen';
import apiServices from "../../api/apiServices";
const saveSearchesRoutes = ['pos_line', 'pos_customer_line_item', 'pos_tracking_customer_target', 'pos_tracking_product', 'pos_custom_line_item', 'pos_tracking_customer_new']

const NEW_API_PATH = '../api';
const imagePath = '../images/';
const restrictedKeys = ['corporate_metrics', 'ir_haskel_metrics', 'ir_other_metrics']

const LockPopover = ({ title, slug, onClose }) => {

    const content = getContent(slug)
    return <div id="POS" className="overlay lock-link">
        <div className="new">
            <h2>{title}</h2>
            <a className="end" onClick={() => onClose()}>X</a>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    </div>
}
const dateFormat = (date, format = "DD MMM YY") => {
    return moment(date).format(format)
}

isLockDisplayOpen: false,
startDate: moment(this.props.config.date)
    .subtract(2, "month")
    .startOf("month"),
endDate: moment(this.props.config.date)
    .subtract(2, "month")
    .endOf("month"),
ranges: {

},
dateRangeButtontext: "Prior Week",
companyLogo: "",
companyUrl: "",
isMobileToggle: false,
isModelAvailable: false,
brandMenu: false,
selectedMenu: {},
actualSelected: {},
isSearcDropdownOpen: false,
searchType: "",
customDateOption: {
    "label": null,
    "startDate": "",
    "endDate": "",
    "key": "",
    "isChecked": false
},
showSaveSearch: false,
showSaveSearchPopup: false,
currencyOption: [],
customerDateRangeLabel: "",
morMtdateOption: {
    "label": null,
    "startDate": "",
    "endDate": "",
    "key": "",
    "isChecked": false
},
morYtdateOption: {
    "label": null,
    "startDate": "",
    "endDate": "",
    "key": "",
    "isChecked": false
},
list: [],
popupTitle: "",
fields: [],
popupType: "",
addUpdatePath: "",
//dynamicFormData : []
searchVal: "",
hasSearched: false
};

this.initalLoading = true;
this.isFirstLoading = false;

const Header= (props)=>{
const [data, setData]=useState([])
const [topLevelNav, setTopLevelNav]=useState([])
const [brand, setBrand]=useState([])
const [dropdownList, setDropDownList]=useState([])
const [subNav, setSubNav]=useState({})
const [isOpen, setIsOpen]=useState(false)
  const [selectedNav, setSelectedNav]=useState("")
  const [selectedSlug, setSelectedSlug]=useState("")
  const [showEmailPrompt, setShowEmailPrompt]=useState(false)
  const [isLockDisplayOpen, setIsLockDisplayOpen]=useState(false)

}
useEffect(()=>{
    APiService.getHeadersData().then(response => {
        const translations = response.data[0];
        const readyData = Object.entries(translations).map(([key, value]) => ({ value: key, name: value }));
        setData(readyData)

        APiService.getDynamicFormData().then(response => {
            //this.setState({ dynamicFormData: response });
            this.props.updateDynamicFormJson(response)
        }).catch(error => {
            this.setState({ error: error.message });
        });

    }).catch(error => {
        // this.setState({ error: error.message });
    });
},[])
class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
            isLockDisplayOpen: false,
            startDate: moment(this.props.config.date)
                .subtract(2, "month")
                .startOf("month"),
            endDate: moment(this.props.config.date)
                .subtract(2, "month")
                .endOf("month"),
            ranges: {

            },
            dateRangeButtontext: "Prior Week",
            companyLogo: "",
            companyUrl: "",
            isMobileToggle: false,
            isModelAvailable: false,
            brandMenu: false,
            selectedMenu: {},
            actualSelected: {},
            isSearcDropdownOpen: false,
            searchType: "",
            customDateOption: {
                "label": null,
                "startDate": "",
                "endDate": "",
                "key": "",
                "isChecked": false
            },
            showSaveSearch: false,
            showSaveSearchPopup: false,
            currencyOption: [],
            customerDateRangeLabel: "",
            morMtdateOption: {
                "label": null,
                "startDate": "",
                "endDate": "",
                "key": "",
                "isChecked": false
            },
            morYtdateOption: {
                "label": null,
                "startDate": "",
                "endDate": "",
                "key": "",
                "isChecked": false
            },
            list: [],
            popupTitle: "",
            fields: [],
            popupType: "",
            addUpdatePath: "",
            //dynamicFormData : []
            searchVal: "",
            hasSearched: false
        };

        this.initalLoading = true;
        this.isFirstLoading = false;

        APiService.getCartCount().then(response => {
            this.props.updateCartCount(response.count)
        })

        updateMenu.triggerDateChange().subscribe(({ menuObj }) => {
            this.updateSidebarChange(menuObj);

        })
        this.getCurrency();
    }

    getFormData() {
        APiService.getDynamicFormData().then(response => {
            //this.setState({ dynamicFormData: response });
            this.props.updateDynamicFormJson(response)
        }).catch(error => {
            this.setState({ error: error.message });
        });


    }


    componentDidMount() {
        this.headersData();
        this.getFormData();

    }
    componentWillUnmount() {
        updateMenu.triggerDateChange().unsubscribe();
    }

    updateSearchValue(identifier, value) {
        const { dropdownList } = this.state;
        const mapProperties = (data) => {
            return data.map(item => {
                if (item.identifier === identifier) {
                    item.searchValue = value;

                } else {
                    if (item.sub) {
                        item.sub = mapProperties(item.sub)
                    }
                }
                return item;
            })
        }

        const result = mapProperties(dropdownList);

        this.setState(() => {
            return {
                dropdownList: result
            }
        })
    }
    updateBrandSelection(e, item) {
        if (e.target && (e.target.classList.toString().indexOf("parentTitle ") === -1 && e.target.classList.toString().indexOf("fa") === -1)) {
            return false
        }
        e.stopPropagation();
        const { currentSelection: { slug, topLevelSlug } } = this.props;
        const properties = { isChildOpen: !item.isChildOpen }
        const salesFilter = this.state.dropdownList.find(item => item.type === 'threatandops');
        let propertiesToMap = { disabled: true }
        if (topLevelSlug === 'pos_customers' && (slug === 'pos_map' || slug === 'pos_customer_line_item' || slug === 'pos_custom_line_item')) {
            propertiesToMap = { disabled: false }

        }
        let result = this.transformFilterData(this.state.dropdownList, 0, item, properties);
        result = this.transformFilterData(this.state.dropdownList, 0, salesFilter, propertiesToMap)
        this.setState({ dropdownList: result })
    }
    alterbrandList(value, type) {
        let { dropdownList } = this.state;
        dropdownList = dropdownList.map(item => {
            if (item.type === type) {
                item.sub = [...item.sub, {
                    id: `__${value}__`, name: value, type, isChecked: true, exact: false
                }]
            }

            return item;
        });

        this.setState(() => {
            return {
                dropdownList
            }
        }, () => {
            this.   (this.state.startDate, this.state.endDate, this.state.dateRangeButtontext, {}, type, true);
        })

    }
    updateCustomeDateOption(startDate, endDate, label, key) {
        this.setState({ customDateOption: { startDate, endDate, label, key } });

    }
    searchToggle() {
        const isSearcDropdownOpen = !this.state.isSearcDropdownOpen;
        this.setState({ isSearcDropdownOpen })
    };

    toggleDropdown() {
        let { isOpen } = this.state;
        isOpen = !isOpen;
        this.setState({ isOpen });
    }
    updateCheckbox(e, item, level, isSearch) {
        e.stopPropagation();
        isSearch = (isSearch && isSearch !== "") ? true : false
        let listing = this.state.dropdownList;

        const { currentSelection: { slug, topLevelSlug } } = this.props;

        const findNestedValues = (data = [], identifier) => {
            data = data || []
            return data.find(item => {
                if (item.identifier === identifier) {
                    return true
                }
                if (item.sub) {

                    return findNestedValues(item.sub, identifier)
                }
                return false
            })
        }

        const updateDefaultCheckProperty = (data, status) => {
            return data.map(item => {
                if (isSearch) {
                    if (item.isMatched) {
                        item.isChecked = status;
                    }
                } else {
                    item.isChecked = status;
                }

                if (item.sub) {
                    item.sub = updateDefaultCheckProperty(item.sub, status);
                }
                return item
            })

        }
        const updateListing = (data, current) => {
            return data.map(list => {
                const status = findNestedValues(list.sub, current.identifier);

                if (status && !current.isChecked) {
                    if (isSearch) {
                        if (list.isMatched) {
                            list.isChecked = true
                        }
                    } else {
                        list.isChecked = true
                    }

                }
                if (list.sub) {
                    list.sub = updateListing(list.sub, current);
                }

                if (current.identifier === list.identifier) {
                    if (isSearch) {

                        if (list.isMatched) {
                            list.isChecked = !current.isChecked;
                        }
                    } else {
                        list.isChecked = !current.isChecked;
                    }

                    if (list.sub) {
                        list.sub = updateDefaultCheckProperty(list.sub, list.isChecked);
                    }
                }
                if (list.inputType === "radio") {
                    list.isChecked = (current.identifier === list.identifier)
                }
                return list;

            });
        }
        const updateChecksStatus = (data = []) => {
            return data.map(item => {
                if (item.sub) {
                    item.__isCheckedAll = item.sub.filter(list => list.isChecked).length === item.sub.length ? true : false;

                    item.sub = updateChecksStatus(item.sub);
                }

                return item
            })
        }
        const markParent = (data = []) => {
            return data.map(item => {
                if (item.sub) {
                    const checkedChild = item.sub.filter(list => {
                        if (list.sub && list.sub.length) {
                            return list.__isCheckedAll
                        } else {
                            return list.isChecked;
                        }
                    });

                    item.__isCheckedAll = checkedChild.length === item.sub.length ? true : false;
                    item.sub = markParent(item.sub);
                } else {
                    item.__isCheckedAll = item.isChecked;
                }

                return item
            })
        }

        listing = updateListing(listing, item);
        listing = updateChecksStatus(listing);
        listing = markParent(listing);
        listing = this.updateSidebarChange({ slug, parentSlug: topLevelSlug })
        this.setState({ dropdownList: listing });

    }

    resetFilter(type) {
        const { currentSelection: { parentSlug, slug } } = this.props
        const filterCat = this.state.dropdownList.filter(item => item.type === type)
        const result = this.transformFilterData(filterCat, 0, {}, {}, {}, true);
        const mapResponse = this.state.dropdownList.map(item => {
            if (item.type === type) {
                item.sub = result[0].sub;
            }

            return item;
        })
        this.setState(() => {
            return { dropdownList: mapResponse }
        }, () => {
            setTimeout(() => {
                //this.removeCustomDate(false);
                this.   (this.state.startDate, this.state.endDate, this.state.dateRangeButtontext, {}, type, true);
            }, 500)
        });

    }

    toggleMenu() {
        let { isMobileToggle } = this.state;
        isMobileToggle = !isMobileToggle;
        this.setState({ isMobileToggle });
    }
    removeCustomDate(isNotCallFromReset = true) {
        this.setState({ customDateOption: { "label": "", "startDate": "", "endDate": "", "key": "", "isChecked": false } });
        if (isNotCallFromReset) {
            this.   (this.state.startDate, this.state.endDate, this.state.dateRangeButtontext)
        }

    }
    removeCustomDateFilter() {
        const { brandFilter, currentSelection: { parentSlug, slug } } = this.props;
        const availabeOptions = new DateRangeService({}, parentSlug).getCustomerDateOption(slug);
        if (availabeOptions) {
            availabeOptions.forEach(element => {
                brandFilter[element.key] = "";
            });
            this.removeCustomDate(false);
            this.props.updateBrandFilter(brandFilter);
            this.   (this.state.startDate, this.state.endDate, this.state.dateRangeButtontext);
            this.setState({ customerDateRangeLabel: null })
        }

    }
    removeTags(item) {
        let tags = this.state.dropdownList;
        const updateListing = (data, forceUpdate) => {
            return data.map(list => {
                if (list.identifier === item.identifier) {
                    list.isChecked = false;
                    if (list.sub) {
                        list.sub = updateListing(list.sub, true)
                    }

                }
                if (forceUpdate) {
                    list.isChecked = false;
                    if (list.sub) {
                        list.sub = updateListing(list.sub, true);
                    }
                } else {
                    if (list.sub) {
                        list.sub = updateListing(list.sub);
                    }
                }
                return list;
            })
        }

        tags = updateListing(tags)
        this.setState({ dropdownList: tags });
        this.   (this.state.startDate, this.state.endDate, this.state.dateRangeButtontext, this.state.customDateOption)


    }
        (startDate, endDate, chosenLabel, isCustomerDate = {}, filterType, reset = false) {
        const { brandFilter, currentSelection: { parentSlug, slug } } = this.props;
        const { actualSelected } = this.state;
        let filters = {};
        let markedChecked = actualSelected;
        let availabelFilterType = [];
        let updatedFilter = {};
        delete actualSelected[filterType];
        const getFilter = (data, level, parent = {}) => {
            data.forEach(item => {
                if (level !== 0) {
                    availabelFilterType.push(item.type)
                    if (item.isChecked && !parent.__isCheckedAll && (item.filtertype !== 'tabs' || item.__isCheckedAll)) {
                        if (!filters[item.type]) {
                            filters[item.type] = [];
                        }
                        filters[item.type].push(item.id);

                    }
                    if (item.isChecked) {
                        if (!markedChecked[filterType]) {
                            markedChecked[filterType] = [];
                        }
                        markedChecked[filterType].push({ id: item.id, type: item.type })

                    }
                }
                if (item.sub) {
                    getFilter(item.sub, 1, item)
                }
            })
        }
        const selectedCat = this.state.dropdownList.filter(item => (item.type === filterType));
        getFilter(selectedCat, 0);

        if (isCustomerDate.label && isCustomerDate.label !== "") {
            const availabeOptions = new DateRangeService({}, parentSlug).getCustomerDateOption(slug);
            availabeOptions.forEach(element => {
                delete brandFilter[element.key];
            });
            const dateRangeConfig = availabeOptions[0].config;
            filters[isCustomerDate.key] = "";

            filters[isCustomerDate.key] = `${moment(isCustomerDate.startDate).format("YYYY-MM-DD")},${moment(isCustomerDate.endDate).format("YYYY-MM-DD")}`
            if (dateRangeConfig.singleDatePicker) {
                filters[isCustomerDate.key] = moment(isCustomerDate.startDate).format('YYYY-MM')
            }
            const customDateOption = { startDate: isCustomerDate.startDate, endDate: isCustomerDate.endDate, "label": isCustomerDate.label, isChecked: true, key: isCustomerDate.key }
            this.setState({
                selectedMenu: filters, isOpen: false,
                customDateOption
            });

            this.isFirstLoading = true;
        } else {
            markedChecked = { ...actualSelected, ...markedChecked }
            if (reset) {
                delete markedChecked[filterType]
            }
            if (this.state.dateRangeButtontext !== chosenLabel) {
                this.isFirstLoading = true;
            }
            this.setState({
                selectedMenu: filters, isOpen: false, startDate: startDate, endDate: endDate, dateRangeButtontext: chosenLabel,
                actualSelected: markedChecked
            });

            this.props.dateRange(startDate, endDate);
            this.props.setDateRangeCat(chosenLabel);
        }

        if (filterType === 'comparison') {
            filters['cs'] = `${dateFormat(isCustomerDate.comparsionTo.startDate, "YYYY-MM-DD")}, ${dateFormat(isCustomerDate.comparsionTo.endDate, "YYYY-MM-DD")}`
            filters['ce'] = `${dateFormat(isCustomerDate.comparsionFrom.startDate, "YYYY-MM-DD")}, ${dateFormat(isCustomerDate.comparsionFrom.endDate, "YYYY-MM-DD")}`
        }
        if (JSON.stringify(brandFilter) !== JSON.stringify(filters)) {
            availabelFilterType = uniq(availabelFilterType);
            availabelFilterType.forEach((type) => {
                delete brandFilter[type]
            });
            if (reset && filterType === 'date') {
                delete brandFilter['cs'];
                delete brandFilter['ce'];

            }

            updatedFilter = { ...brandFilter, ...filters }


            this.props.updateBrandFilter(updatedFilter);
        }


    }

    updateDropdownSelection(id, type) { }
    updateDateRange(parentSlug, slug) {
        const { config } = this.props;
        if (parentSlug) {
            const dateRangeService = new DateRangeService(config, parentSlug, this.initalLoading, slug);
            const option = dateRangeService.getDateOption()


            this.setState({
                ranges: option.range,
                startDate: option.startDate,
                endDate: option.endDate,
                dateRangeButtontext: option.buttonText
            });

            this.props.dateRange(option.startDate, option.endDate);
            this.props.setDateRangeCat(option.buttonText);
        }

    }

    getFirstValidChild(navData, mailType, isChild) {
        mailType = mailType.toLocaleLowerCase();
        const result = navData.find((item) => {
            return (
                item.type.toLocaleLowerCase().indexOf(mailType) !== -1 &&
                item.is_active.toLocaleLowerCase().indexOf(mailType) !== -1
            );
        });

        if (result && result.submenus.length > 0) {
            const childNav = result.submenus.find((item) => {
                return (
                    item.type.toLocaleLowerCase().indexOf(mailType) !== -1 &&
                    item.is_active.toLocaleLowerCase().indexOf(mailType) !== -1
                );
            });

            result.slug = childNav ? childNav.slug : "";
            return result;
        }

        return result;
    }
    componentWillMount() {
        let {
            config: { mailType, report_access, feature_list },
        } = this.props;
        mailType = mailType.toLocaleLowerCase();
        const topLevelNav = [];
        this.subscription = messageService.getMessage().subscribe((message) => {
            if (message) {
                this.props.navData.forEach((element) => {
                    if (
                        element.type &&
                        element.type.toLocaleLowerCase().indexOf(mailType) !== -1
                    ) {
                        element.isLock = element.is_active.toLocaleLowerCase().indexOf(mailType) !== -1;
                        if (element.slug === 'lead-management') {
                            element.isLock = report_access.indexOf('L') !== -1
                        }
                        if (element.slug === 'points-of-sale') {
                            element.isLock = report_access.indexOf('P') !== -1
                        }
                        if (element.slug === 'inventory') {
                            element.isLock = report_access.indexOf('I') !== -1
                        }
                        if (element.slug === 'quote-management') {
                            element.isLock = report_access.indexOf('Q') !== -1
                        }
                        if (element.slug === 'rebates') {
                            element.isLock = (report_access.indexOf('RR') !== -1)
                        }

                        element.defaultMenu = element.submenus[0]
                            ? this.getFirstValidChild(element.submenus, mailType, true) ? this.getFirstValidChild(element.submenus, mailType, true) : {}
                            : {};
                        topLevelNav.push(element);
                        this.updateDateRange();
                    }
                });
                const path = getInitialPath();
                const subNav = this.props.navData.filter((item) => {
                    return item.slug === path.parent;
                });
                if (subNav.length) {
                    this.setState({ subNav: subNav[0] });
                    if (path.parent === "common_home_page") {
                        this.updateTopLevelHeader("common_home_page");
                    }

                    if (path.parent === 'home' && feature_list && feature_list.split(",").includes('notHomePage')) {
                        const redirectLink = this.getDirectLink(this.props.navData);

                    }
                }

                this.setState({ topLevelNav });
            }
        });

        APiService.getCompanyLogo(this.props.config.id).then((response) => {
            this.setState({
                companyLogo: `${imagePath}${response.logoPath}`,
                companyUrl: response.WebsiteUrl,
            });
            NavigationHandler.setPath(`${imagePath}${response.logoPath}`);
            document.title = `${response.title} - ${this.getFullMailType(this.props.config.mailType)} `;
        });
    }
    getDirectLink(navData) {
        const { config } = this.props
        const { mailType } = config;
        if (navData.length) {


            const service = navData.filter(item => {
                return item.slug !== 'home'
            }).find(item => {

                return item.is_active.toLocaleLowerCase().split(",").includes(mailType.toLocaleLowerCase())
            });

            const tab = service.submenus.find(item => {
                return item.is_active.toLocaleLowerCase().split(",").includes(mailType.toLocaleLowerCase())
            });

            if (tab && tab.submenus.length) {
                const menu = tab.submenus.find(item => {
                    return item.is_active.toLocaleLowerCase().split(",").includes(mailType.toLocaleLowerCase())
                });
                return `${service.slug}/${menu.slug}`

            } else {
                return `${service.slug}/${tab.slug}`
            }

        }

    }
    componentWillUnmount() {
        this.setState({ isOpen: false })
        this.subscription.unsubscribe();
    }

    componentWillReceiveProps(newProps) {
        const { navData, config, walkThroughtIds, brandFilter } = this.props;
        const { dropdownList, startDate, endDate, dateRangeButtontext } = this.state;
        const path = getInitialPath();
        const subNav = navData.filter((item) => {
            return item.slug === path.parent;
        });
        if (subNav.length) {
            this.setState({ subNav: subNav[0], isOpen: false });
        }
        if (newProps.currentSelection.topLevelSlug !== this.props.currentSelection.topLevelSlug && newProps.currentSelection.topLevelSlug !== 'corporate_matrix') {
            this.props.updateBrandFilter({});
            this.removeCustomDateFilter();
            this.removeCustomDate()
        }

        if (newProps.currentSelection.slug !== this.props.currentSelection.slug &&
            (newProps.currentSelection.slug !== 'custom_toplevelkpi_corporate' && this.props.currentSelection.slug === 'custom_toplevelkpi_corporate')) {
            
            delete brandFilter['week_date'];
            delete brandFilter['ytd_date'];
            delete brandFilter['qtr_date'];
            this.props.updateBrandFilter(brandFilter);
        }

        if (newProps.currentSelection.parentSlug !== this.props.currentSelection.parentSlug || (newProps.currentSelection.topLevelSlug === 'inventory_exchange' && newProps.searchText !== this.props.searchText) ||
            ((newProps.currentSelection.slug === 'leads_screened' && this.props.currentSelection.slug !== 'leads_screened') || (newProps.currentSelection.slug === 'custom_source' && this.props.currentSelection.slug !== 'custom_source') || (newProps.currentSelection.slug === 'rebate_contracts_detailsnew' && this.props.currentSelection.slug !== 'rebate_contracts_detailsnew') || (newProps.currentSelection.slug === 'rebate_contracts_type_active' && this.props.currentSelection.slug !== 'rebate_contracts_type_active') || (newProps.currentSelection.slug === 'rebate_contracts_type_pending' && this.props.currentSelection.slug !== 'rebate_contracts_type_pending') || (newProps.currentSelection.slug === 'rebate_contracts_type_renegotiate' && this.props.currentSelection.slug !== 'rebate_contracts_type_renegotiate') || (newProps.currentSelection.slug === 'rebate_contracts_type_decline' && this.props.currentSelection.slug !== 'rebate_contracts_type_decline') || (newProps.currentSelection.slug === 'rebate_contracts_type_expired' && this.props.currentSelection.slug !== 'rebate_contracts_type_expired') || (newProps.currentSelection.slug === 'inventory_summary' && this.props.currentSelection.slug !== 'inventory_summary') || (newProps.currentSelection.topLevelSlug === 'rebate_custom' && this.props.currentSelection.topLevelSlug !== 'rebate_custom') || (newProps.currentSelection.slug === 'custom_bosch_detailed' && this.props.currentSelection.slug !== 'custom_bosch_detailed'))
            || ((this.props.currentSelection.slug === 'leads_screened' && newProps.currentSelection.slug !== 'leads_screened') || this.props.currentSelection.slug === 'custom_source' && newProps.currentSelection.slug !== 'custom_source' || this.props.currentSelection.slug === 'rebate_contracts_detailsnew' && newProps.currentSelection.slug !== 'rebate_contracts_detailsnew' || this.props.currentSelection.slug === 'inventory_summary' && newProps.currentSelection.slug !== 'inventory_summary' || this.props.currentSelection.topLevelSlug === 'rebate_custom' && newProps.currentSelection.topLevelSlug !== 'rebate_custom' || this.props.currentSelection.topLevelSlug === 'custom_bosch_detailed' && newProps.currentSelection.topLevelSlug !== 'custom_bosch_detailed')) {


            this.updateDateRange(newProps.currentSelection.parentSlug, newProps.currentSelection.slug);

            let slug = newProps.currentSelection.parentSlug === 'lead-management' ? 'filter/divisions' : 'pos/filter/divisions';
            if (newProps.currentSelection.parentSlug === 'quote-management') {
                slug = 'quote/filter/divisions'
            }
            if (newProps.currentSelection.parentSlug === 'contacts' || newProps.currentSelection.parentSlug === 'contacts_flat') {
                slug = 'contacts/filter/divisions'
            }
            if (newProps.currentSelection.parentSlug === 'inventory') {
                slug = 'inventory/filter/divisions'
            }
            if (newProps.currentSelection.slug === 'leads_screened') {
                slug = 'filter/screened'
            } if (newProps.currentSelection.slug === 'custom_source') {
                slug = 'custom/source/filter'
            } if (newProps.currentSelection.parentSlug === 'inventory') {
                slug = 'inventory/filter/divisions'
            } if (newProps.currentSelection.parentSlug === 'rebates') {
                slug = 'rebate/filters'
            } if (newProps.currentSelection.slug === 'rebate_contracts_detailsnew' || newProps.currentSelection.slug === 'rebate_contracts_type_active' || newProps.currentSelection.slug === 'rebate_contracts_type_pending' || newProps.currentSelection.slug === 'rebate_contracts_type_renegotiate' || newProps.currentSelection.slug === 'rebate_contracts_type_decline' || newProps.currentSelection.slug === 'rebate_contracts_type_expired') {
                slug = 'rebate/contract/filters'
            } if (newProps.currentSelection.slug === 'inventory_summary') {
                slug = 'inventory/filter'
            } if (newProps.currentSelection.slug === 'pos_territory_list_view') {
                slug = 'pos/territory/filter/divisions'
            }
            if (newProps.currentSelection.topLevelSlug === 'rebate_custom') {
                slug = 'rebate/gates/custom/filters'
            }
            if (newProps.currentSelection.slug === 'custom_bosch_detailed') {
                slug = 'custom/bosch/filter'
            }




            const checkNestedFilter = (data) => {
                data = data || [];
                return data.find(item => (item.sub && item.sub.length > 0))
            }
            this.setState({ dropdownList: [], actualSelected: {} })
            this.props.updateBrandFilter({});
            APiService.getBrand(slug, this.props.config.mailType, this.props.config.id, this.props.config.system_type, this.props.config.extraParams, newProps.searchText)
                .then((data) => {
                    const extraParamsKeys = this.props.config.extraParams;

                    data = Array.isArray(data) ? data : [data]
                    const salesFilter = data.find(item => item.type === 'threatandops');
                    const propertiesToMap = { disabled: true }
                    //data = data.filter(item => ((item.sub && item.sub.length > 1 || checkNestedFilter(item.sub)) || isUndefined(item.sub)))
                    data = this.transformFilterData(data, 0, salesFilter, propertiesToMap);
                    this.setState({ dropdownList: data });

                });
        }
    }
    manageDropdown(reset) {

        const closeOpenDropdown = (data) => {
            return data.map(item => {
                item.isChildOpen = item.isChecked ? item.isChildOpen : false;
                item.isMatched = reset ? false : item.isMatched;
                if (item.name === null) {
                    item.name = ""
                } else {
                    item.name = item.name.toString() || ""
                }
                item.name = (item.isMatched && !item.sub) ? item.name : item.name.replace(/(<([^>]+)>)/ig, '')
                if (item.isMatched) {
                    item.isChildOpen = true
                }
                if (item.sub) {
                    item.sub = closeOpenDropdown(item.sub);
                }
                return item
            })
        }
        this.setState((preState) => {
            return {
                dropdownList: closeOpenDropdown(preState.dropdownList)
            }
        })

    }
    transformFilterData(data, level = 0, currentItem = {}, properties = {}, parent = {}, reset = false) {
        return data.map(item => {
            item.isChildOpen = item.isChildOpen || false;
            item.isChecked = item.isChecked || false;

            item.id = item.id ? item.id.toString().replace(/[/]/g, "__").replace(/[&]/g, "%26") : item.id
            item.level = level + 1
            item.identifier = item.identifier || helper.getUniqueId();
            item.parent = parent.identifier;
            item.__isCheckedAll = reset ? false : item.__isCheckedAll || false;
            item.isChecked = reset ? false : item.isChecked
            item.inputType = item.inputType || 'checkbox';
            item.disabled = false;
            if (currentItem.identifier === item.identifier) {
                item = Object.assign(item, properties)
            }

            if (item.sub && item.sub.length > 0) {
                item.sub = this.transformFilterData(item.sub, item.level, currentItem, properties, item, reset);

                item.isChecked = item.sub.find(list => list.isChecked);

            }
            return item
        })
    }

    clearAllFilter() {
        let { dropdownList } = this.state;
        const { currentSelection: { slug, topLevelSlug }, brandFilter } = this.props;
        dropdownList = this.transformFilterData(dropdownList, 0, {}, null, {}, true);
        dropdownList = this.updateSidebarChange({ slug, parentSlug: topLevelSlug, listing: dropdownList });
        if (JSON.stringify(brandFilter) !== JSON.stringify({})) {
            this.setState(() => {
                return {
                    dropdownList,
                    actualSelected: {},
                    customDateOption: {
                        "label": null,
                        "startDate": "",
                        "endDate": "",
                        "key": "",
                        "isChecked": false
                    },
                    customerDateRangeLabel: "",
                    morMtdateOption: {
                        "label": null,
                        "startDate": "",
                        "endDate": "",
                        "key": "",
                        "isChecked": false
                    },
                    morYtdateOption: {
                        "label": null,
                        "startDate": "",
                        "endDate": "",
                        "key": "",
                        "isChecked": false
                    }
                }
            }, () => {
                this.props.updateBrandFilter({})
            })
        }
        this.props.updatedcheckedId([]);

        this.props.updateSaveSearchStatus({ "status": false, "route": null });
    }
    handleLockMenu(title, slug) {
        const status = title ? true : false;
        this.setState({ isLockDisplayOpen: status, selectedNav: title, selectedSlug: slug });
    }

    getFullMailType(type) {
        type = type.toLocaleLowerCase();
        const types = [
            { "type": "dist", label: "Distributor Report" },
            { "type": "management", label: "Management Report" },
            { "type": "parent", label: "Parent Report" },
            { "type": "parent", label: "Parent" },
            { "type": "pm", label: "Project Management Report" },
            { "type": "rsm", label: "Regional Sales Manager Report" },
            { "type": "sp", label: "Sales Person Report" },
            { "type": "tsm", label: "Territory Sales Manager Report" },
            { "type": "rep", label: "Representative Report" },
            { "type": "cm", label: "Channal Manager Report" },
            { "type": "NEX", label: "NEX Report" },
            { "type": "KAM", label: "KAM Report" },
            { "type": "SM", label: "Sales Manager Report" },
            { "type": "ISR", label: "Inside Sales Representative Report" },
            { "type": "TM", label: "Territory Manager Report" }
        ];

        const result = types.find(item => item.type.toLocaleLowerCase() === type);

        return result ? result.label : type.toUpperCase();
    }

    updateTopLevelHeader(parentPath) {
        const path = getInitialPath();
        const subNav = this.props.navData.filter((item) => {
            return item.slug === parentPath;
        });

        if (subNav.length) {
            this.setState({ subNav: subNav[0] });
        }
        const menu =
            parentPath === "common_home_page" ? subNav : subNav[0].submenus;
        const nav = this.getFirstValidChild(menu, this.props.config.mailType);
        this.updateSelection(subNav[0].slug, nav);

    }

    getCurrentSlug(currentSelection, getSlug) {

        let isSearchAvailable = null;
        let searchText = null;

        let nav = {};
        this.props.navData.filter((item) => {
            if (item.slug === currentSelection.parentSlug) {
                item.submenus.filter((sub) => {
                    if (sub.slug === "contact_list_flat") {
                        nav = sub.submenus.filter((lastLevel) => {
                            return lastLevel.slug === getSlug
                        })
                    }
                })
            }
        });

        console.log(nav[0]);
        let item = nav[0];
        this.props.updatePage(item.slug, item.page_type, item.breadcum, item.period, item.label, item.dashnav, item.tablehead, currentSelection.parentSlug, currentSelection.submenus, item.has_duration, currentSelection.topLevelSlug, isSearchAvailable, searchText);

        //this.updateSelection(parentSlug, nav[0]);
    }

    updateSelection(parentSlug, item, resetReportMode = true) {
        const { dropdownList, startDate, endDate, dateRangeButtontext } = this.state;
        const findMenu = (type) => {
            const mailType = this.props.config.mailType.toLocaleLowerCase();
            const menu = item.submenus.find(i => i.is_active.toLocaleLowerCase().indexOf(mailType) !== -1);
            return menu.submenus.length > 0 ? menu.submenus[0] : menu
        }
        const slug = item.submenus.length > 0 ? findMenu().slug : item.slug;
        const submenus = item.submenus.length > 0 ? findMenu().tablehead : item.tablehead;
        const breadcum = item.submenus.length > 0 ? findMenu().breadcum : item.breadcum;
        const dashnav = item.submenus.length > 0 ? item.submenus[0].dashnav : item.dashnav;
        const has_duration = item.submenus.length > 0 ? findMenu().has_duration : item.has_duration;
        item.page_type = item.submenus.length > 0 ? findMenu().page_type : item.page_type;
        let isSearchAvailable = false;
        let searchText = null;

        if (this.props.currentSelection.slug === 'detailed' && this.props.isSearchAvailable) {
            isSearchAvailable = true;
            searchText = this.props.searchText;
        }

        let salesFilter = {};
        let propertiesToMap = {}
        salesFilter = dropdownList.find(item => {
            return (item.type === 'threatandops' && item.name === 'Sales')
        });

        if (item.slug === 'pos_customers' && (slug === 'pos_map' || slug === 'pos_customer_line_item' || slug === 'pos_custom_line_item')) {
            propertiesToMap = { disabled: false }

        } else {
            propertiesToMap = { disabled: true }
        }
        this.transformFilterData(dropdownList, 0, salesFilter, propertiesToMap, {});
        // this.    (startDate, endDate, dateRangeButtontext, {}, 'threatandops', true);


        this.props.updatePage(
            slug,
            item.page_type,
            breadcum,
            item.period,
            item.label,
            dashnav,
            submenus,
            parentSlug,
            item.submenus,
            has_duration,
            item.slug
        );

        if (slug !== 'dashboard' && !this.isFirstLoading) {
            this.isFirstLoading = true;
            this.updateDateRange(parentSlug, slug)
        }

        if (resetReportMode) {
            this.resetFilter(null);
        }
        $(".search_input").val("")

    }

    updateSidebarChange({ slug, parentSlug, listing = null }) {
        let { dropdownList, startDate, endDate, dateRangeButtontext, } = this.state;
        dropdownList = listing || dropdownList;
        let salesFilter = {};
        let propertiesToMap = {}
        salesFilter = dropdownList.find(item => {
            return (item.type === 'threatandops' && item.name === 'Sales')
        });

        if (parentSlug === 'pos_customers' && (slug === 'pos_map' || slug === 'pos_customer_line_item' || slug === 'pos_custom_line_item')) {
            propertiesToMap = { disabled: false }

        } else {
            propertiesToMap = { disabled: true }
        }
        return this.transformFilterData(dropdownList, 0, salesFilter, propertiesToMap, {});

        // this.    (startDate, endDate, dateRangeButtontext, {}, 'threatandops', true);
    }
    handleApply(event, picker) {

        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
            dateRangeButtontext: picker.chosenLabel,
        });
        saveDateRange({
            startDate: picker.startDate,
            endDate: picker.endDate,
            text: picker.chosenLabel,
        });
        this.props.dateRange(picker.startDate, picker.endDate);
        dateChange.sendMessage({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        this.props.setDateRangeCat(picker.chosenLabel);
    }

    clearSearchInput(event) {
        const { currentSelection, brandFilter, pageType, breadcum, duration, pageTitle,
            dashnav, parentSlug, submenus, hasDuration, isSearchAvailable,
            searchText, search_field } = this.props;

        const { hasSearched } = this.state

        const searchVsalue = $(".search_input").val();

        this.setState({ searchVal: "" })

        if (hasSearched) {
            this.props.updatePageonClose(
                currentSelection,
                // slug,
                // topLevelSlug,
                brandFilter,
                pageType,
                breadcum,
                duration,
                pageTitle,
                dashnav,
                parentSlug,
                submenus,
                hasDuration,
                isSearchAvailable,
                searchText,
                search_field
            );
        }
        $(".search_input").val("");
        $(".search_field").val("all");
        this.setState({ hasSearched: false })
    }

    redirectTOSearch(event) {
        const searchVsalue = $(".search_input").val();
        const search_field = $(".search_field").val();
        this.setState({ searchVal: searchVsalue })
        if ((event.keyCode === 13 || event === "load") && searchVsalue !== "" && search_field !== "") {
            this.props.search(searchVsalue, search_field);
            this.setState({ hasSearched: true })
        }
    }

    printWindow() {
        // window.print();
    }

    brandMenu() {
        this.setState({ brandMenu: !this.state.brandMenu });
    }

    exportFile() {
        const {
            config,
            checkedIds,
            detailResponse,
            topLevelFilter,
            detailFilter,
            brandFilter,
            currentSelection: { slug, parentSlug },
        } = this.props;
        const { startDate, endDate } = this.state;
        let ids = "";
        let keyName = 'id';
        if (checkedIds.length > 0) {
            ids = checkedIds;
            let url = `${NEW_API_PATH}/${slug.replace("pos_", "pos_export_").replace(/[_]/g, '/')}?${keyName}=${ids}`;

            if (parentSlug === 'lead-management') {
                url = `${NEW_API_PATH}/export/${slug.replace(/[_]/g, '/')}?${keyName}=${ids}`;
            }
            if (parentSlug === 'points-of-sale') {
                const str = ids.toString();
                const newStr = str.replace(/&/g, '');
                url = `${NEW_API_PATH}/${slug.replace("pos_", "pos_export_").replace(/[_]/g, '/')}?${keyName}=${newStr}`;
            }
            if (parentSlug === 'quote-management') {
                url = `${NEW_API_PATH}/quote/export/detailed?${keyName}=${ids}`;
            }
            if (parentSlug === 'rebates') {
                url = `${NEW_API_PATH}/${slug.replace(/[_]/g, '/')}/export?${keyName}=${ids}`;
            }

            if (brandFilter.cs) {
                url += `&cs=${brandFilter.cs}&ce=${brandFilter.ce}`
            }

            url += `&api_token=${config.api_token}`
            url += `&sales_column=${config.SalesColumn}`
            url += `&system_type=${config.system_type}`
            url += `&full_forward=${config.forward_based}`
            url += `&e=${moment(endDate).format("YYYY-MM-DD")}&s=${moment(startDate).format("YYYY-MM-DD")}`
            window.open(url);
        } else {
            alert("Please select at least one record");
        }
    }
    exportAll() {
        let numberOfRecord = (sessionStorage.getItem("page") * 100);
        let {
            config,
            detailFilter,
            currentSelection: { slug, parentSlug },
            isSearchAvailable,
            searchText,
            brandFilter,
            openDetail,
            reportMode
        } = this.props;
        const { startDate, endDate } = this.state;
        let params = "";
        slug = isSearchAvailable ? parentSlug === 'lead-management' ? 'search' : 'pos_search' : slug
        brandFilter = { ...config.extraParams, ...brandFilter }
        Object.keys(brandFilter).forEach((item) => {
            params += `&${item}=${brandFilter[item]}&`;
        });

        if ((slug === 'pos_line' || slug === 'pos_search' || slug === 'inventory_exchange_search' || slug === 'rebate_custom_contracts_gates_view') && (numberOfRecord > 500000 || slug === 'inventory_exchange_search' || slug === 'rebate_custom_contracts_gates_view')) {
            this.setState({ showEmailPrompt: true })

        } else {
            let url = `${NEW_API_PATH}/${slug.replace("pos_", "pos_export_").replace(/[_]/g, '/')}?${params}`;
            const skipFields = ['http', 'cpath', 'config'];
            let appliedFilters = "";
            if (parentSlug === 'lead-management') {
                params += `&lead_date_type=${reportMode}&`
                url = `${NEW_API_PATH}/export/${slug.replace(/[_]/g, '/')}?${params}`;
            }
            if (parentSlug === 'points-of-sale' && this.props.currentSelection.slug === 'pos_hierarchy_product') {

                url = `${NEW_API_PATH}/pos/export/${'hierarchy_product'.replace(/[_]/g, '/')}?${params}`;
            }
            if (parentSlug === 'inventory') {
                url = `${NEW_API_PATH}/inventory/export/${slug.replace(/[_]/g, '/')}?${params}`;
            }
            if (parentSlug === 'quote-management') {
                url = `${NEW_API_PATH}/quote/export/detailed?${params}`;
            }
            if (parentSlug === 'rebates') {
                url = `${NEW_API_PATH}/${slug.replace(/[_]/g, '/')}/export?${params}`;
            }
            if (config.system_type === 'territory' && config.mailType === 'DIST') {
                url += `&report_dist=${config.id}&`
            } else if (config.mailType !== 'Management') {
                url += `&report_manager=${config.id}&`
            }

            if (isSearchAvailable) {
                url += `&q=${searchText}&`
            }
            if (openDetail) {

                const link = window.location.hash.replace("#/lead-management/detailed?cpath=", "").replace("#/quote-management/quote_detailed?cpath=", "").split("&");
                const linkHandle = link[0];
                appliedFilters = link.filter(item => item.indexOf('config') === -1 && item.indexOf('==') === -1).join("&");

                if (parentSlug === 'quote-management') {
                    url = `${NEW_API_PATH}/quote/export/lead/handle/${linkHandle}?`
                } else {
                    url = `${NEW_API_PATH}/export/lead/handle/${linkHandle}?`
                }



            }
            url += `s=${moment(startDate).format("YYYY-MM-DD")}&e=${moment(endDate).format("YYYY-MM-DD")}`;
            url += `&api_token=${config.api_token}`
            url += `&sales_column=${config.SalesColumn}`
            url += `&system_type=${config.system_type}&`
            url += `&full_forward=${config.forward_based}&`
            url += appliedFilters

            return window.open(url);
        }
    }

    redirectLink(type) {
        this.props.updateReportFilter(type);
    }

    toggleSaveSearchListing(status) {
        const { showSaveSearch } = this.state;

        this.setState(() => {
            return {
                showSaveSearch: status || !showSaveSearch
            }
        })
    }

    getModule = () => {
        let modeulePath = ""
        const { currentSelection: { parentSlug } } = this.props;
        // eslint-disable-next-line default-case
        switch (parentSlug) {
            case "inventory":
                modeulePath = "inventory"
                break;
            case "points-of-sale":
                modeulePath = "pos"
                break;
            case "rebate":
                modeulePath = "rebate"
                break;
            case "lead-management":
                modeulePath = "lead"
                break;
            case "quote-management":
                modeulePath = "quote"
                break;
            case "contacts_flat":
                modeulePath = "contact"
                break;
        }
        return modeulePath
    }

    toggleGeneralPopup(addOrEdit = "add", keyPath = null) {


        const { showGeneralPopup } = this.state;

        if (keyPath != null) {

            const splitPath = keyPath.split('/');
            console.log(keyPath, splitPath);
            let fieldObj = this.props.dynamicFormData[splitPath[0]][splitPath[1]];
            let savePath = this.props.dynamicFormData[splitPath[0]]['save_path'];
            let title = this.props.dynamicFormData[splitPath[0]]['title'];

            if (addOrEdit === 'add') {

                let updatedFieldObj = fieldObj.map((obj) => {
                    obj.value = "";
                    return obj;
                });

                this.setState(() => {
                    return {
                        fields: updatedFieldObj,
                        popupType: "Add",
                        popupTitle: `Create ${title}`,
                    }
                })
                console.log("fields toggle", this.state.fields);
            }

            if (addOrEdit === 'edit') {
                const next = `${this.getModule()}/my/list`

                this.setState(() => {
                    return {
                        fields: fieldObj,
                        popupType: "Edit",
                        popupTitle: `Update ${title}`,
                    }
                })

                if (this.state.list.length === 0) {
                    APiService.getContactMyList(next).then((response) => {
                        console.log(response);
                        this.setState(() => {
                            return { list: response.data, fields: [{ ...this.state.fields[0], "options": response.data }] }
                        });
                    });
                }
            }
            this.setState(() => {
                return {
                    addUpdatePath: savePath
                }
            })
        }

        this.setState(() => {
            return {
                //popupTitle: "Create List",
                list: [],
                showGeneralPopup: !showGeneralPopup,
                //fields: fields
            }
        })

    }

    resetChecks() {

        this.props.contactListItemsCleared(true);
        this.props.updatedcheckedId([]);
        //this.props.loadContactMyList([]);
        this.setState(() => {
            return { list: [], popupTitle: "", fields: [] }
        });
    }

    toggleSaveSearchPopup(status) {
        const { showSaveSearchPopup } = this.state;

        this.setState(() => {
            return {
                showSaveSearchPopup: status || !showSaveSearchPopup
            }
        })
    }
    onCurrenyDropdown(e, { value, name }) {
        axios.defaults.headers.common['Currency'] = value;
        const currency = this.state.currencyOption.find(item => item.value === value)
        this.props.updateCurrency(currency);
    }
    getCurrency() {
        APiService.getCurrency().then((response) => {
            this.setState(() => {
                return {
                    currencyOption: response.data
                }
            })
        })
    }

    handleMorDate(startDate, endDate, label, key, type) {

        if (type === 'morYtd') {
            this.setState(() => {
                return {
                    morYtdateOption: { startDate, endDate, label, key }
                }
            })
        } else {
            this.setState(() => {
                return {
                    morMtdateOption: { startDate, endDate, label, key }
                }
            })
        }
    }

    applyMorDateilter(type, startDate, endDate, label, key, isReset) {
        this.handleMorDate(startDate, endDate, label, key, type);
        const { brandFilter } = this.props;
        let updatedFilter = { ...brandFilter };

        updatedFilter[key] = `${moment(startDate).format("YYYY-MM-DD")},${moment(endDate).format("YYYY-MM-DD")}`;
        this.props.updateBrandFilter(updatedFilter)

    }
    removeMorFilter(type, key) {
        const { brandFilter } = this.props;
        let updatedFilter = { ...brandFilter }
        if (type === 'morYtd') {
            this.setState(() => {
                return {
                    morYtdateOption: { startDate: "", endDate: "", label: "", key: null }
                }
            })
        } else {
            this.setState(() => {
                return {
                    morMtdateOption: { startDate: "", endDate: "", label: "", key: null }
                }
            })
        }

        delete updatedFilter[key];
        this.props.updateBrandFilter(updatedFilter)

    }

    checkAllFilters(identifier, status) {
        let { dropdownList } = this.state;
        status = status.target.checked

        const markedChecked = (data, status) => {
            return data.map(item => {
                item.isChecked = status;

                if (item.sub) {
                    item.sub = markedChecked(item.sub, status);
                    item.__isCheckedAll = item.sub.find(i => !i.isChecked) ? false : true

                } else {
                    item.__isCheckedAll = item.isChecked;
                }
                return item
            })
        }

        dropdownList = dropdownList.map(item => {
            if (item.identifier === identifier) {
                item.sub = markedChecked(item.sub, status)
            }
            if (item.sub) {
                item.sub = item.sub.map(list => {
                    if (list.identifier === identifier) {
                        list.sub = markedChecked(list.sub, status)
                    }
                    return list
                })
            }

            return item
        })

        this.setState({ dropdownList })
    }

    render() {
        const {
            currentSelection,
            config,
            openDetail,
            detailFilter,
            settings,
            clientEmail,
            isSearchAvailable,
            brandFilter,
            searchText,
            reportMode,
            infoPopup,
            saveSearch,
            currency,
            totalContactCount,
            contactcart_count,
            checkedIds,
            dynamicFormData
        } = this.props;
        const {
            topLevelNav,
            isLockDisplayOpen,
            selectedNav,
            selectedSlug,
            subNav,
            isOpen,
            dropdownList,
            brandMenu,
            isSearcDropdownOpen,
            showEmailPrompt,
            actualSelected,
            showSaveSearch,
            showSaveSearchPopup,
            currencyOption,
            searchVal,
            showGeneralPopup
        } = this.state;
        const { data, selectedOption } = this.state;

        let start = this.state.startDate.format("YYYY-MM-DD");
        let end = this.state.endDate.format("YYYY-MM-DD");
        let label = start + " - " + end;
        if (start === end) {
            label = start;
        }
        const closePopup = () => {
            this.setState({ showEmailPrompt: false })
        }
        const exportRoute = ['pos_summary', 'pos_line', 'pos_tracking_customer_new', 'pos_tracking_customer_target', 'distributor_performance_flagged', 'detailed', 'distributor_performance_leads_good', 'distributor_performance_rate_down', 'distributor_performance_rate_up', 'distributor_performance_responded_least', 'distributor_performance_responded_most', 'distributor_performance_leads_good', 'distributor_performance_leads_bad', 'distributor_performance_top', 'distributor_performance_bottom', 'custom_detailed', 'rebate_detailed', 'inventory_exchange_search', 'pos_hierarchy_product', 'quote_detailed', 'pos_customer_line_item', 'pos_submittal', 'custom_timestamp_detailed', 'custom_kpi_region_all', 'hierarchy_region', 'custom_aftermarket', 'rebate_contracts_details', 'rebate_contracts_detailsnew', 'rebate_contracts_type_active', 'pos_custom_line_item', 'rebate_custom_contracts_gates_view', 'pos_cross_boundary', 'rebate_custom_contracts_details', 'custom_bosch_detailed', 'custom_spx_detailed', 'leads_screened', 'pos_submittal_sales', 'pos_submittal_line_item', 'custom_irmetricssummary', 'custom_irmql', 'custom_irfunnel',
            'custom_irsales', 'custom_irdayresponse', 'custom_irhaskelsummary', 'custom_irothersummary', 'custom_irhaskelmql',
            'custom_notactionedwithintwentyfour', 'pos_distributor_cust'];

        const routeWithFIlter = ['hierarchy', 'timestamp_region', 'trend', 'ir_all_metrics', 'csr'];

        const getSearchPlaceholder = () => {
            switch (this.props.currentSelection.parentSlug) {
                case "points-of-sale":
                    return "customer name, part number,  distributor name";
                case "quote-management":
                    return "quote";
                case "lead-management":
                    return "leads";
                case "inventory":
                    return "Records";
                case "contacts":
                    return "company name, domain";
                case "contacts_flat":
                    return "company name, first name, last name, email";
                case "rebates":
                    return "Contract ID, Business Name, Distributor Name";
                case "pos_territory":
                    return "Postal Code, City name, Country name";
                default:
                    return "leads";
            }
        }

        const getServiceDropdowns = (parentSlug) => {
            const { currentSelection } = this.props;
            const { services } = this.state;
            let supplierList = []
            switch (parentSlug) {
                case 'lead-management':
                    supplierList = (typeof services.lead !== 'undefined' ? services.lead : []);
                    break
                case 'points-of-sale':
                    supplierList = (typeof services.pos !== 'undefined' ? services.pos : []);
                    break
                case 'quote-management':
                    supplierList = (typeof services.quote !== 'undefined' ? services.quote : []);
                    break
                case 'inventory':
                    supplierList = (typeof services.inventory !== 'undefined' ? services.inventory : []);
                    break
                case 'rebates':
                    supplierList = (typeof services.rebate !== 'undefined' ? services.rebate : []);
                    break
                case 'contacts_flat':
                    supplierList = (typeof services.contacts_flat !== 'undefined' ? services.contacts_flat : []);;
                    break
                default:
                    supplierList = [];
            }

            return supplierList
        }


        const getBreadCum = () => {
            let breadcum = this.props.currentSelection.breadcum.split(">");
            const lastTab = breadcum[breadcum.length - 1];
            if (routeWithFIlter.indexOf(this.props.currentSelection.topLevelSlug) !== -1) {
                breadcum[breadcum.length - 1] = reportMode === 'sent' ? ' Leads Sent ' : ' Lead Activity ';
                breadcum.push(lastTab);
            }

            return breadcum

        }
        const singleExport = ['pos_summary', 'pos_line', 'detailed', 'custom_detailed', 'rebate_detailed', 'quote_detailed', 'pos_customer_line_item', 'custom_timestamp_detailed', 'custom_aftermarket', 'rebate_contracts_details', 'rebate_contracts_detailsnew', 'rebate_contracts_type_active', 'pos_custom_line_item', 'rebate_custom_contracts_gates_view', 'pos_cross_boundary', 'rebate_custom_contracts_details', 'custom_bosch_detailed', 'custom_spx_detailed'];
        const isHomePage = this.props.currentSelection.slug === 'overview' ? false : true
        const SaveSearchButton = () => {
            if (saveSearch.route) {
                return <span onClick={() => this.clearAllFilter()}> Clear Search</span>
            }
            return <span onClick={() => this.toggleSaveSearchPopup()}> Save Search</span>
        }

        const activeMenuMetrics = (nav) => {

            return nav.submenus.filter((n) => {
                let res = n.slug === currentSelection.slug;

                if (res) {
                    return n;
                } else {
                    const sub = n.submenus.filter((m) => {
                        return m.slug === currentSelection.slug
                    })
                    if (Object.keys(sub).length) {
                        return n;
                    }
                }

            })
        }

        const getSubNav = (newSub) => {

            return (<>
                <ul>
                    {
                        newSub.map((nav, i) => {
                            const activeMenu = activeMenuMetrics(nav)
                            return <li className={`${((
                                Object.keys(activeMenu).length)) ? 'active' : ""}`} style={{ width: "100%" ? "115%" : "" }}>
                                <NavLink
                                    activeClassName="active-li"
                                    onClick={() => this.updateSelection(subNav.slug, nav, false)}
                                    to={`/${subNav.slug}/${nav.submenus[0].slug}`}>
                                    {nav.label}

                                </NavLink>

                            </li>
                        })
                    }
                </ul>
            </>);

            // subNav.submenus &&
            // subNav.submenus
        }

        const domainAnchorTagWidthMapping = {
            "https://www.noshok.com/": "100%",
            "https://demo.zaflexleads.com/": "212%"
        }

        const setHomepageStatus = async (status) => {
            let { feature_list, email } = config;
            if (status) {
                feature_list = feature_list.replace('notHomePage', "")
            } else {
                feature_list = feature_list.split(",")
                feature_list.push('notHomePage');
                feature_list = feature_list.join(",")
            }

            await apiServices.changeHomePageStatus(feature_list, email);
            const response = { ...config, feature_list }
            setConfig(response);
            sessionStorage.setItem("cpath", JSON.stringify(response));
            if (status) {
                window.location.reload();
            } else {
                let link = this.getDirectLink(this.props.navData);
                if (link) {
                    const [perentSlug, childSlug] = link.split("/")
                    const links = window.location.href.replace("home/overview", `${perentSlug}/${childSlug}`);
                    window.location.href = links;
                    window.location.reload();
                }

            }

        }
        const isHomePageActive = !config.feature_list.includes('notHomePage');
        return (
            <div className="report_type" style={{ background: "#f0f0f0" }}>
                <div className="report_list_desk hide_mob">
                    {!openDetail ? (
                        <div className="menu-left" style={{ width: this.state.companyUrl === 'https://demo.zaflexleads.com/' ? '79%' : '' }}>
                            <ul className="report_type_list main-ul"
                                style={{ width: "100%", float: "left", marginTop: "5px" }}>
                                {topLevelNav.map((nav, index) => {
                                    const isTooltipAvailable = tabsTooltipService.getTooltipContent(nav.slug, config.mailType)
                                    const navClassess = classNames({
                                        'active': (currentSelection.parentSlug === nav.slug),
                                        //'hasNotification': nav.__isUnreadNoti
                                    })
                                    if (nav.slug === 'home') {

                                        return <li className="donotClosePop">
                                            <a className="donotClosePop" className={isHomePageActive ? "" : "change"}>
                                                {nav.label}<i className="fa-chevron-down fas" aria-hidden="true" />
                                            </a>
                                            <ul>
                                                <li className onClick={() => setHomepageStatus(true)}>
                                                    <NavLink to={`/home/overview`}>View</NavLink>

                                                </li>
                                                <li onClick={() => setHomepageStatus(false)}>
                                                    <a >Turn Off</a>
                                                </li>
                                            </ul>
                                        </li>
                                    }
                                    if (nav.slug === 'zaflex_quote-management') {
                                        return <li key={index}>
                                            <a href="https://www.zaflexleads.com/report/Manufacturer/management/quote/dashboard.html" target={"_blank"}>
                                                {nav.label}
                                            </a>
                                        </li>
                                    }
                                    if (nav.slug === 'zaflex_inventory') {
                                        return <li key={index}>
                                            <a href="https://www.zaflexleads.com/newdemo/inventory/management/dashboard.html" target={"_blank"}>
                                                {nav.label}
                                            </a>
                                        </li>
                                    }
                                    if (nav.slug === 'zaflex_rebates') {
                                        return <li key={index}>
                                            <a href="https://www.zaflexleads.com/report/Manufacturer/management/rebate/dashboard.html" target={"_blank"}>
                                                {nav.label}
                                            </a>
                                        </li>
                                    }
                                    if (!nav.isLock) {
                                        return (
                                            <li key={index}>
                                                <div onClick={() => this.handleLockMenu(nav.modal_label || nav.label, nav.slug)} className={`change`}>
                                                    <i className="fa fa-lock"></i> {nav.label}
                                                </div>
                                            </li>
                                        );
                                    }

                                    if (isTooltipAvailable) {
                                        return <li className={navClassess} key={index} style={{ width: isTooltipAvailable.popup ? "140px" : "" }}>
                                            <Popup
                                                basic
                                                position='top left'
                                                wide
                                                hoverable
                                                disabled={isTooltipAvailable.tooltip}

                                                trigger={<NavLink onClick={() => this.updateTopLevelHeader(nav.slug)} activeClassName='active' to={`/${nav.slug}/${nav.defaultMenu.slug}`}>{nav.label} {nav.__isUnreadNoti && nav.__isUnreadNoti !== 0 ? `(${nav.__isUnreadNoti})` : ""}</NavLink>} >

                                                <span dangerouslySetInnerHTML={{ __html: isTooltipAvailable.content }}></span>
                                            </Popup>
                                            {isTooltipAvailable.popup && <WalkThroughtPopup slug={label} style={{ marginRight: '7px', marginTop: '-24px' }} contentType={'videoMode'} content={isTooltipAvailable.content} id={isTooltipAvailable.id} />}
                                        </li>
                                    }

                                    return <li className={navClassess} key={index}><NavLink onClick={() => this.updateTopLevelHeader(nav.slug)} activeClassName='active' to={`/${nav.slug}/${nav.defaultMenu.slug}`}>{nav.label} {nav.__isUnreadNoti && nav.__isUnreadNoti !== 0 ? `(${nav.__isUnreadNoti})` : ""}</NavLink></li>
                                })}
                            </ul>

                        </div>
                    ) : (
                        <div className="openDetail"></div>
                    )}

                    <div className="menu-right" style={{ width: this.state.companyUrl === "https://demo.zaflexleads.com/" ? '21%' : '' }}>
                        <div className="nav">
                            {(
                                <ul className="menu">
                                    {config.feature_list.indexOf('Export') !== -1 && exportRoute.indexOf(currentSelection.slug) !== -1 && (
                                        <li>
                                            <a className="export" onClick={this.exportAll} target="_blank">
                                                ALL
                                                <span className="zaflex1 zaflex-export_black"></span>
                                            </a>
                                        </li>
                                    )}

                                    <ExportPromt modelStatus={showEmailPrompt} config={config} currentSelection={currentSelection} detailFilter={detailFilter} NEW_API_PATH={NEW_API_PATH} closePopup={closePopup} isSearchAvailable={isSearchAvailable} searchText={searchText} brandFilter={brandFilter} startDate={this.state.startDate} endDate={this.state.endDate} />

                                    {exportRoute.indexOf(currentSelection.slug) !== -1 && config.feature_list.indexOf('Export') !== -1 && singleExport.indexOf(currentSelection.slug) !== -1 && (
                                        <li>
                                            <a className="export" onClick={this.exportFile}>
                                                <span className="zaflex1 zaflex-export_black" />
                                            </a>
                                        </li>

                                    )}
                                    {(currentSelection.parentSlug === 'points-of-sale') && config.feature_list.indexOf("CurrencyDropdown") !== -1 &&
                                        <li className="currency-dropdown">
                                            <Dropdown
                                                onChange={(e, data) => this.onCurrenyDropdown(e, data)}
                                                fluid

                                                selection
                                                options={currencyOption}
                                                defaultValue={'USD'}
                                                placeholder='Select Currency' />
                                        </li>
                                    }
                                </ul>
                            )}
                            <div className={`logo ${openDetail ? 'openDetail-logo' : ''}`}>
                                <a href={this.state.companyUrl} target="_blank"
                                    style={{ width: domainAnchorTagWidthMapping[this.state.companyUrl] || "125%" }}>
                                    <img src={this.state.companyLogo} border="0" alt="logo" className={this.state.companyUrl === 'http://www.hydra-cell.com/' ? 'extraWidth' : ''} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul
                        className="report_type_list"
                        style={{
                            width: "100%",
                            float: "left",
                            marginTop: "5px",
                            borderTop: "3px solid #fff",
                            display: isHomePage ? 'block' : 'none'
                        }}
                    >
                        {!openDetail &&
                            subNav.submenus &&
                            subNav.submenus
                                .filter((menu) => {

                                    const activeType = menu.is_active.toLocaleLowerCase().split(",");
                                    if (
                                        activeType.find(my => my === config.mailType.toLocaleLowerCase() || activeType.indexOf("lock") !== -1)


                                    ) {
                                        return true;
                                    }



                                    return false;
                                }).map(item => {
                                    const activeType = item.is_active.toLocaleLowerCase().split(",");
                                    if (activeType.indexOf("lock") !== -1) {
                                        item.__isLocked = true
                                    }
                                    if (routeWithFIlter.indexOf(item.slug) !== -1) {

                                        item.__isFilterAvailable = true
                                    }
                                    return item;

                                }).filter(ele => restrictedKeys.indexOf(ele.slug) === -1)
                                .map((nav, index) => {
                                    const getActiveSlug = (data) => {
                                        const mailtype = config.mailType.toLocaleLowerCase()
                                        const result = data.find(item => item.is_active.indexOf(mailtype) !== -1);
                                        return result || {}
                                    }
                                    const label = nav.submenus.length > 0 ? getActiveSlug(nav.submenus).slug : nav.slug;
                                    let isTooltipAvailable = tabsTooltipService.getTooltipContent(nav.slug, config.mailType);

                                    const newSub = subNav.submenus.filter((item) => {
                                        return restrictedKeys.indexOf(item.slug) !== -1
                                    });

                                    let active = false
                                    if (nav.slug === "ir_all_metrics") {
                                        active = newSub.some((t) => {
                                            let objCount = activeMenuMetrics(t);
                                            return Object.keys(objCount).length > 0;
                                        });
                                    }

                                    const navClassess = classNames('donotClosePop', {
                                        'active': currentSelection.topLevelSlug === nav.slug || active
                                    })
                                    if (nav.__isFilterAvailable) {
                                        isTooltipAvailable = tabsTooltipService.getTooltipContent('lead_activity', config.mailType);
                                        return <li
                                            key={index}
                                            className={navClassess}
                                        >
                                            <a className="donotClosePop">{nav.label}
                                                <i className="fa-chevron-down fas" aria-hidden="true"></i></a>
                                            {
                                                nav.slug === "ir_all_metrics" ? (
                                                    getSubNav(newSub)
                                                ) :
                                                    (<ul>

                                                        <li onClick={() => this.redirectLink('activity')} className={`${currentSelection.topLevelSlug === nav.slug && reportMode === 'activity' ? 'active' : ""}`} style={{ width: isTooltipAvailable.popup ? "115%" : "" }}>
                                                            <Popup
                                                                basic
                                                                position='bottom left'
                                                                offset={[120, -50]}
                                                                wide
                                                                disabled={isTooltipAvailable.tooltip}
                                                                content={isTooltipAvailable.content}
                                                                trigger={<NavLink
                                                                    activeClassName="active-li"
                                                                    onClick={() => this.updateSelection(subNav.slug, nav, false)}
                                                                    to={`/${subNav.slug}/${label}`}>
                                                                    Lead Activity
                                                                </NavLink>} />

                                                            {isTooltipAvailable.popup && <WalkThroughtPopup slug={'lead_activity'} style={{ marginRight: '7px', marginTop: '-24px' }} contentType={'videoMode'} content={isTooltipAvailable.content} id={isTooltipAvailable.id} />}
                                                        </li>
                                                        <li onClick={() => this.redirectLink('sent')} className={`${currentSelection.topLevelSlug === nav.slug && reportMode === 'sent' ? 'active' : ""}`} style={{ width: isTooltipAvailable.popup ? "115%" : "" }}>
                                                            <NavLink
                                                                activeClassName="active-li"
                                                                onClick={() => this.updateSelection(subNav.slug, nav, false)}
                                                                to={`/${subNav.slug}/${label}`}>
                                                                Leads Sent

                                                            </NavLink>

                                                        </li>
                                                    </ul>)
                                            }
                                        </li>
                                    }
                                    if (isTooltipAvailable) {
                                        const charlen = `${nav.label === "Rebates" ? "93" :
                                            nav.label.length * 17 > 150 ? "150" : nav.label.length * 17}px`;
                                        return <li key={index} className={currentSelection.topLevelSlug === nav.slug ? "active" : ""} style={{ width: isTooltipAvailable.popup ? charlen : "" }}>
                                            <Popup
                                                basic
                                                position='top left'
                                                wide
                                                disabled={isTooltipAvailable.tooltip}
                                                content={isTooltipAvailable.content}
                                                trigger={<NavLink
                                                    activeClassName="active-li"
                                                    onClick={() => this.updateSelection(subNav.slug, nav)}
                                                    to={`/${subNav.slug}/${label}`}
                                                >
                                                    {nav.label} {nav.__isUnreadNoti && nav.__isUnreadNoti !== 0 ? ` (${nav.__isUnreadNoti})` : ""}

                                                </NavLink>} />
                                            {isTooltipAvailable.popup && <WalkThroughtPopup slug={label} style={{ marginRight: '7px', marginTop: '-24px' }} contentType={'videoMode'} content={isTooltipAvailable.content} id={isTooltipAvailable.id} />}
                                        </li>
                                    }

                                    if (nav.__isLocked) {
                                        return <li key={index}>
                                            <div className="change"><i className="fa fa-lock"></i> {nav.label} </div>
                                        </li>
                                    }
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                currentSelection.topLevelSlug === nav.slug
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <NavLink
                                                activeClassName="active-li"
                                                onClick={() => this.updateSelection(subNav.slug, nav)}
                                                to={`/${subNav.slug}/${label}`}
                                            >
                                                {nav.label} {nav.__isUnreadNoti && nav.__isUnreadNoti !== 0 ? ` (${nav.__isUnreadNoti})` : ""}
                                                <InfoIcon slug={label} style={{ marginLeft: '5px' }} contentType={'videoMode'} />
                                            </NavLink>
                                        </li>
                                    );
                                })}
                        {!openDetail && currentSelection.slug !== 'pos_ahtd_benchmark_market' && (
                            <p className="selected_date" id="selected_date">

                                <v>
                                    {this.props.config.mailType.toLocaleLowerCase() === 'dist' &&
                                        this.props.currentSelection.topLevelSlug === 'inventory_exchange' &&
                                        <NavLink className="cartItem hyperlink header" to={`/inventory/add_to_cart`}> <i className="fas fa-cart-plus"></i> ({this.props.cart_count}) </NavLink>
                                    }

                                </v>



                            </p>
                        )}


                        {/* this.props.checkedIds.length > */}

                        {
                            (currentSelection.parentSlug === 'contacts_flat' && currentSelection.slug === 'contact_list_flat') &&
                            this.props.checkedIds.length > 0 &&
                            <>
                                <ul className="report_type_list" style={{ "float": "right", 'position': 'relative' }}>
                                    <li className="donotClosePop">
                                        <a className="donotClosePop">List Action<i className="fa-chevron-down fas" aria-hidden="false"></i></a>
                                        <ul style={{ "right": '5px', "width": "calc(100% - 13px)" }}>
                                            <li onClick={() => this.toggleGeneralPopup('add', 'my_list/add')} className="" style={{ width: "100%", 'cursor': 'pointer' }}>
                                                <a>Add</a>
                                            </li>
                                            <li onClick={() => this.toggleGeneralPopup('edit', 'my_list/edit')} className="" style={{ width: "100%", 'cursor': 'pointer' }}>
                                                <a>Edit</a>
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </>
                        }

                        {
                            (currentSelection.parentSlug === 'contacts_flat' && currentSelection.slug === 'contact_my_templates') &&
                            <>
                                <ul className="report_type_list" style={{ "float": "right", 'position': 'relative' }}>
                                    <li onClick={() => this.toggleGeneralPopup('add', 'my_templates/add')} className="" style={{ width: "100%", 'cursor': 'pointer' }}>
                                        <a>Add Template</a>
                                    </li>
                                    {/* <li className="donotClosePop">
                                    <a className="donotClosePop">List Action<i className="fa-chevron-down fas" aria-hidden="false"></i></a>
                                    <ul style={{"right":'5px', "width": "calc(100% - 13px)"}}>
                                        <li onClick={() => this.toggleGeneralPopup('add','my_list/add')} className="" style={{ width: "100%", 'cursor':'pointer'}}>
                                            <a>Add</a>
                                        </li>
                                        <li onClick={() => this.toggleGeneralPopup('edit','my_list/edit')} className="" style={{ width: "100%", 'cursor':'pointer'}}>
                                            <a>Edit</a>
                                        </li>
                                    </ul>

                                </li> */}
                                </ul>
                                {/*<span className="add-contact-list" onClick={() => this.toggleGeneralPopup('add') }>Add New List</span>
                            <span className="add-contact-list" onClick={() => this.toggleGeneralPopup('edit') }>Add To Existing List</span> */}
                            </>
                        }

                        {
                            //console.log("fields",this.state.fields)
                            (currentSelection.parentSlug === 'contacts_flat' && (currentSelection.slug === 'contact_list_flat' || currentSelection.slug === 'contact_my_templates')) &&
                            showGeneralPopup &&
                            <GeneralPopup fields={this.state.fields} cancel={this.toggleGeneralPopup} parentSlug={currentSelection.parentSlug} title={this.state.popupTitle} checkedIds={this.props.checkedIds} resetChecks={this.resetChecks} list={this.state.list} type={this.state.popupType} addUpdatePath={this.state.addUpdatePath} elementWidth={currentSelection.slug === 'contact_my_templates' ? "70%" : "null"} />
                        }

                        {config.feature_list.indexOf("SaveSearch") !== -1 && (currentSelection.parentSlug === 'points-of-sale' || currentSelection.parentSlug === 'contacts_flat') && <p className="selected_date" id="selected_date">
                            {((saveSearchesRoutes.indexOf(currentSelection.slug) !== -1) && (Object.keys(brandFilter).length > 0 || isSearchAvailable)) && <SaveSearchButton />}
                            {(currentSelection.parentSlug === 'points-of-sale' || (currentSelection.parentSlug === 'contacts_flat' && currentSelection.slug === 'contact_list_details')) &&
                                <button className="default date-range-toggle save-search-button" onClick={() => this.toggleSaveSearchListing()}>
                                    <img src={saveSearchIcon} className="save-search-img" title="Saved Search" />
                                </button>
                            }

                        </p>}

                    </ul>
                    {isHomePage && !openDetail && currentSelection.slug !== 'pos_ahtd_benchmark_market' && currentSelection.parentSlug !== 'reports' && currentSelection.parentSlug !== "sales-of-planning" && currentSelection.slug !== 'pos_drag_drop' &&
                        <ul
                            className="report_type_list tags"
                            style={{
                                width: "100%",
                                float: "left",
                                marginTop: "0px",
                                borderTop: "3px solid rgb(255, 255, 255)",
                                borderBottom: "3px solid #dbf4ff",
                                position: "relative",
                                padding: "0px 8px"
                            }}
                        >

                          
                            <span className="search inventory newSearch">
                                <span className=" searchandClose">
                                    <input
                                        className="search_input"
                                        type="text"
                                        placeholder={`search ${getSearchPlaceholder()}`}
                                        onKeyUp={(event) => this.redirectTOSearch(event)}
                                    />
                                    {searchVal && <span
                                        className="close-icon"
                                        onClick={() => this.clearSearchInput("load")}
                                    >
                                        <i className="fas fa-times"></i>
                                    </span>}
                                </span>
                                {
                                    this.props.currentSelection.parentSlug === 'points-of-sale' && data && <select aria-describedby="searchDropdownDescription" class="nav-search-dropdown searchSelect nav-progressive-attrubute nav-progressive-search-dropdown" data-nav-digest="k+fyIAyB82R9jVEmroQ0OWwSW3A=" data-nav-selected="0" id="searchDropdownBox" name="url" tabindex="0" title="Search in" className="search_field">

                                        {
                                            data.map((option, index) => (
                                                <option key={index} value={option.value} selected={option.name === "All"}>
                                                    {option.name}
                                                </option>
                                            ))}

                                    </select>}
                                <span
                                    className="search-icon"
                                    onClick={() => this.redirectTOSearch("load")}
                                >
                                    <i className="fas fa-search"></i>
                                    {saveSearch.route && <i className="fas fa-shopping-cart"></i>}

                                    {saveSearch.route && <span><NavLink style={{ 'color': 'white !important' }} onClick={() => this.getCurrentSlug(this.props.currentSelection, "contact_cart_page")} to={`/contacts_flat/contact_cart_page`} > ({typeof this.props.checkedIds !== "undefined" ? this.props.checkedIds.length : 0})</NavLink></span>}
                                    {/* <span> ( {isNa)N(this.props.cartItems)?0:this.props.cartItems.length+1 } ) </span> */}

                                </span>
                            </span>
                        </ul>}
                    {isHomePage &&
                        <ul
                            className="report_type_list"
                            style={{
                                width: "100%",
                                float: "left",
                                marginTop: "0px",
                                borderTop: "3px solid rgb(255, 255, 255)",
                                borderBottom: "3px solid #dbf4ff",
                            }}
                        >
                            <p className="breadcum" style={{ margin: "0px" }}>
                                {!openDetail && this.props.currentSelection.breadcum &&
                                    getBreadCum().map((item) => {
                                        return <span className="breadcumItems">{item}</span>;
                                    })}


                            </p></ul>
                    }
                    {isLockDisplayOpen && (
                        <LockPopover title={selectedNav} onClose={this.handleLockMenu} slug={selectedSlug} />
                    )}

                    <SaveSearch status={showSaveSearch} close={this.toggleSaveSearchListing} parentSlug={currentSelection.parentSlug} />
                    {showSaveSearchPopup && <SaveSearchPopup cancel={this.toggleSaveSearchPopup} route={currentSelection.slug} brandFilter={brandFilter} filters={dropdownList} breadcum={currentSelection.breadcum} searchText={searchText} parentSlug={currentSelection.parentSlug} />}
                </div>

                <div className="report_list_mobile show_mob">
                    <div
                        className="toggle-btn"
                        style={{ width: "50%", float: "left", paddingLeft: "5%" }}
                    >
                        <a
                            onClick={this.toggleMenu}
                            data-toggle="collapse"
                            data-target="#mob_menu"
                            className="collapsed"
                            aria-expanded="false"
                        >
                            <i className="fa fa-bars" aria-hidden="true" />
                        </a>
                    </div>

                    <div
                        className="client_style_logo"
                        style={{ width: "50%", float: "right", textAlign: "right" }}
                    >
                        <img
                            src={this.state.companyLogo}
                            style={{ width: "100px", marginTop: "4px" }}
                        />
                    </div>
                </div>

                <div
                    id="mob_menu"
                    className={this.state.isMobileToggle ? "" : "collapse"}
                    aria-expanded="false"
                    style={{ height: "0px" }}
                >
                    <ul
                        className="report_type_list"
                        style={{ width: "100%", float: "left", marginTop: "5px" }}
                    >
                        {topLevelNav
                            .filter((item) => {
                                return item.isLock;
                            })
                            .map((nav, index) => {
                                return (
                                    <li
                                        className={
                                            currentSelection.parentSlug === nav.slug ? "active" : ""
                                        }
                                        key={index}
                                    >
                                        <NavLink
                                            activeClassName="active"
                                            onClick={this.updateTopLevelHeader}
                                            to={`/${nav.slug}/${nav.defaultMenu.slug}`}
                                        >
                                            {nav.label}
                                        </NavLink>
                                    </li>
                                );
                            })}

                        {topLevelNav
                            .filter((item) => {
                                return !item.isLock;
                            })
                            .map((nav, index) => {
                                return (
                                    <li key={index}>
                                        <div
                                            onClick={() => this.handleLockMenu(nav.modal_label || nav.label)}
                                            className={`change`}
                                        >
                                            <i className="fa fa-lock"></i> {nav.label}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>

                    <ul
                        className="report_type_list"
                        style={{ width: "100%", float: "left", marginTop: "5px" }}
                    >
                        {!openDetail &&
                            subNav.submenus &&
                            subNav.submenus
                                .filter((menu) => {
                                    const activeType = menu.is_active.split(",");
                                    if (
                                        activeType.indexOf(config.mailType.toLocaleLowerCase()) !==
                                        -1
                                    ) {
                                        return true;
                                    }

                                    return false;
                                })
                                .map((nav, index) => {
                                    const label =
                                        nav.submenus.length > 0 ? nav.submenus[0].slug : nav.slug;
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                currentSelection.topLevelSlug === nav.slug
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <NavLink
                                                activeClassName="active"
                                                onClick={() => this.updateSelection(subNav.slug, nav)}
                                                to={`/${subNav.slug}/${label}`}
                                            >
                                                {nav.label}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                        {currentSelection.hasDuration && !openDetail && (
                            <p className="selected_date" id="selected_date">
                                <span className="showDateRange">
                                    {moment(this.state.startDate, "MM/DD/YYYY").format(
                                        "DD MMM YY"
                                    )}
                                    to
                                    {moment(this.state.endDate, "MM/DD/YYYY").format("DD MMM YY")}
                                </span>

                                <DatetimeRangePicker
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    ranges={this.state.ranges}
                                    onApply={this.handleApply}
                                    showDropdowns={true}
                                    opens="left"
                                >
                                    <button className="default date-range-toggle">
                                        {this.state.dateRangeButtontext}
                                        <i
                                            className="fas fa-calendar-alt"
                                            style={{ marginLeft: "5px" }}
                                        ></i>


                                    </button>
                                </DatetimeRangePicker>
                            </p>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({
    app: {
        currentSelection,
        navData,
        config,
        isAuthVaild,
        openDetail,
        checkedIds,
        detailResponse,
        detailFilter,
        topLevelFilter,
        settings,
        clientEmail,
        brandFilter,
        isSearchAvailable,
        searchText,
        cart_count,
        reportMode,
        walkThroughtIds,
        saveSearch,
        currency,
        contactcart_count,
        cartCount,
        cartItems,
        tableData,
        dynamicFormData
    },
}) => {
    return {
        currentSelection,
        navData,
        config,
        isAuthVaild,
        openDetail,
        checkedIds,
        detailResponse,
        detailFilter,
        topLevelFilter,
        settings,
        clientEmail,
        brandFilter,
        isSearchAvailable,
        searchText,
        cart_count,
        reportMode,
        walkThroughtIds,
        saveSearch,
        currency,
        contactcart_count,
        cartCount,
        cartItems,
        tableData,
        dynamicFormData
    };
};
const mapDispatch = (dispatch, props) => {
    return {
        updatePage: (
            slug,
            pageType,
            breadcum,
            duration,
            pageTitle,
            dashnav,
            tablehead,
            parentSlug,
            submenus,
            hasDuration,
            topLevelSlug,
            isSearchAvailable,
            searchText,
        ) =>
            dispatch(
                UpdateNavSection({
                    slug,
                    pageType,
                    breadcum,
                    duration,
                    pageTitle,
                    dashnav,
                    tablehead,
                    parentSlug,
                    submenus,
                    hasDuration,
                    topLevelSlug,
                }, isSearchAvailable, searchText)
            ),
        dateRange: (startDate, endDate) => dispatch(updateDateRange(startDate, endDate)),
        search: (search, search_field) => dispatch(getSearchResult(search, search_field)),
        setDateRangeCat: (cat) => dispatch(setDateRangeCat(cat)),
        updateBrandFilter: (filter) => dispatch(updateBrandFilters(filter)),
        updatedcheckedId: (checkedIds) => dispatch(updateCheckIds(checkedIds)),
        updateCartCount: (count) => dispatch(updateCartCount(count)),
        updateReportFilter: (type) => dispatch(updateReportFilter(type)),
        updateSaveSearchStatus: (obj) => dispatch(updateSaveSearchStatus(obj)),
        updateCurrency: (currency) => dispatch(updateCurrency(currency)),
        contactListItemsCleared: (status) => dispatch(contactListItemsCleared(status)),
        loadContactMyList: (data) => dispatch(loadContactMyList(data)),
        updateDynamicFormJson: (data) => dispatch(updateDynamicFormJson(data)),
        updatePageonClose: (
            // slug,
            // topLevelSlug,
            currentSelection,
            brandFilter,
            pageType,
            breadcum,
            duration,
            pageTitle,
            dashnav,
            parentSlug,
            submenus,
            hasDuration,
            isSearchAvailable,
            searchText,
        ) => dispatch(updatePageonCloseXbtn(
            // slug,
            // topLevelSlug,
            currentSelection,
            brandFilter,
            pageType,
            breadcum,
            duration,
            pageTitle,
            dashnav,
            parentSlug,
            submenus,
            hasDuration,
            isSearchAvailable,
            searchText,))
    };
};

export default connect(mapStateToProps, mapDispatch)(AppHeader);
