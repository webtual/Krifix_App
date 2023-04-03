import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, black05, disableColor, greenPrimary, light_grey, paleGreen, primary, transparent, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, AppLogoImg, Back, Bank, Branch, BuildingImg, Camera, CardId, Check, Eye, FooterImage, Front, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, Selfie, SmileImg, Success, Upi } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE, UPDATE_BANK, UPDATE_PROFILE, UPDATE_UPI } from '../constants/ApiUrl'
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



const UploadDocument = () => {

    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)
    const [frontImg, setFrontImg] = useState("")
    const [backImg, setBackImg] = useState("")
    const [index, setIndex] = useState(1)
    const [imgView, setImgView] = useState(false);
    const [viewImgData, setViewImgData] = useState("");

    const UploadImage = (isFront) => {
        console.log("value", isFront)
        Alert.alert("Select from", "Upload your document", [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Gallery',
                onPress: () => {
                    setIsLoading(true)
                    ImagePicker.openPicker({
                        multiple: false,
                        freeStyleCropEnabled: true,
                        cropping: true,
                        mediaType: 'photo',
                        includeBase64: false,
                        compressImageQuality: 0.7
                    }).then(images => {
                        console.log("Selected Image  " + JSON.stringify(images))
                        if (isFront) {
                            console.log("images.path", images)
                            setFrontImg(images)
                        }
                        else {
                            setBackImg(images)
                        }
                        setIsLoading(false)
                    }).catch((error) => {
                        setIsLoading(false)
                        Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: Translate.t('alert'),
                            textBody: "Please allow permission for getting images from your mobile",
                            onPressButton:  Linking.openSettings,
                            button: 'GO TO SETTING',
                          })
                        console.log("error:",error)
                    });
                }
            },
            {
                text: 'Camera',
                onPress: () => {
                    setIsLoading(true)
                    ImagePicker.openCamera({
                        cropping: true,
                        freeStyleCropEnabled: true,
                        multiple: false,
                        mediaType: 'photo',
                        includeBase64: false,
                        multipleShot: false,
                        compressImageQuality: 0.7
                    }).then(images => {
                        console.log("Selected Image : " + JSON.stringify(images))
                        if (isFront) {
                            setFrontImg(images)
                        }
                        else {
                            setBackImg(images)
                        }
                        setIsLoading(false)


                    }).catch((error) => {
                        setIsLoading(false)
                        Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: Translate.t('alert'),
                            textBody: "Please allow permission for getting images from your mobile",
                            onPressButton: () => {Linking.openSettings},
                            button: 'GO TO SETTING',
                          })
                        console.log(error)
                    });

                },
                style: 'default'
            },
        ])

    }


    const UploadButton = () => {
        if (frontImg !== "" && backImg !== "") {
            navigate("TakeSelfie", { frontImg: frontImg, backImg: backImg })
        }
        else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: Translate.t('alert'),
                textBody: "Please upload your KYC documents",
                button: 'Ok',
            })
        }

    }



    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
            <HeaderView title={"Upload document"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
                <View style={{ alignItems: "center", margin: pixelSizeHorizontal(20) }}>
                    <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_20, color: warmGrey }}>One time Verification</Text>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setIndex(1)}
                        style={{
                            borderColor: greenPrimary,
                            borderWidth: 2,
                            padding: 5,
                            borderRadius: 8,
                            alignItems: "center",
                            backgroundColor: index === 1 ? greenPrimary : transparent
                        }}>
                        <Text
                            style={{
                                fontFamily: REGULAR,
                                fontSize: FontSize.
                                    FS_12, color: index === 1 ? white : black
                            }}> Addharcard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(2)}
                        style={{
                            borderColor: greenPrimary,
                            borderWidth: 2,
                            padding: 5,
                            borderRadius: 8,
                            alignItems: "center",
                            marginHorizontal: 10,
                            backgroundColor: index === 2 ? greenPrimary : transparent
                        }}>
                        <Text
                            style={{
                                fontFamily: REGULAR,
                                fontSize: FontSize.FS_12,
                                color: index === 2 ? white : black
                            }}> Pancard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(3)}
                        style={{
                            borderColor: greenPrimary,
                            borderWidth: 2,
                            padding: 5,
                            borderRadius: 8,
                            alignItems: "center",
                            backgroundColor: index === 3 ? greenPrimary : transparent
                        }}>
                        <Text
                            style={{
                                fontFamily: REGULAR,
                                fontSize: FontSize.FS_12,
                                color: index === 3 ? white : black
                            }}> Driving licence</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 25, marginBottom: 5, color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_14 }}>1. Front side of your document</Text>
                <TouchableOpacity onPress={() => { UploadImage(true) }}
                    style={{
                        width: "100%",
                        backgroundColor: transparent,
                        height: SCREEN_WIDTH / 2.2,
                        borderRadius: 8,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: disableColor,
                    }}>
                    {frontImg == "" ? <FastImage
                        source={Front}
                        style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                        resizeMode={'cover'}
                    /> :
                        <>
                            <FastImage
                                style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                                source={{ uri: frontImg.path }}
                            />
                            <TouchableOpacity onPress={() => {
                                setImgView(true)
                                setViewImgData(frontImg.path)
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
                </TouchableOpacity>
                <Text style={{ marginTop: 20, marginBottom: 5, color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_14 }}>2. Back side of your document</Text>

                <TouchableOpacity onPress={() => { UploadImage() }}
                    style={{
                        width: "100%",
                        backgroundColor: transparent,
                        height: SCREEN_WIDTH / 2,
                        borderRadius: 8,
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: disableColor,
                    }}>
                    {backImg == "" ? <FastImage
                        source={Back}
                        style={{ width: "100%", height: "100%", borderRadius: 8, flex: 1 }}
                        resizeMode={'cover'}
                    /> :
                        <>
                            <FastImage
                                style={{ width: "100%", height: "100%", borderRadius: 8, }}
                                source={{ uri: backImg.path }}
                            />
                            <TouchableOpacity onPress={() => {
                                setImgView(true)
                                setViewImgData(backImg.path)
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
                </TouchableOpacity>

                <ImageView
                    animationType={"fade"}
                    images={[{ uri: viewImgData }]}
                    imageIndex={0}
                    visible={imgView}
                    onRequestClose={() => setImgView(false)}
                />

                <Pressable
                    onPress={() => UploadButton()}
                    style={{
                        backgroundColor: greenPrimary,
                        padding: pixelSizeHorizontal(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: widthPixel(8),
                        marginVertical: pixelSizeHorizontal(30)
                    }}>
                    <Text style={styles.btnSaveText} >Next</Text>

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

export default UploadDocument