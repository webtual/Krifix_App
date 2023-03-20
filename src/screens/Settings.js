import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button, Pressable, Share } from 'react-native'
import React, { useState } from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import { black, greenPrimary, offWhite, paleGreen, white } from '../constants/Color'
import FastImage from 'react-native-fast-image'
import { CallImg, HelpImg, HomeFillImg, InfoImg, LogoutImg, NotificationImg, PrivacyImg, ShareBoxImg, ShareImg } from '../constants/Images'
import { removeAllData } from '../commonComponents/AsyncManager'
import { navigate, resetScreen } from '../navigations/RootNavigation'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "react-native-modal";
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import InvitePopUp from './InvitePopUp'


const Settings = () => {

  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const userData = useSelector(user_data)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Items = [
    {
      title: Translate.t("notifications"),
      image: NotificationImg,
      screenName: "notifications"
    },
    {
      title: Translate.t("privacy"),
      image: PrivacyImg,
      screenName: "privacy"
    },
    {
      title: Translate.t("faq"),
      image: HelpImg,
      screenName: "helpCenter"
    },
    {
      title: Translate.t("about_us"),
      image: InfoImg,
      screenName: "aboutUs"
    },
    {
      title: Translate.t("refer_earn"),
      image: ShareImg,
      screenName: "refer"
    },
    {
      title: Translate.t("contact_us"),
      image: CallImg,
      screenName: "contactUs"
    },
    {
      title: Translate.t("logout"),
      image: LogoutImg,
      screenName: "logout"
    },
  ]

  /* Clear all stored data & Logout  */
  const goToLogin = async () => {
    removeAllData(() => {
      resetScreen('Login')
      dispatch(storeUserData(null))

    }, (error) => {
      console.log("Remove Data from Async Error : " + error)
    })
  }

  // Action Methods
  const btnTap = (item) => {

    if (item.screenName == "aboutUs") {
      navigate("AboutUs")
    }
    else if (item.screenName == "refer") {
      toggleModal()
    }
    else if (item.screenName == "helpCenter") {
      navigate("HelpCenter")
    }
    else if (item.screenName == "contactUs") {
      navigate("ContactUs")
    }
    else if (item.screenName == "privacy") {
      navigate("PrivacyPolicy")
    }
    else if (item.screenName == "notifications"){
      navigate("Notification")
    }
    else if (item.screenName == "logout") {
      Alert.alert(
        Translate.t('alert'),
        Translate.t('are_you_sure_logout'),
        [
          { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'destructive' },
          {
            text: 'Yes',
            onPress: () => {
              goToLogin()
            }
          },
        ],
        { cancelable: true }
      );
    }
  }


  const btnShareTap = () => {
    const result = Share.share({
      title: Translate.t('appName'),
      message: 'Check this out amazing app ' + Translate.t('appName') + ', Download & join to this app.',
      url: Platform.OS == 'ios' ? IOS_APP_LINK : ANDROID_APP_LINK
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType               
      } else {
        // shared
      }
    }
    else if (result.action === Share.dismissedAction) {
      // dismissed            
    }
  }

  return (
    <HeaderView title={Translate.t("settings")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>


      <FlatList
        data={Items}
        scrollEnabled={false}
        ListHeaderComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pixelSizeHorizontal(15) }}
            onPress={() => btnTap(item)}>

            <FastImage
              style={{ width: widthPixel(40), height: widthPixel(40) }}
              resizeMode="contain"
              source={item.image}
            />
            <Text style={styles.textTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />


      <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} referralcode={userData?.user?.referral_code} />

    </HeaderView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: FontSize.FS_18,
    color: black,
    fontFamily: SEMIBOLD,
    marginLeft: pixelSizeHorizontal(15)
  },
  textModalTitle: {
    fontSize: FontSize.FS_27,
    color: greenPrimary,
    fontFamily: SEMIBOLD,
    textAlign: 'center'
  },
  textDesc: {
    fontSize: FontSize.FS_14,
    color: black,
    fontFamily: MEDIUM,
    marginTop: pixelSizeHorizontal(20)
  },
  btnShareStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPixel(8),
    marginTop: pixelSizeHorizontal(30)
  },
  btnShareText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
    textTransform: 'uppercase',
  }
})

export default Settings