import React, { Component, useRef } from 'react';


/* Constants Files */
import translate from '../translation/Translate';
import { disableColor, greenPrimary, offWhite, primary, white } from '../constants/Color';
import { FontSize, SEMIBOLD } from '../constants/Fonts';


/* Third party */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';



/* Screens */
import Splash from '../screens/Splash';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import Register from '../screens/Register';
import OtpView from '../screens/OtpView';
import Home from '../screens/Home';
import FastImage from 'react-native-fast-image';
import { FolderFillImg, FolderImg, HomeFillImg, HomeImg, SettingFillImg, SettingImg, UserFillImg, UserImg } from '../constants/Images';
import RedeemHistory from '../screens/RedeemHistory';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import AboutUs from '../screens/AboutUs';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ContactUs from '../screens/ContactUs';
import HelpCenter from '../screens/HelpCenter';
import Rewards from '../screens/Rewards';
import Notification from '../screens/Notification';
import QrCodeScan from '../screens/QrCodeScan';
import RewardStatus from '../screens/RewardStatus';
import ReferralHistory from '../screens/ReferralHistory';
import BankDetails from '../screens/BankDetails';
import KycIntro from '../screens/KycIntro';
import UploadDocument from '../screens/UploadDocument';
import TakeSelfie from '../screens/TakeSelfie';
import KycVerify from './KycVerify';
// import { cart_data } from '../redux/reducers/cartReducer';
// import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {

	return (
		<>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: greenPrimary,
					tabBarInactiveTintColor: disableColor,
					tabBarStyle: { backgroundColor: offWhite, borderTopColor: offWhite, },
					tabBarLabelStyle: { fontFamily: SEMIBOLD, fontSize: FontSize.FS_11 },
					tabBarHideOnKeyboard: true
				}}
			>
				<Tab.Screen
					name={"Home"}
					component={Home}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ color, size, focused }) => (

							<FastImage style={{ width: size, height: size, }}
								tintColor={color}
								resizeMode='contain'
								source={focused ? HomeFillImg : HomeImg}
							/>

						),
					}}
				/>


				<Tab.Screen
					name={"RedeemHistory"}
					component={RedeemHistory}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ color, size, focused }) => (

							<FastImage style={{ width: size, height: size, }}
								tintColor={color}
								resizeMode='contain'
								source={focused ? FolderFillImg : FolderImg}
							/>

						),
					}}
				/>

				<Tab.Screen
					name={"Profile"}
					component={Profile}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ color, size, focused }) => (

							<FastImage style={{ width: size, height: size, }}
								tintColor={color}
								resizeMode='contain'
								source={focused ? UserFillImg : UserImg}
							/>

						),
					}}
				/>


				<Tab.Screen
					name={"Setting"}
					component={Settings}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ color, size, focused }) => (

							<FastImage style={{ width: size, height: size, }}
								tintColor={color}
								resizeMode='contain'
								source={focused ? SettingFillImg : SettingImg}
							/>

						),
					}}
				/>


			</Tab.Navigator>


		</>
	);
}


function AppStacks() {
	return (
		<Stack.Navigator
			initialRouteName="Splash"
			screenOptions={{
				headerShown: false,
				gesturesEnabled: false,

			}}>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Intro" component={Intro} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="OtpView" component={OtpView} />
			<Stack.Screen name="Dashboard" component={HomeTabs} />
			<Stack.Screen name="AboutUs" component={AboutUs} />
			<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
			<Stack.Screen name="ContactUs" component={ContactUs} />
			<Stack.Screen name="HelpCenter" component={HelpCenter} />
			<Stack.Screen name="Rewards" component={Rewards} />
			<Stack.Screen name="Notification" component={Notification} />
			<Stack.Screen name="QrCodeScan" component={QrCodeScan} />
			<Stack.Screen name="RewardStatus" component={RewardStatus} />
			<Stack.Screen name="ReferralHistory" component={ReferralHistory} />
			<Stack.Screen name="BankDetails" component={BankDetails} />
			<Stack.Screen name="KycIntro" component={KycIntro} />
			<Stack.Screen name="UploadDocument" component={UploadDocument} />
			<Stack.Screen name="TakeSelfie" component={TakeSelfie} />
			<Stack.Screen name="KycVerify" component={KycVerify} />
			
		</Stack.Navigator>
	)
}


export default AppStacks;
