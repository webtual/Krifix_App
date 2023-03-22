import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { black, greenPrimary, offWhite, warmGrey, white } from '../constants/Color'
import HeaderView from '../commonComponents/HeaderView'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { navigate, resetScreen } from '../navigations/RootNavigation'
import { FooterImage, PhoneImg } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ApiManager from '../commonComponents/ApiManager'
import { CHECK_MOBILE, LOGIN } from '../constants/ApiUrl'
import { useDispatch } from 'react-redux'
import { storeUserData } from '../redux/reducers/userReducer'
import { storeData } from '../commonComponents/AsyncManager'
import { FCM_TOKEN, USER_DATA } from '../constants/ConstantKey'
import LoadingView from '../commonComponents/LoadingView'

import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'


const Login = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState("")
    const [fcm_token, setFcmToken] = useState("")

    useFocusEffect(
        useCallback(() => {
            if (Platform.OS === "android") {
                getFCMToken()
            }
            else {
                requestUserPermission()
            }
        }, [])
    );


    // useEffect(() =>{
    //     messaging().onNotificationOpenedApp(remoteMessage => {

    //         console.log("remoteMessage 1",remoteMessage);

    //         let data = remoteMessage.data
    //         console.log("data".data)
    //                 navigate("Notification");
    //     })

    //     messaging().getInitialNotification()
    //     .then(remoteMessage => {
    //         console.log("remoteMessage 2",remoteMessage)
    //         if (remoteMessage) {
    //             let data = remoteMessage.data
    //             console.log("data",data)
    //                 navigate("Notification");


    //         }
    //     });


    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         console.log("remoteMessage 3"+ JSON.stringify(remoteMessage));
    //     });


    //     return unsubscribe

    // },[])


    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {

            console.log('Authorization status:', authStatus);

            getFCMToken()

        } else {
            await messaging().requestPermission({
                sound: true,
                alert: true,
                badge: true,
                announcement: true,
            });
        }
    }
    const getFCMToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("FCM TOKEN : ", fcmToken);
            setFcmToken(fcmToken)

            storeData(FCM_TOKEN, fcmToken)
        }
    }

    const btnSignUpTap = () => {
        navigate("Register")
    }
    const LoginSchema = Yup.object().shape({
        mobile: Yup.string()
            .min(10, '* Phone number is not valid')
            .required("* Mobile number cannot be empty"),
    });


    const loginData = (value) => {
        console.log("value", value)
        setMobile(value.mobile)
        Api_Check_mobile(true, value)
    }

    const Api_Check_mobile = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(CHECK_MOBILE, {
            phone: data.mobile,
        }).then((response) => {
            console.log("Api_Check_mobile : ", response)
            setIsLoading(false)


            if (response.data.status == true) {

                var dict = data
                dict["isFrom"] = "Login"
                navigate("OtpView", { data: dict })

            } else {
                alert(response.data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Check_mobile Error ", err);
        })
    }



    return (
        <>
            <HeaderView title={Translate.t("login")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
                <Formik
                    initialValues={{
                        mobile: mobile,
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={values => { loginData(values) }
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: pixelSizeHorizontal(60) }}>

                            <TextInputView
                                imageSource={PhoneImg}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                value={values.mobile}
                                placeholder={Translate.t("mobile")}
                                maxLength={10}
                                keyboardType={'number-pad'}
                            />
                            {(errors.mobile && touched.mobile) &&
                                <Text style={styles.errorText}>{errors.mobile}</Text>
                            }
                            <Pressable
                                onPress={handleSubmit}
                                style={styles.btnStyle}>
                                <Text style={styles.btnText}>{Translate.t("login")}</Text>

                            </Pressable>

                            <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: pixelSizeHorizontal(25) }}>
                                <Text style={styles.text}>
                                    {Translate.t("new_to_krifix")}
                                </Text>
                                <TouchableOpacity onPress={() => btnSignUpTap()}>
                                    <Text style={styles.textSignUp}>
                                        {Translate.t("sign_up")}
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    )}
                </Formik>
                <View style={{ position: "absolute", bottom: pixelSizeHorizontal(40) ,left:0,right:0,alignItems:"center"}}>
                    <FastImage
                        source={FooterImage}
                        style={{ width: "40%", height: 30 }}
                        resizeMode={'contain'}
                    />
                </View>
            </HeaderView>

            {isLoading && <LoadingView />}
        </>
    )
}


const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthPixel(8),
        marginTop: pixelSizeHorizontal(40)
    },
    btnText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_22,
        textTransform: 'uppercase',
    },
    text: {
        color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
    textSignUp: {
        color: greenPrimary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16
    },
    errorText: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_10,
        color: 'red',
        marginLeft: pixelSizeHorizontal(40)
    },
})

export default Login