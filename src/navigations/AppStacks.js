import React, { Component, useRef } from 'react';


/* Constants Files */
import translate from '../translation/Translate';
import { darkgreen, primary, white } from '../constants/Color';
import { FontSize, SEMIBOLD } from '../constants/Fonts';


/* Third party */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';



/* Screens */
import Splash from '../screens/Splash';
import Intro from '../screens/Intro';

// import { cart_data } from '../redux/reducers/cartReducer';
// import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// function UserTabs() {

// 	const cartData = useSelector(cart_data);

// 	console.log("cart Data : ", cartData)

// 	return (
// 		<>
// 			<Tab.Navigator
// 				initialRouteName="UserHome"
// 				screenOptions={{
// 					headerShown: false,
// 					tabBarActiveTintColor: primary,
// 					tabBarInactiveTintColor: darkgreen,
// 					tabBarStyle: { backgroundColor: white, borderTopColor: primary, },
// 					tabBarLabelStyle: { fontFamily: SEMIBOLD, fontSize: FontSize.FS_11 },
// 					tabBarHideOnKeyboard : true
// 				}}
// 			>
// 				<Tab.Screen
// 					name={"UserHome"}
// 					component={VegetableList}
// 					options={{
// 						tabBarLabel: translate.t('list'),
// 						tabBarIcon: ({ color, size, focused }) => (

// 							<Icon name='shopping-bag' color={color} size={size}/>

// 						),
// 					}}
// 				/>

// 				<Tab.Screen
// 					name="Cart"
// 					component={Cart}
// 					options={{
// 						tabBarBadge : cartData.length ? cartData.length : null,
// 						tabBarLabel: translate.t('cart'),
// 						tabBarIcon: ({ color, size, focused }) => (

// 							<Icon name='shopping-cart' color={color} size={size}/>

// 						),
// 					}}
// 				/>


// 				<Tab.Screen
// 					name="OrderHistory"
// 					component={OrderHistory}
// 					options={{
// 						tabBarLabel: translate.t('order_history'),
// 						tabBarIcon: ({ color, size, focused }) => (

// 							<Icon name='file-text' color={color} size={size}/>

// 						),
// 					}}
// 				/>

// 				<Tab.Screen
// 					name="Profile"
// 					component={Profile}
// 					options={{
// 						tabBarLabel: translate.t('profile'),
// 						tabBarIcon: ({ color, size, focused }) => (

// 							<Icon name='user' color={color} size={size}/>

// 						),
// 					}}
// 				/>
// 			</Tab.Navigator>


// 		</>
// 	);
// }


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
		</Stack.Navigator>
	)
}


export default AppStacks;
