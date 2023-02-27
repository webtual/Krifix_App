import React from 'react';

/**  Constant  */
import { navigationRef } from './RootNavigation';
import AppStack from './AppStacks';

/**  Third Party  */
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
// import FlashMessage from 'react-native-flash-message';


function AppNavigator() {

	return (
		
		<NavigationContainer ref={navigationRef}>
			<AppStack />
			{/* <FlashMessage position="top" /> */}
		</NavigationContainer>
		
	)
}

export default AppNavigator;