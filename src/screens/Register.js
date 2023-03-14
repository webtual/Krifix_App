import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, greenPrimary, offWhite, warmGrey, white } from '../constants/Color'
import HeaderView from '../commonComponents/HeaderView'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import { BuildingImg, LocationImg, PhoneImg, PinImg, SmileImg } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';

const userData = ''
const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState("")
    const [firstName, setFirstname] = useState("")
    const [lastname, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [area, setArea] = useState("")
    const [pincode, setPincode] = useState("")

    const btnSignUpTap = (value) => {
      const   userData = value
        console.log("User Data :",userData)
    }

    const btnLoginTap = () => {
        navigate("Login")
      }
  
  
    const SignupSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, '* Too Short!')
            .max(50, '* Too Long!')
            .required('* First name cannot be empty'),
        lastname: Yup.string()
            .min(2, '* Too Short!')
            .max(50, '* Too Long!')
            .required('* Last name cannot be empty'),
        mobile: Yup.string()
            .min(10, '* Phone number is not valid')
            .required("* Mobile number cannot be empty"),
        city: Yup.string()
            .min(2, '* Too Short!')
            .max(20, '* Too Long!')
            .required('* City cannot be empty'),
        area: Yup.string()
            .min(2, '* Too Short!')
            .max(30, '* Too Long!')
            .required('* Area cannot be empty'),
        pincode: Yup.string()
            .min(6, '* Enter 6 digit pincode')
            .required('* Pincode cannot be empty'),

    });
    return (

        <HeaderView title={Translate.t("sign_up")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <Formik
                initialValues={{
                    firstname: firstName,
                    lastname: lastname,
                    mobile: mobile,
                    city: city,
                    area: area,
                    pincode: pincode
                }}
                validationSchema={SignupSchema}
                onSubmit={values => 
                   { btnSignUpTap(values)}
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

        </HeaderView>


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
        marginLeft:pixelSizeHorizontal(40)
    },
})

export default Register