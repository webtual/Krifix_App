import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { black, greenPrimary, offWhite, warmGrey, white } from '../constants/Color'
import HeaderView from '../commonComponents/HeaderView'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import { BuildingImg, FooterImage, LocationImg, PhoneImg, PinImg, ReferralImg, SmileImg } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ApiManager from '../commonComponents/ApiManager'
import { getData, storeData } from '../commonComponents/AsyncManager'
import { REFFERAL_KEY, USER_DATA } from '../constants/ConstantKey'
import { storeUserData } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import { CHECK_MOBILE, REGISTER } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const Register = ({route}) => {
    // console.log("route",route.params.mobile)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState(route?.params?.mobile || "")
    const [firstName, setFirstname] = useState("")
    const [lastname, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [area, setArea] = useState("")
    const [pincode, setPincode] = useState("")
    const [referralcode, serRefferalCode] = useState("")
    const [userData, setUserData] = useState()


useEffect(() =>{
    Get_ReferralCode()
},[])



    const Get_ReferralCode = () => {

        getData(REFFERAL_KEY, (data) => {
            console.log("REFFERAL_KEY", data)
            serRefferalCode(data)
        })
    }

    const Api_Check_mobile = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(CHECK_MOBILE, {
            phone: data.mobile,
        }).then((response) => {
            console.log("Api_Check_mobile : ", response)
            setIsLoading(false)

            if (response.data.status == false) {

                var dict = data
                dict["isFrom"] = "Register"
                navigate("OtpView", { data: dict })

            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: data.mobile + " is already registered with us",
                    button: 'Ok',
                  })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Check_mobile Error ", err);
        })
    }


    const btnSignUpTap = (value) => {
        console.log("User Data Register :", value)
        setUserData(value)
        Api_Check_mobile(true, value)
    }

    const btnLoginTap = () => {
        navigate("Login")
    }


    const SignupSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, '* Too Short!')
            .max(50, '* Too Long!')
            .required('* Please enter first name'),
        lastname: Yup.string()
            .min(2, '* Too Short!')
            .max(50, '* Too Long!')
            .required('* Please enter last name'),
        mobile: Yup.string()
            .min(10, '* Phone number is not valid')
            .required("* Please enter mobile number"),
        city: Yup.string()
            .min(2, '* Too Short!')
            .max(20, '* Too Long!')
            .required('* Please enter city'),
        area: Yup.string()
            .min(2, '* Too Short!')
            .max(30, '* Too Long!')
            .required('* Please enter area'),
        pincode: Yup.string()
            .min(6, '* Enter 6 digit pincode')
            .required('* Please enter pincode'),
        // referralcode: Yup.string()
        //     .min(6, '* Enter 6 character referral code')
        //     .required('* Referral code cannot be empty'),


    });
    return (
        <>
            <HeaderView title={Translate.t("sign_up")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
                onPress={() => goBack()}>

                <Formik
                enableReinitialize
                    initialValues={{
                        firstname: firstName,
                        lastname: lastname,
                        mobile: mobile,
                        city: city,
                        area: area,
                        pincode: pincode,
                        referralcode: referralcode,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => { btnSignUpTap(values) }
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginVertical: pixelSizeHorizontal(20) }}>

                            <TextInputView
                                imageSource={SmileImg}
                                value={values.firstname}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                placeholder={Translate.t("first_name")}
                            />
                            {(errors.firstname && touched.firstname) &&
                                <Text style={styles.errorText}>{errors.firstname}</Text>
                            }
                            <TextInputView
                                imageSource={SmileImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.lastname}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                placeholder={Translate.t("last_name")}
                            />
                            {(errors.lastname && touched.lastname) &&
                                <Text style={styles.errorText}>{errors.lastname}</Text>
                            }
                            <TextInputView
                                imageSource={PhoneImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.mobile}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                placeholder={Translate.t("mobile")}
                                keyboardType={'number-pad'}
                                maxLength={10}
                            />
                            {(errors.mobile && touched.mobile) &&
                                <Text style={styles.errorText}>{errors.mobile}</Text>
                            }
                            <TextInputView
                                imageSource={BuildingImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.city}
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                placeholder={Translate.t("city")}
                            />
                            {(errors.city && touched.city) &&
                                <Text style={styles.errorText}>{errors.city}</Text>
                            }

                            <TextInputView
                                imageSource={LocationImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.area}
                                onChangeText={handleChange('area')}
                                onBlur={handleBlur('area')}
                                placeholder={Translate.t("area")}
                            />
                            {(errors.area && touched.area) &&
                                <Text style={styles.errorText}>{errors.area}</Text>
                            }

                            <TextInputView
                                imageSource={PinImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.pincode}
                                onChangeText={handleChange('pincode')}
                                onBlur={handleBlur('pincode')}
                                placeholder={Translate.t("pincode")}
                                keyboardType={'number-pad'}
                                maxLength={6}
                            />
                            {(errors.pincode && touched.pincode) &&
                                <Text style={styles.errorText}>{errors.pincode}</Text>
                            }

                            <TextInputView
                                imageSource={ReferralImg}
                                containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                                value={values.referralcode}
                                onChangeText={handleChange('referralcode')}
                                onBlur={handleBlur('referralcode')}
                                placeholder={Translate.t("referralcode")}
                                maxLength={8}
                            />
                            {(errors.referralcode && touched.referralcode) &&
                                <Text style={styles.errorText}>{errors.referralcode}</Text>
                            }


                            <Pressable
                                onPress={handleSubmit}
                                style={styles.btnStyle}>
                                <Text style={styles.btnText}>{Translate.t("sign_up")}</Text>

                            </Pressable>

                            <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: pixelSizeHorizontal(25) }}>
                                <Text style={styles.text}>
                                    {Translate.t("already_Registered")}
                                </Text>
                                <TouchableOpacity onPress={() => btnLoginTap()}>
                                    <Text style={styles.textSignUp}>
                                        {Translate.t("login")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
                <View style={{marginVertical:pixelSizeHorizontal(40), alignItems:"center"}}>
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

export default Register