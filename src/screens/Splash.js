//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, StatusBar, Platform, Alert, Linking } from 'react-native';

// Constants
import { black, dodgerBlue, greenPrimary, offWhite, primary, white } from '../constants/Color'
import { navigate, resetScreen } from '../navigations/RootNavigation'
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts';
import { getData, storeData } from '../commonComponents/AsyncManager';
import { BEARER_TOKEN, SCREEN_HEIGHT, SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey';
import translate from '../translation/Translate';
import ApiManager from '../commonComponents/ApiManager';
import { name, version } from '../../package.json'
import { TOKEN_CHECK } from '../constants/ApiUrl';
import { ImgLogo, SplashImg } from '../constants/Images';

/** Redux Files */
import { useSelector, useDispatch } from 'react-redux'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../commonComponents/ResponsiveScreen';
import Translate from '../translation/Translate';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'


// create a component
const Splash = (props) => {

	const [isLoading, setIsLoading] = useState(false)

	const userData = useSelector(state => state.userRedux.user_data)
	const dispatch = useDispatch()

	useEffect(() => {

		setTimeout(() => {
			// resetScreen('Login')
			GetUserData()
		}, 2000);
	}, [])

	/* Get User Data from Async Storage */
	const GetUserData = () => {

		getData(USER_DATA, (data) => {
			// console.log("USER_DATA Splash: " + JSON.stringify(data))
			if (data == null) {
				//console.log("go to login")
				resetScreen('Intro')
			} else {
				// storeData(USER_DATA, data, () => {
				// 	dispatch(storeUserData(data))
				// 	resetScreen("Dashboard")
				// })

				getData(BEARER_TOKEN,(token) => {
					Api_Token_Check(true, {...data,token: token})
				})
				
			}
		})
	}


 const Api_Token_Check = (isLoad, user_data) => {
        console.log("data",user_data)
        ApiManager.post(TOKEN_CHECK, {
            token: user_data.token,
			phone: user_data?.user.phone,
			api_access_key: "EyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
        }).then((response) => {
            console.log("Api_Token_Check : ", response.data)
            var data = response.data;
            if (data.status == true) {

				var userData = data.data

                storeData(USER_DATA, userData, () => {
                    storeData(BEARER_TOKEN, userData.token)
                    dispatch(storeUserData(userData))
                    resetScreen("Dashboard")
                })

				// storeData(USER_DATA, data, () => {
				// 	dispatch(storeUserData(data))
				// 	resetScreen("Dashboard")
				// })

            } else {
                Dialog.show({   
                    type: ALERT_TYPE.DANGER,
                    title: "Something went wrong",
                    textBody: "Please login again",
                    button: 'Ok',
                    onPressButton: ()=> {
						resetScreen('Intro')
                       // console.log("ok presssed")
                    },

                  })
				  resetScreen('Intro')
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Add_Reward Error ", err);
        })
    }

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'dark-content'} backgroundColor={offWhite} />
			<View style={{ flex: 1, backgroundColor: offWhite, alignItems: 'center', justifyContent: 'center' }}>

				<Image
					source={ImgLogo}
					style={{ width: '100%', height: heightPixel(455), alignSelf: 'center',  resizeMode : 'cover' }}
					resizeMode="cover"
				/>
			</View>

			<View style={styles.textView}>

				<Text style={styles.textName}>
					{Translate.t("company_name")}
				</Text>

				<Text style={styles.txtWebsite}>
					{Translate.t("website")}
				</Text>

			</View>

		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: offWhite
	},
	textView: {
		position: 'absolute', bottom: pixelSizeVertical(53), alignContent: 'flex-end',
		alignItems: 'center', left: 0, right: 0
	},
	textName: {
		fontFamily: MEDIUM, fontSize: FontSize.FS_18, color: black,
		marginHorizontal: pixelSizeHorizontal(20)
	},
	txtWebsite: {
		color: greenPrimary, fontFamily: BOLD, marginTop: pixelSizeHorizontal(20),
		marginHorizontal: pixelSizeHorizontal(20), fontSize: FontSize.FS_18,
	}
});

export default Splash;
