import base64 from 'base-64';
import { reactLocalStorage } from 'reactjs-localstorage';
import CryptoJS from 'crypto-js';
import 'crypto-js/sha512';
import { getHashKey } from '../config/config';

const shouldHeaderRender = window.location.hash.indexOf("leadhistory") !== -1 || window.location.hash.indexOf("quote_history") !== -1;
const genKey = getHashKey();
const dateRange = {
    startDate: "",
    endDate: ""
};
const getStoredCpath = () => {
    const saveCapth = sessionStorage.getItem('cpath');
    return saveCapth ? JSON.parse(saveCapth) : false

}
export const validateCpath = () => {
    let storeCapth = getStoredCpath();
    if (!shouldHeaderRender) {
        let cpath1 = window.location.hash.split("?")[1];
        let cPath = cpath1;
        if (cpath1 && window.location.hash.indexOf("config") === -1) {
            cpath1 = cpath1.replace("cpath=", "");
            cpath1 = base64.decode(cpath1);
            cpath1 = CryptoJSAesDecrypt(genKey, cpath1);
            cpath1 = JSON.parse(cpath1);
            cpath1.extraParams = cpath1.extraParams || {}
            sessionStorage.setItem('cpath', JSON.stringify(cpath1));
            return cpath1
        } else if (window.location.hash.indexOf("config") !== -1 && !storeCapth) {
            let config = window.location.hash.split("&").filter(item => item.match("config"))[0];
            config = config.replace("config=", "");
            sessionStorage.setItem("isAvailable", true);
            return JSON.parse(base64.decode(config));

        }
        else if (storeCapth) {
            return storeCapth;
        }

        return false;
    }

    return storeCapth;

}
const CryptoJSAesDecrypt = (passphrase, encrypted_json_string) => {

    var obj_json = JSON.parse(encrypted_json_string);

    var encrypted = obj_json.ciphertext;
    var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
    var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

    var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });


    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
export const getInitialPath = () => {
    const path = window.location.hash.split("/");
    const parent = path[1];
    if (path.length > 2) {
        const child = path[2].split("?")[0];
        return { parent, child }
    }

    return { "parent": parent, "child": "" }

}
export const getStoredDateRange = () => {
    const dateRange = sessionStorage.getItem("dataRange");
    return JSON.parse(dateRange);
}
export const saveDateRange = (dateRange) => {
    dateRange = JSON.stringify(dateRange);
    sessionStorage.setItem("dataRange", dateRange);
}


