import React from 'react';

/**  Constant  */
import { navigationRef } from './RootNavigation';
import AppStack from './AppStacks';

/**  Third Party  */
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';


function AppNavigator({}) {

const config = {
	screens:{
		Setting: 'Setting',
		Notification: {
			path:'Notification/:message',
			parse:{
				messafe:(message) => `${message}`
			}
		},
	}
}


	
	return (
		
		<NavigationContainer ref={navigationRef}  
			linking={{
				prefixes:["krifix://","https://krifix.app.link"],
				config
			}}
		>
			<AppStack />
			<FlashMessage position="top" />
		</NavigationContainer>
		
	)
}

export default AppNavigator;