import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, black05, disableColor, greenPrimary, paleGreen, primary, transparent, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, AppLogoImg, Bank, Branch, BuildingImg, Camera, CardId, Check, FooterImage, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, Selfie, SmileImg, Success, ThankYou, Upi } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { BEARER_TOKEN, SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE, UPDATE_BANK, UPDATE_PROFILE, UPDATE_UPI } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { storeData } from '../commonComponents/AsyncManager'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'


const KycVerify = () => {

    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)


    const Api_Get_Profile = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_PROFILE).then((response) => {
          // console.log("Api_Get_Profile : ", response)
          setIsLoading(false)
          if (response.data.status == true) {
            var user_data = response.data.data
            // console.log("user_data ::::", user_data)
            storeData(USER_DATA, user_data, () => {
                storeData(BEARER_TOKEN, user_data.token)
                dispatch(storeUserData(user_data))
            })
            resetScreen("Dashboard")
            // console.log("GET PROFILE SUCCESSFULLY")
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: Translate.t('alert'),
              textBody: response.data.message,
              button: 'Ok',
            })
          }
    
        }).catch((err) => {
          setIsLoading(false)
          console.error("Api_Get_Profile Error ", err);
        })
      }

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
            <HeaderView title={"Congratulation!"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
            <View style={{ marginVertical: pixelSizeHorizontal(25), alignItems: "center" }}>
                    <FastImage
                        source={AppLogoImg}
                        style={{ width: "40%", height: 30 }}
                        resizeMode={'contain'}
                    />
                </View>
                <FastImage
                    source={ThankYou}
                    style={{ width: "100%", height: SCREEN_WIDTH/1.3 }}
                    resizeMode={'contain'}
                />
                   <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_28, color: black,textAlign:"center" }}>Thank you!</Text>
                   <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: warmGrey,textAlign:"center",marginTop:10 }}>{"Your KYC documents has been submitted."  }</Text>
                <Pressable
                    onPress={() => { Api_Get_Profile(true) }}
                    style={styles.KYCBtn}>
                    <Text style={styles.btnSaveText} >complete KYC</Text>

                </Pressable>
            </HeaderView>
            {isLoading && <LoadingView />}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  KYCBtn: {
    backgroundColor: greenPrimary,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPixel(8),
    marginVertical: pixelSizeHorizontal(20),
  },
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        borderRadius: widthPixel(20),
        width: '70%'
    },
    btnText: {
        fontFamily: MEDIUM,
        color: white,
        fontSize: FontSize.FS_12,
        textTransform: 'uppercase',
    },
    textTitle: {
        fontFamily: MEDIUM,
        color: warmGrey,
        fontSize: FontSize.FS_14,
    },
    textHeader: {
        fontFamily: SEMIBOLD,
        color: greenPrimary,
        fontSize: FontSize.FS_20,
    },
    btnSaveStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthPixel(8),
        marginBottom: pixelSizeHorizontal(30)
    },
    btnSaveText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_16,
        textTransform: 'uppercase',
    },
    errorText: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_10,
        color: 'red',
        marginLeft: pixelSizeHorizontal(40)
    },
})

export default KycVerify