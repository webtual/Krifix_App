/**  Third Party  */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/** Constant Files */
import { BEARER_TOKEN, FCM_TOKEN, USER_DATA } from '../constants/ConstantKey';
import { BASE_URL, LOGIN } from "../constants/ApiUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Translate from "../translation/Translate";
import { Platform } from "react-native";
import { getData, storeData } from "./AsyncManager";
import { storeUserData } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";


const ApiManager = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		// "Authorization": '',
	},
	timeout: 60000
});

/**  Set the AUTH token for any request  */
ApiManager.interceptors.request.use(async config => {

	/**  Set Barear Token in Haeder */
	var token = await AsyncStorage.getItem(BEARER_TOKEN)

	// console.log('====================================');
	// console.log("User Token axios: " + token);
	// console.log('====================================');

	token = JSON.parse(token)

	if (token) {
		config.headers.Authorization = "Bearer "+token
	}

	return config
});

/** Handle Response error from axios  */
ApiManager.interceptors.response.use(response => {
	return response
}, function (error) {


	console.log("Axios interceptors err : " + JSON.stringify(error))

	if (error.hasOwnProperty("code") && error.code == "ECONNABORTED") {
		Dialog.show({
			type: ALERT_TYPE.DANGER,
			title: Translate.t('alert'),
			textBody: "Request Timeout",
			button: 'Ok',
		  })
		
	}
	else if (error.hasOwnProperty("code") && error.code == 'ERR_NETWORK') {
		Dialog.show({
			type: ALERT_TYPE.DANGER,
			title: Translate.t('alert'),
			textBody: "No Internet Connection",
			button: 'Ok',
		  })
	}
	else {

	}
	return Promise.reject(error);
})



export default ApiManager;