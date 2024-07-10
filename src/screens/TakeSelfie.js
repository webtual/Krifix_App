import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, black05, disableColor, greenPrimary, paleGreen, primary, transparent, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, AppLogoImg, Bank, Branch, BuildingImg, Camera, CardId, Check, Eye, FooterImage, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, Selfie, Selfie1x, SmileImg, Success, Upi } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE, UPDATE_BANK, UPDATE_KYC, UPDATE_PROFILE, UPDATE_UPI } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { storeData } from '../commonComponents/AsyncManager'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { goBack, navigate } from '../navigations/RootNavigation'
import ImageView from "react-native-image-viewing";


const TakeSelfie = ({ route }) => {
    // console.log("frontImg: " + JSON.stringify(route.params.frontImg.path))
    // console.log("backImg: " + JSON.stringify(route.params.backImg.path))
    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)
    const [frontImg, setFrontImg] = useState(route?.params?.frontImg)
    const [backIMg, setBackImg] = useState(route?.params?.backImg)
    const [takeImg, setTakeImg] = useState("")
    const [viewImgData, setViewImgData] = useState("");
    const [imgView, setImgView] = useState(false);

    useEffect(() => {
        Api_Get_Profile(true)
    }, [])


    const Api_Get_Profile = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_PROFILE).then((response) => {
            // console.log("Api_Get_Profile : ", response)
            setIsLoading(false)
            if (response.data.status == true) {
                var user_data = response.data.data
               // console.log("user_data", user_data.user.document_front_image)
                setTakeImg({ path: user_data.user.selfie_image == null ? "" : userData.asset_url + user_data.user.selfie_image })
                storeData(USER_DATA, user_data, () => {
                    dispatch(storeUserData(user_data))
                })
               // console.log("GET PROFILE DATA SUCCEESSFULLY")

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



    const Api_Kyc_Process = (isLoad, data) => {
        setIsLoading(isLoad)
        let body = new FormData();
        body.append('document_front_image',
            {
                uri: frontImg.path,
                name: Platform.OS == 'android' ? "image.png" : frontImg.filename,
                type: frontImg.mime
            });
        body.append('document_back_image',
            {
                uri: backIMg.path,
                name: Platform.OS == 'android' ? "image.png" : backIMg.filename,
                type: backIMg.mime
            });
        body.append('selfie_image',
            {
                uri: takeImg.path,
                name: Platform.OS == 'android' ? "image.png" : takeImg.filename,
                type: takeImg.mime
            });

       // console.log("body api", JSON.stringify(body))
        ApiManager.post(UPDATE_KYC, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
           // console.log("Api_Kyc_Process : ", response)
            setIsLoading(false)
            var data = response.data;
          //  console.log("data", data)
            if (data.status == true) {
                navigate("KycVerify")
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Kyc_Process Error ", err.message);
        })
    }

    const VerifyButton = () => {
       // console.log("call verify")
        if (frontImg.path !== "" && backIMg.path !== "" && takeImg.path !== "")

            if (takeImg.path.includes('https')) {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: "Take your selfie again",
                    button: 'Ok',
                })
            }
            else {
                Api_Kyc_Process(true)
                navigate("KycVerify")
            }
    }


    const takeImage = () => {
        ImagePicker.openCamera({
            useFrontCamera: true,
            cropping: false,
            freeStyleCropEnabled: false,
            multiple: false,
            mediaType: 'photo',
            includeBase64: false,
            multipleShot: false,
            compressImageQuality: 0.7
        }).then(images => {
           // console.log("Selected Image : " + JSON.stringify(images))
            setTakeImg(images)

            setIsLoading(false)


        }).catch((error) => {

            setIsLoading(false)
            console.log(error)
        });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
            <HeaderView title={"Take your selfie"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>

                <View
                    style={{
                        width: "100%",
                        backgroundColor: transparent,
                        height: SCREEN_WIDTH,
                        borderRadius: 8,
                        marginTop: 25,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: disableColor,
                    }}>
                    {takeImg?.path == "" ? <Image
                        source={Selfie1x}
                        style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1, resizeMode : 'cover' }}
                        // resizeMode={'cover'}
                    /> :
                        <>
                            <Image
                                style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                                source={{ uri: takeImg?.path }}
                            />
                            <TouchableOpacity onPress={() => {
                                setImgView(true)
                                setViewImgData(takeImg?.path)
                            }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: greenPrimary,
                                    position: "absolute",
                                    right: 10,
                                    top: 10,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Image 
                                // tintColor={white}
                                    style={{ width: 20, height: 20,tintColor : white }}
                                    source={Eye}
                                />
                            </TouchableOpacity>
                        </>
                    }
                </View>


                <ImageView
                    animationType={"fade"}
                    images={[{ uri: viewImgData }]}
                    imageIndex={0}
                    visible={imgView}
                    onRequestClose={() => setImgView(false)}
                />
                <Pressable
                    onPress={() => {  (takeImg?.path == "" || takeImg?.path?.includes('https')) ? takeImage() : VerifyButton() }}
                    style={{
                        backgroundColor: (takeImg?.path == "" || takeImg?.path?.includes('https')) ? black : greenPrimary,
                        padding: pixelSizeHorizontal(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: widthPixel(8),
                        marginVertical: pixelSizeHorizontal(30)
                    }}>
                    <Text style={styles.btnSaveText} >{ (takeImg?.path == "" || takeImg?.path?.includes('https')) ? "Take your selfie" : "Verify"}</Text>

                </Pressable>
                

            </HeaderView>
            {isLoading && <LoadingView />}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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

export default TakeSelfie