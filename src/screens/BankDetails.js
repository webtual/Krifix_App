import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, disableColor, greenPrimary, paleGreen, primary, transparent, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, Bank, Branch, BuildingImg, Camera, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, SmileImg, Upi } from '../constants/Images'
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
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification'
import { goBack, navigate } from '../navigations/RootNavigation'


const BankDetails = () => {

    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(0)

    const [isEdit, setIsEdit] = useState(false)
    const [isDisabled, seIsDisabled] = useState(false)
    const [bankName, setBankName] = useState("")
    const [bankLocation, setBankLocation] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [ifscCode, setIfscCode] = useState("")
    const [upiId, setUpiID] = useState("")
    const [errorMsg, setErrorMsg] = useState()

    useFocusEffect(
        useCallback(() => {
            Api_Get_Profile(true)
        }, [])
    );

    const Api_Get_Profile = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_PROFILE).then((response) => {
            // console.log("Api_Get_Profile : ", response)
            setIsLoading(false)
            if (response.data.status == true) {
                var user_data = response.data.data
                // console.log("user_data", user_data.user.branch_name)
                setBankName(user_data.user.bank_name == null ? "" : user_data.user.bank_name)
                setBankLocation(user_data.user.branch_name == null ? "" : user_data.user.branch_name)
                setAccountNumber(user_data.user.account_no == null ? "" : user_data.user.account_no)
                setIfscCode(user_data.user.ifsc_code == null ? "" : user_data.user.ifsc_code)
                setUpiID(user_data.user.upi_id == null ? "" : user_data.user.upi_id)

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


    const Api_Update_Bank = (isLoad, data) => {
        setIsLoading(isLoad)
        let body = new FormData();
        body.append('bank_name', data.bankName)
        body.append('branch_name', data.bankLocation)
        body.append('account_no', data.accountNumber)
        body.append('ifsc_code', data.ifscCode)

        // console.log("body bank", JSON.stringify(body))
        ApiManager.post(UPDATE_BANK, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            // console.log("Api_Update_Bank : ", response)
            setIsLoading(false)
            var data = response.data;
            if (data.status == true) {
                if (userData.user.is_kyc_verify == 2 || userData.user.is_kyc_verify == 1) {
                    Api_Get_Profile(true)
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: Translate.t('success'),
                        textBody: "Bank details save successfully",
                        button: 'Ok',
                    })
                    goBack()
                }
                else {
                    Api_Get_Profile(true)
                    // Toast.show({
                    //     type: ALERT_TYPE.SUCCESS,
                    //     title: Translate.t('success'),
                    //     textBody: "Bank details add successfully",
                    //     button: 'Ok',
                    // })
                    navigate('KycIntro')
                }


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
            console.error("Api_Update_Bank Error ", err.message);
        })
    }
    const Api_Update_Upi = (isLoad, data) => {
        setIsLoading(isLoad)
        let body = new FormData();
        body.append('upi_id', data)
        // console.log("body api", JSON.stringify(body))
        ApiManager.post(UPDATE_UPI, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            // console.log("Api_Update_Upi : ", response)
            setIsLoading(false)
            var data = response.data;
            if (data.status == true) {
                if (userData.user.is_kyc_verify == 2 || userData.user.is_kyc_verify == 1) {
                    Api_Get_Profile(true)
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: Translate.t('success'),
                        textBody: "UPI ID add successfully",
                        button: 'Ok',
                    })
                    goBack()
                }
                else {
                    Api_Get_Profile(true)
                    // Toast.show({
                    //     type: ALERT_TYPE.SUCCESS,
                    //     title: Translate.t('success'),
                    //     textBody: "UPI id add successfully",
                    //     button: 'Ok',
                    // })
                    navigate('KycIntro')
                }
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
            console.error("Api_Update_Bank Error ", err.message);
        })
    }


    const AddBank = (value) => {
        Api_Update_Bank(true, value)
        // setIsEdit(!isEdit)
        // seIsDisabled(false)
        // navigate("KycIntro") 

    }

    const AddUpi = () => {
        // console.log("setUpiID : ", upiId)
        var testUpi = /^[\w.-]+@[\w.-]+$/.test(upiId)
        if (testUpi) {
            // console.log("Valid")
            Api_Update_Upi(true, upiId)
            setErrorMsg("")
        }
        else {
            // console.log("Invalid")
            setErrorMsg("Please enter valid UPI ID")

        }
        // setIsEdit(!isEdit)
        // seIsDisabled(false)
    }



    const BankSchema = Yup.object().shape({
        bankName: Yup.string()
            .required('* Please enter bank name'),
        bankLocation: Yup.string()
            .required('* Please enter bank location'),
        accountNumber: Yup.string()
            .required('* Please enter bank account number'),
        ifscCode: Yup.string()
            .required('* Please enter ifsc code'),


    });
    const UpiSchema = Yup.object().shape({
        upiId: Yup.string()
            .required('* Please enter UPI ID'),
    });


    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
            <HeaderView title={"Bank details"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>


                <View style={{
                    margin: 20,

                    borderWidth: 2,
                    borderRadius: 8,
                    borderColor: greenPrimary,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <TouchableOpacity onPress={() => setIndex(0)}
                        style={{
                            width: "50%",
                            backgroundColor: index == 0 ? greenPrimary : transparent,
                            alignItems: "center",
                            padding: 8,
                        }}
                    >
                        <Text style={{
                            fontSize: FontSize.FS_15,
                            fontFamily: index == 0 ? BOLD : SEMIBOLD,
                            color: index == 0 ? white : warmGrey
                        }}>Bank</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(1)}
                        style={{
                            width: "50%",
                            backgroundColor: index == 1 ? greenPrimary : transparent,
                            alignItems: "center",
                            padding: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.FS_15,
                                fontFamily: index == 1 ? BOLD : SEMIBOLD,
                                color: index == 1 ? white : warmGrey
                            }}>UPI ID</Text>
                    </TouchableOpacity>
                </View>

                {
                    index == 0 ?
                        <View >
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    bankName: bankName,
                                    bankLocation: bankLocation,
                                    accountNumber: accountNumber,
                                    ifscCode: ifscCode,
                                }}
                                validateOnBlur={false}
                                validationSchema={BankSchema}
                                onSubmit={values => {
                                    AddBank(values)
                                }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                                    <View>

                                        <Text style={[styles.textTitle, {}]}>
                                            {Translate.t("bank_name")}
                                        </Text>

                                        <TextInputView
                                            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                                            value={values.bankName}
                                            imageSource={Bank}
                                            onChangeText={handleChange('bankName')}
                                            onBlurEffect={() => handleBlur('bankName')}
                                            placeholder={Translate.t("bank_name")}
                                        />
                                        {(errors.bankName && touched.bankName) &&
                                            <Text style={styles.errorText}>{errors.bankName}</Text>
                                        }

                                        <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                                            {Translate.t("branch_location")}
                                        </Text>

                                        <TextInputView
                                            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                                            value={values.bankLocation}
                                            imageSource={Branch}
                                            onChangeText={handleChange('bankLocation')}
                                            onBlurEffect={() => handleBlur('bankLocation')}
                                            placeholder={Translate.t("branch_location")}
                                        />
                                        {(errors.bankLocation && touched.bankLocation) &&
                                            <Text style={styles.errorText}>{errors.bankLocation}</Text>
                                        }

                                        <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                                            {Translate.t("account_number")}
                                        </Text>

                                        <TextInputView
                                            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                                            value={values.accountNumber}
                                            imageSource={Account}
                                            onChangeText={handleChange('accountNumber')}
                                            onBlurEffect={() => handleBlur('accountNumber')}
                                            placeholder={Translate.t("account_number")}
                                            keyboardType={'number-pad'}
                                        />
                                        {(errors.accountNumber && touched.accountNumber) &&
                                            <Text style={styles.errorText}>{errors.accountNumber}</Text>
                                        }

                                        <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                                            {Translate.t("ifsc_code")}
                                        </Text>

                                        <TextInputView
                                            containerStyle={{ marginTop: pixelSizeHorizontal(10), }}
                                            value={values.ifscCode}
                                            imageSource={Ifsc}
                                            onChangeText={handleChange('ifscCode')}
                                            onBlurEffect={() => handleBlur('ifscCode')}
                                            placeholder={Translate.t("ifsc_code")}
                                        />
                                        {(errors.ifscCode && touched.ifscCode) &&
                                            <Text style={styles.errorText}>{errors.ifscCode}</Text>
                                        }
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: pixelSizeHorizontal(40) }}>
                                            
                                            {(userData.user.is_kyc_verify == 0 || userData.user.is_kyc_verify == 3) &&
                                             <Pressable
                                             onPress={handleSubmit}
                                             style={[styles.btnSaveStyle, { flex: 1 }]}>
                                             <Text style={styles.btnSaveText} >{Translate.t("next")}</Text>
                                         </Pressable>
                                            }
                                           
                                        </View>

                                    </View>
                                )}
                            </Formik>
                        </View>
                        :
                        <View >
                            {/* <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    upiId: upiId,
                                }}
                                validateOnBlur={false}
                                validationSchema={UpiSchema}
                                onSubmit={values => {
                                    AddUpi(values)
                                }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => ( */}
                            <View>

                                <Text style={[styles.textTitle, {}]}>
                                    {Translate.t("upi_id")}
                                </Text>

                                <TextInputView
                                    containerStyle={{ marginTop: pixelSizeHorizontal(10), }}
                                    value={upiId}
                                    imageSource={Upi}
                                    onChangeText={(text) => setUpiID(text)}
                                    // onBlurEffect={(text) => setUpiID(text)}
                                    placeholder={"Ex: 123456789@icici"}
                                />
                                {/* {(errors.upiId && touched.upiId) && */}
                                <Text style={styles.errorText}>{errorMsg}</Text>
                                {/* } */}

                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: pixelSizeHorizontal(40) }}>
                                {(userData.user.is_kyc_verify == 0 || userData.user.is_kyc_verify == 3)  &&
                                    <Pressable
                                        onPress={() => AddUpi()}
                                        style={[styles.btnSaveStyle, { flex: 1 }]}>
                                        <Text style={styles.btnSaveText} >{Translate.t("next")}</Text>

                                    </Pressable>
}
                                </View>

                            </View>
                            {/* )}
                            </Formik> */}
                        </View>
                }
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
        backgroundColor: greenPrimary,
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

export default BankDetails





