import { View, Text, StyleSheet, Pressable, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Translate from '../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { goBack, resetScreen } from '../navigations/RootNavigation'
import { black, greenPrimary, seprator, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LoadingView from '../commonComponents/LoadingView'
import ApiManager from '../commonComponents/ApiManager'
import { GET_OTP, LOGIN, REGISTER } from '../constants/ApiUrl'
import { getData, storeData } from '../commonComponents/AsyncManager'
import { BEARER_TOKEN, FCM_TOKEN, USER_DATA } from '../constants/ConstantKey'
import { storeUserData } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import crashlytics from '@react-native-firebase/crashlytics';
import { FooterImage } from '../constants/Images'
import FastImage from 'react-native-fast-image'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const OtpView = ({ route }) => {
    const dispatch = useDispatch()

    // console.log("OTP SCREEN USER DATA :", route.params.data)
    const [isLoading, setIsLoading] = useState(false)
    const [optcode, setOptcode] = useState("")
    const [Userdata, setUserdata] = useState(route.params.data)
    const [mobile, setMobile] = useState(route.params.data.mobile)
    const [otp, setOtp] = useState()
    const [fcm_token, setFcmToken] = useState("")
    const [count, setCount] = useState(60)
    const [isResendCode, setIsResendCode] = useState(true)
    const [AlertShow, setAlertShow] = useState(false)
    const [AlertShowSecond, setAlertShowSecond] = useState(false)
    const timerRef = useRef(count);
    var timerId;

    useEffect(() => {

        GetFCM_TOKEN()
        crashlytics().log('App mounted.');
        Api_Otp(true)
        return () => { clearTimer() }
    }, [])

    const GetFCM_TOKEN = () => {

        getData(FCM_TOKEN, (data) => {
            console.log("FCM_TOKEN", data)
            setFcmToken(data)
        })
    }

    // const AlertActive = () => {
    //     setAlertShow(!AlertShow);
    // };
    // const AlertActiveSecond = () => {
    //     setAlertShowSecond(!AlertShowSecond);
    // };

    const Api_Otp = (isLoad) => {
        console.log("mobile", typeof Number(mobile))
        setIsLoading(isLoad)
        ApiManager.post(GET_OTP, {
            phone: Number(mobile),
        }).then((response) => {
            console.log("Api_Otp : ", response)
            setIsLoading(false)

            var data = response.data;
            if (data.status == true) {
                console.log("API OTP", data.otp_val)
                setOtp(data.otp_val)
                setCount(60)
                timerRef.current = 60
                setIsResendCode(false)
                timerId = setInterval(() => {
                    timerRef.current -= 1;
                    console.log("count : " + timerRef.current)
                    if (timerRef.current < 0) {
                        console.log("timerId", timerId)
                        clearInterval(timerId);
                        setIsResendCode(true)
                        clearTimer()
                    } else {
                        setCount(timerRef.current);
                    }
                }, 1000);

            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: data.message,
                    button: 'Ok',
                  })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Otp Error ", err);
        })
    }
    const Api_Login = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(LOGIN, {
            phone: data.mobile,
            device_id: fcm_token,
            device_type: Platform.OS === "android" ? 0 : 1
        }).then((response) => {
            console.log("Api_Login : ", response)
            setIsLoading(false)

            var data = response.data;
            if (data.status == true) {

                var user_data = data.data

                storeData(USER_DATA, user_data, () => {

                    storeData(BEARER_TOKEN, user_data.token)

                    dispatch(storeUserData(user_data))

                    resetScreen("Dashboard")
                })

            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: data.message,
                    button: 'Ok',
                  })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_login Error ", err);
        })
    }

    const Api_Register = (isLoad, data) => {
        console.log("data", data)
        setIsLoading(isLoad)
        let body = new FormData();

        body.append('first_name', data.firstname)
        body.append('last_name', data.lastname)
        body.append('phone', data.mobile)
        body.append('city', data.city)
        body.append('area', data.area)
        body.append('pincode', data.pincode)
        body.append('referral_code', data.referralcode)
        body.append('avatar', null)
        body.append('device_id', fcm_token)
        body.append('device_type', Platform.OS === "android" ? 0 : 1)


        ApiManager.post(REGISTER, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log("Api_Register : ", JSON.stringify(response))
            setIsLoading(false)

            var data = response.data;
            if (data.status == true) {
                var user_data = data.data

                storeData(USER_DATA, user_data, () => {

                    storeData(BEARER_TOKEN, user_data.token)

                    dispatch(storeUserData(user_data))

                    resetScreen("Dashboard")
                })


            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: data.message,
                    button: 'Ok',
                  })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Register Error ", err);
        })
    }

    const btnSubmitTap = async () => {
        if (optcode.length == 6) {
            console.log("otp api", otp)
            console.log("optcode value", optcode)
            if (otp == optcode) {
                if (Userdata.isFrom == "Login") {
                    Api_Login(true, Userdata)
                } else {
                    Api_Register(true, Userdata)
                }
            }
            else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: "Please Enter Valid OTP",
                    button: 'Ok',
                  })
                // AlertActive()
            }
        }
        else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: Translate.t('alert'),
                textBody: "Please Enter  OTP",
                button: 'Ok',
              })
            // AlertActiveSecond()
        }
    }
    // Action Methods

    const btnResendTap = () => {
        Api_Otp(true)
        setOptcode('')
    }

    const clearTimer = () => {
        console.log("intialvalue", timerId)
        for (var i = 0; i < 10000; i++) {
            clearInterval(i)
        }
    }

    return (
        <>
            <HeaderView title={Translate.t("enter_otp")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
                onPress={() => goBack()}>

                <View style={{ marginTop: pixelSizeHorizontal(60) }}>


                    <View style={styles.otpView}>
                        <OTPInputView
                            style={{ flex: 1, height: heightPixel(55) }}
                            pinCount={6}
                            code={optcode}
                            onCodeChanged={code => { setOptcode(code) }}
                            autoFocusOnLoad={false}
                            codeInputFieldStyle={styles.borderStyleBase}
                            codeInputHighlightStyle={styles.borderStyleHighLighted}
                            onCodeFilled={(code) => {

                                setOptcode(code)
                                console.log(`Code is ${code}, you are good to go!`)
                            }}
                        />
                    </View>


                    <Pressable
                        onPress={() => btnSubmitTap()}
                        style={styles.btnStyle}>
                        <Text style={styles.btnText}>{Translate.t("submit")}</Text>

                    </Pressable>


                    <View style={{ alignSelf: 'center', marginTop: pixelSizeHorizontal(25) }}>
                        <Text style={styles.textDesc}>
                            {Translate.t("otp_desc")}
                        </Text>
                        {isResendCode ?
                            <TouchableOpacity style={{ marginTop: pixelSizeHorizontal(12) }}
                                onPress={() => { btnResendTap() }} >

                                <Text style={styles.textResend}>
                                    {Translate.t("resend_otp")}
                                </Text>

                            </TouchableOpacity>
                            :
                            <Text style={[styles.textResend, { color: warmGrey, marginTop: pixelSizeHorizontal(10) }]}>
                                Resend OTP in 00:{count}
                            </Text>}
                    </View>

                </View>
                <View style={{ position: "absolute", bottom: pixelSizeHorizontal(40), left: 0, right: 0, alignItems: "center" }}>
                    <FastImage
                        source={FooterImage}
                        style={{ width: "40%", height: 30 }}
                        resizeMode={'contain'}
                    />
                </View>

            </HeaderView>
            {/* <AlertView
                isAlertVisible={AlertShow}
                toggleAlert={() => AlertActive()}
                title={Translate.t('alert')}
                description={"Please Enter Valid OTP"}
                type="error"
                cancleText="Ok"
                onCancel={() => { setAlertShow(false) }}
            />
            <AlertView
                isAlertVisible={AlertShowSecond}
                toggleAlert={() => AlertActiveSecond()}
                title={Translate.t('alert')}
                description={"Please Enter OTP"}
                type="error"
                cancleText="Ok"
                onCancel={() => { setAlertShowSecond(false) }}
            /> */}
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
    textDesc: {
        color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
    textResend: {
        color: greenPrimary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16,
        textAlign: 'center',
    },
    otpView: {
        alignItems: 'center',
        // marginHorizontal: pixelSizeHorizontal(30),
    },
    borderStyleBase: {
        borderWidth: 2, borderColor: seprator, height: heightPixel(55),
        fontSize: FontSize.FS_22, fontFamily: REGULAR, borderRadius: 5,
        color: black,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: seprator,
        marginHorizontal: 5
    },
    borderStyleHighLighted: {
        borderColor: greenPrimary, fontSize: FontSize.FS_22, height: heightPixel(55),
        fontFamily: REGULAR, color: black,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default OtpView