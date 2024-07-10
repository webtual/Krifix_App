import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button, Pressable, Share, Image } from 'react-native'
import React, { useState } from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import { black, greenPrimary, offWhite, paleGreen, white } from '../constants/Color'
import { CallImg, Delete, HelpImg, HomeFillImg, InfoImg, LogoutImg, NotificationImg, PrivacyImg, ShareBoxImg, ShareImg } from '../constants/Images'
import { removeAllData } from '../commonComponents/AsyncManager'
import { navigate, resetScreen } from '../navigations/RootNavigation'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "react-native-modal";
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import InvitePopUp from './InvitePopUp'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification'
import { DELETE_ACCOUNT } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import ApiManager from '../commonComponents/ApiManager'
const Settings = () => {

  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [AlertShow, setAlertShow] = useState(false)
  const userData = useSelector(user_data)
  console.log("userData :::::",userData.user.id)
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
    {
      title: Translate.t("delete_account"),
      image: Delete,
      screenName: "deleteAccount"
    },
  ]

  // const AlertActive = () => {
  //   setAlertShow(!AlertShow);
  // };

  /* Clear all stored data & Logout  */
  const goToLogin = async () => {
    removeAllData(() => {
      resetScreen('Login')
      dispatch(storeUserData(null))

    }, (error) => {
     // console.log("Remove Data from Async Error : " + error)
    })
  }



 
  const Api_Delete_Account = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.get(DELETE_ACCOUNT).then((response) => {
        console.log("Api_Delete_Account : ", response)
        setIsLoading(false)
        if (response.data.status == true) {
          goToLogin()
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: Translate.t('success'),
                textBody: response.data.message,
                button: 'Ok',
            })
        }
        else {

        }

    }).catch((err) => {
        setIsLoading(false)
        console.error("Api_Get_Profile Error ", err);
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
    else if (item.screenName == "notifications") {
      navigate("Notification")
    }
    else if (item.screenName == "logout") {
      // AlertActive()
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: Translate.t('warning'),
        textBody: Translate.t('are_you_sure_logout'),
        button: 'Logout',
        onPressButton: ()=> {
            Dialog.hide();
            goToLogin()
           //console.log("Logout successfully")
          },

      })
    }
    else if (item.screenName == "deleteAccount") {
      // AlertActive()
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: Translate.t('alert'),
        textBody: Translate.t('are_you_sure_delete'),
        button: 'Delete',
        onPressButton: ()=> {
            Dialog.hide();
            Api_Delete_Account(true)
          },

      })
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
    <>
    <HeaderView title={Translate.t("settings")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>


      <FlatList
        data={Items}
        scrollEnabled={false}
        ListHeaderComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pixelSizeHorizontal(15) }}
            onPress={() => btnTap(item)}>

            <Image
              style={{ width: widthPixel(40), height: widthPixel(40),  resizeMode : 'contain' }}
              source={item.image}
            />
            <Text style={styles.textTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />


      <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} referralcode={userData?.user?.referral_code} />
      {/* <AlertView
      // show={AlertShow}
        isAlertVisible={AlertShow}
        toggleAlert={() => AlertActive()}
        title={Translate.t('alert')}
        description={Translate.t('are_you_sure_logout')}
        type="warning"
        successText="Yes"
        cancleText="No"
        onSucess={() => { goToLogin() }}
        onCancel={() => { setAlertShow(false) }} /> */}

    </HeaderView>
    {isLoading && <LoadingView />}
    </>
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