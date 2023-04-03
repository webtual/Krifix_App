import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
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
    console.log("data: " + JSON.stringify(route.params.frontImg.path))
    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)
    const [frontImg, setFrontImg] = useState(route?.params?.frontImg)
    const [backIMg, setBackImg] = useState(route?.params?.backImg)
    const [takeImg, setTakeImg] = useState("")
    const [viewImgData, setViewImgData] = useState("");
    const [imgView, setImgView] = useState(false);




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
            console.log("Api_Kyc_Process : ", response)
            setIsLoading(false)
            var data = response.data;
            console.log("data", data)
            if (data.status == true) {
                navigate("KycVerify")
            //     if (userData.user.is_kyc_verify == 2) {
            //         Api_Get_Profile(true)
            //         Toast.show({
            //             type: ALERT_TYPE.SUCCESS,
            //             title: Translate.t('success'),
            //             textBody: "UPI id add successfully",
            //             button: 'Ok',
            //         })
            //         goBack()
            //     }
            //     else {
            //         Api_Get_Profile(true)
            //         Toast.show({
            //             type: ALERT_TYPE.SUCCESS,
            //             title: Translate.t('success'),
            //             textBody: "UPI id add successfully",
            //             button: 'Ok',
            //         })
            //         navigate('KycIntro')
            //     }
            // } else {
            //     Dialog.show({
            //         type: ALERT_TYPE.DANGER,
            //         title: Translate.t('alert'),
            //         textBody: data.message,
            //         button: 'Ok',
            //     })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Kyc_Process Error ", err.message);
        })
    }

    const VerifyButton = () => {
        if (frontImg !== "" && backIMg !== "" && takeImg !== "")
            Api_Kyc_Process(true)
        // navigate("KycVerify")
    }
 

    const takeImage = () => {
        ImagePicker.openCamera({
            useFrontCamera: false,
            cropping: true,
            freeStyleCropEnabled: true,
            multiple: false,
            mediaType: 'photo',
            includeBase64: false,
            multipleShot: false,
            compressImageQuality: 0.7
        }).then(images => {
            console.log("Selected Image : " + JSON.stringify(images))
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
                    {takeImg == "" ? <FastImage
                        source={Selfie1x}
                        style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                        resizeMode={'cover'}
                    /> :
                        <>
                            <FastImage
                                style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                                source={{ uri: takeImg.path }}
                            />
                            <TouchableOpacity onPress={() => {
                                setImgView(true)
                                setViewImgData(takeImg.path)
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
                                <FastImage tintColor={white}
                                    style={{ width: 20, height: 20, }}
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
                    onPress={() => { takeImg == "" ? takeImage() : VerifyButton() }}
                    style={{
                        backgroundColor: takeImg == "" ? black : greenPrimary,
                        padding: pixelSizeHorizontal(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: widthPixel(8),
                        marginVertical: pixelSizeHorizontal(30)
                    }}>
                    <Text style={styles.btnSaveText} >{takeImg == "" ? "Take your selfie" : "Verify"}</Text>

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