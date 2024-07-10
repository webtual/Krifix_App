import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert,Image, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, disableColor, greenPrimary, grey, paleGreen, red, seprator, warmGrey, white, yellow } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, Bank, Branch, BuildingImg, Camera, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, SmileImg, Upi, Verified } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE, UPDATE_PROFILE } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { storeData } from '../commonComponents/AsyncManager'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { navigate } from '../navigations/RootNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Profile = () => {

  const dispatch = useDispatch()
  const userData = useSelector(user_data)
  // console.log("userData", userData)
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, seIsDisabled] = useState(false)
  const [mobile, setMobile] = useState("")
  const [fullName, setFullName] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [area, setArea] = useState("")
  const [pincode, setPincode] = useState("")
  const [address, setAddress] = useState("")
  const [bankName, setBankName] = useState("")
  const [bankLocation, setBankLocation] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [upiId, setUpiID] = useState("")
  const [profileImg, setProfileImg] = useState({ path: "" })
  const [isImageUpdate, setIsImageUpdate] = useState(false)
  // const [AlertShow, setAlertShow] = useState(false)

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
        //console.log("user_data", user_data.user.upi_id)
        setFirstname(user_data.user.first_name)
        setLastName(user_data.user.last_name)
        setCity(user_data.user.city)
        setArea(user_data.user.area)
        setPincode(user_data.user.pincode)
        setAddress(user_data.user.address == null ? "" : user_data.user.address)
        setMobile(user_data.user.phone)
        // setBankName(user_data.user.bank_name == null ? "" : user_data.user.bank_name)
        // setBankLocation(user_data.user.branch_name == null ? "" : user_data.user.branch_name)
        // setAccountNumber(user_data.user.account_no == null ? "" : user_data.user.account_no)
        // setIfscCode(user_data.user.ifsc_code == null ? "" : user_data.user.ifsc_code)
        // setUpiID(user_data.user.upi_id == null ? "" : user_data.user.upi_id)
        setProfileImg({ path: userData.asset_url + user_data.user.avatar })

        storeData(USER_DATA, user_data, () => {
          dispatch(storeUserData(user_data))

        })
        //console.log("GET PROFILE DATA SUCCEESSFULLY")

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


  const Api_Update_Profile = (isLoad, data) => {
    setIsLoading(isLoad)
    let body = new FormData();
    body.append('first_name', data.firstName)
    body.append('last_name', data.lastName)
    body.append('city', data.city)
    body.append('area', data.area)
    body.append('pincode', data.pincode)
    body.append('address', data.address)
    // body.append('bank_name', data.bankName)
    // body.append('branch_name', data.bankLocation)
    // body.append('account_no', data.accountNumber)
    // body.append('ifsc_code', data.ifscCode)
    // body.append('upi_id', data.upiId)

    if (isImageUpdate == true) {
      body.append('avatar',
        {
          uri: profileImg.path,
          name: Platform.OS == 'android' ? "image.png" : profileImg.filename,
          type: profileImg.mime
        });
    }
    //console.log("body", JSON.stringify(body))
    ApiManager.post(UPDATE_PROFILE, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
     // console.log("Api_Update_Profile : ", response)
      setIsLoading(false)

      var data = response.data;
      if (data.status == true) {

        Api_Get_Profile(true)
        setIsImageUpdate(false)
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: Translate.t('success'),
          textBody: Translate.t('profile_update_successfully'),
          button: 'Ok',
        })
       // console.log("PROFILE DATA UPDATE SUCCEESSFULLY")
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
      console.error("Api_Update_Profile Error ", err.message);
    })
  }
  // Action Methods
  const btnEditTap = () => {
    setIsEdit(!isEdit)
    seIsDisabled(true)
  }

  const btnSaveTap = (value) => {
    Api_Update_Profile(true, value)
    setIsEdit(!isEdit)
    seIsDisabled(false)
  }
  // const AlertActive = () => {
  //   setAlertShow(!AlertShow);
  // };


  const Editschema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, '* Too Short!')
      .max(50, '* Too Long!')
      .required('* Please enter first name'),
    lastName: Yup.string()
      .min(2, '* Too Short!')
      .max(50, '* Too Long!')
      .required('* Please enter last name'),
    mobile: Yup.string()
      .min(10, '* Mobile number is not valid')
      .required("* Please enter mobile name"),
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
    // address: Yup.string()
    //   .required('* Address cannot be empty'),
    // bankName: Yup.string(),
    // .max(20, '* Bank name too long!')
    // .required('* Bank name cannot be empty'),
    // bankLocation: Yup.string()
    // .min(2, '* Bank location too short!')
    // .max(30, '* Bank location too long!')
    // .required('* Bank location cannot be empty'),
    // accountNumber: Yup.string(),
    // .required('* Account number cannot be empty'),
    // ifscCode: Yup.string(),
    // .required('* IFSC code cannot be empty'),
    // upiId: Yup.string(),
    // .required('* UPI id cannot be empty'),

  });

  const UploadImage = () => {
    Alert.alert("Select from", "Upload your profile picture", [
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
            // console.log("Selected Image  " + JSON.stringify(images))
            setProfileImg(images)
            setIsImageUpdate(true)
            setIsLoading(false)
          }).catch((error) => {
            setIsLoading(false)
            console.log(error)
          });
        }
      },
      {
        text: 'Camera',
        onPress: () => {

          setIsLoading(true)
          ImagePicker.openCamera({
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            cropping: true,
            multiple: false,
            mediaType: 'photo',
            includeBase64: false,
            multipleShot: false,
            compressImageQuality: 0.7
          }).then(images => {
            // console.log("Selected Image : " + JSON.stringify(images))
            setIsLoading(false)
            setProfileImg(images)
            setIsImageUpdate(true)

          }).catch((error) => {

            setIsLoading(false)
            console.log(error)
          });

        },
        style: 'default'
      },
    ])

  }


  return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
      <HeaderView title={isEdit ? Translate.t("edit_profile") : Translate.t("profile")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>

        <View style={{ marginTop: pixelSizeHorizontal(30) }}>

          <View style={{ flexDirection: 'row' }} >

            <View>
              <Image
                style={{ width: widthPixel(90), height: widthPixel(90), borderRadius: widthPixel(90), borderWidth: 3, borderColor: paleGreen }}
                source={{ uri: profileImg.path }}
              />
              {isDisabled === true ?
                <TouchableOpacity onPress={() => UploadImage()}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: white,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: paleGreen
                  }}>
                  <Image
                    style={{ width: 18, height: 18, }}
                    source={Camera}
                  />
                </TouchableOpacity>
                : <></>
              }

            </View>


            {!isEdit &&
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: pixelSizeHorizontal(30) }}>
                <Pressable
                  onPress={() => btnEditTap()}
                  style={styles.btnStyle}>
                  <Text style={styles.btnText}>{Translate.t("edit_profile")}</Text>

                </Pressable>
              </View>
            }


          </View>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: firstName,
              lastName: lastName,
              city: city,
              area: area,
              pincode: pincode,
              address: address,
              mobile: mobile,
              // bankName: bankName,
              // bankLocation: bankLocation,
              // accountNumber: accountNumber,
              // ifscCode: ifscCode,
              // upiId: upiId,
            }}
            validateOnBlur={false}
            validationSchema={Editschema}
            onSubmit={values => {
              btnSaveTap(values)
            }
            }
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
              <View style={{ marginTop: pixelSizeHorizontal(30) }}>

                <Text style={styles.textTitle}>
                  {Translate.t("first_name")}
                </Text>

                <TextInputView
                  editable={isDisabled}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange('firstName')}
                  onBlurEffect={() => handleBlur('firstName')}
                  value={values.firstName}
                  imageSource={SmileImg}
                  placeholder={Translate.t("first_name")}
                />
                {(errors.firstName && touched.firstName) &&
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                }
                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("last_name")}
                </Text>
                <TextInputView
                  editable={isDisabled}
                  imageSource={SmileImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlurEffect={() => handleBlur('lastName')}
                  placeholder={Translate.t("last_name")}
                />
                {(errors.lastName && touched.lastName) &&
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                }
                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("mobile")}
                </Text>

                <TextInputView
                  editable={false}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.mobile}
                  imageSource={PhoneImg}
                  onChangeText={handleChange('mobile')}
                  onBlurEffect={() => handleBlur('mobile')}
                  placeholder={Translate.t("mobile")}
                  keyboardType={'number-pad'}
                  maxLength={10}
                />
                {(errors.mobile && touched.mobile) &&
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                }
                <Text style={[styles.textHeader, { marginTop: pixelSizeHorizontal(40) }]}>
                  {Translate.t("address")}
                </Text>

                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("city")}
                </Text>

                <TextInputView
                  editable={isDisabled}
                  imageSource={BuildingImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlurEffect={() => handleBlur('city')}
                  placeholder={Translate.t("city")}
                />
                {(errors.city && touched.city) &&
                  <Text style={styles.errorText}>{errors.city}</Text>
                }
                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("area")}
                </Text>
                <TextInputView
                  editable={isDisabled}
                  imageSource={LocationImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.area}
                  onChangeText={handleChange('area')}
                  onBlurEffect={() => handleBlur('area')}
                  placeholder={Translate.t("area")}
                />
                {(errors.area && touched.area) &&
                  <Text style={styles.errorText}>{errors.area}</Text>
                }
                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("pincode")}
                </Text>
                <TextInputView
                  editable={isDisabled}
                  imageSource={PinImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.pincode}
                  onChangeText={handleChange('pincode')}
                  onBlurEffect={() => handleBlur('pincode')}
                  placeholder={Translate.t("pincode")}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
                {(errors.pincode && touched.pincode) &&
                  <Text style={styles.errorText}>{errors.pincode}</Text>
                }


                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("address")}
                </Text>
                <TextInputView
                  multiline={true}
                  editable={isDisabled}
                  imageSource={PinImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlurEffect={() => handleBlur('address')}
                  placeholder={Translate.t("address")}
                />
                {(errors.address && touched.address) &&
                  <Text style={styles.errorText}>{errors.address}</Text>
                }

                {/* <Text style={[styles.textHeader, { marginTop: pixelSizeHorizontal(40) }]}>
                  {Translate.t("bank_details")}
                </Text>

                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("bank_name")}
                </Text>

                <TextInputView
                  editable={isDisabled}
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
                  editable={isDisabled}
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
                  editable={isDisabled}
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
                  editable={isDisabled}
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
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(20), flex: 1 }}>
                  <View style={{ borderBottomColor: disableColor, flex: 1, borderBottomWidth: 2, borderStyle: "dashed" }}></View>
                  <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: disableColor, marginHorizontal: pixelSizeHorizontal(5) }}>OR</Text>
                  <View style={{ borderBottomColor: disableColor, flex: 1, borderBottomWidth: 2, borderStyle: "dashed" }}></View>
                </View>
                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("upi_id")}
                </Text>

                <TextInputView
                  editable={isDisabled}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10), }}
                  value={values.upiId}
                  imageSource={Upi}
                  onChangeText={handleChange('upiId')}
                  onBlurEffect={() => handleBlur('upiId')}
                  placeholder={"Ex: 123456789@icici"}
                />
                {(errors.upiId && touched.upiId) &&
                  <Text style={styles.errorText}>{errors.upiId}</Text>
                } */}
                {/* {isDisabled !== true &&
                  <Text style={[styles.textHeader, { marginTop: pixelSizeHorizontal(20) }]}>KYC status</Text>} */}

                {isDisabled !== true &&
                  (userData.user.is_kyc_verify == 0 &&
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: pixelSizeHorizontal(20),
                          borderRadius: 8,
                        }}>
                        <Text style={styles.textHeader}>KYC Status : </Text>
                        <Text
                          style={{
                            backgroundColor: warmGrey,
                            paddingVertical: 3,
                            paddingHorizontal:8,
                            fontFamily: MEDIUM,
                            color: white,
                            fontSize: FontSize.FS_16,
                            marginTop: 5,
                            borderRadius: 8
                          }}>{"Pending"}</Text>

                      </View>
                      <TouchableOpacity onPress={() => navigate("BankDetails")} activeOpacity={0.7}
                        style={{
                          backgroundColor: black,
                          padding: pixelSizeHorizontal(5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: widthPixel(8),
                          marginVertical: pixelSizeHorizontal(15)
                        }}>
                        <Text style={{
                          fontFamily: SEMIBOLD,
                          color: white,
                          fontSize: FontSize.FS_14,
                          textTransform: 'uppercase',
                        }}>complete KYC</Text>
                      </TouchableOpacity>
                    </>
                    // <View
                    //   style={{
                    //     borderColor: warmGrey,
                    //     borderWidth: 1,
                    //     marginVertical: pixelSizeHorizontal(20),
                    //     padding: 15,
                    //     borderRadius: 8,
                    //   }}>
                    //   <Text
                    //     style={{
                    //       fontFamily: MEDIUM,
                    //       color: warmGrey,
                    //       fontSize: FontSize.FS_16,
                    //       textAlign: "center"
                    //     }}>{"Your KYC verification has \n been pending. Please complete your KYC."}</Text>
                    //   <TouchableOpacity onPress={() => navigate("BankDetails")}
                    //     style={{
                    //       backgroundColor: black,
                    //       padding: pixelSizeHorizontal(5),
                    //       alignItems: 'center',
                    //       justifyContent: 'center',
                    //       borderRadius: widthPixel(8),
                    //       marginTop: pixelSizeHorizontal(15)
                    //     }}>
                    //     <Text style={{
                    //       fontFamily: SEMIBOLD,
                    //       color: white,
                    //       fontSize: FontSize.FS_14,
                    //       textTransform: 'uppercase',
                    //     }}>complete KYC</Text>
                    //   </TouchableOpacity>
                    // </View>

                  )

                }


                {isDisabled !== true &&
                  (userData.user.is_kyc_verify == 1 &&
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: pixelSizeHorizontal(20),
                        borderRadius: 8,
                      }}>
                         <Text style={styles.textHeader}>KYC Status : </Text>
                      <Text
                        style={{
                          backgroundColor: warmGrey,
                          paddingVertical: 3,
                          paddingHorizontal:8,
                          fontFamily: MEDIUM,
                          color: white,
                          fontSize: FontSize.FS_16,
                          marginTop: 5,
                          borderRadius: 6
                        }}>{"Submitted"}</Text>
                    </View>
                  )
                }

                {isDisabled !== true &&
                  (userData.user.is_kyc_verify == 2 &&
                    <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: pixelSizeHorizontal(20),
                        borderRadius: 8,
                      }}>
                         <Text style={styles.textHeader}>KYC Status : </Text>
                         <View style={{flexDirection:"row",alignItems:"center", backgroundColor: warmGrey,   paddingVertical: 3,
                          marginTop: 5,  borderRadius: 6,
                          paddingHorizontal:8,}}>
                         <Text
                        style={{
                          fontFamily: MEDIUM,
                          color: white,
                          fontSize: FontSize.FS_16,
                        }}>{"Verified "}</Text>
                       <Image 
                        style={{ width: 20, height: 20,}}
                        source={Verified}
                    />
                         </View>
                     
                    </View>
                    <View style={{ marginTop:10,marginBottom:20 }}>
                    <Text style={[styles.textHeader,{color:black,fontSize: FontSize.FS_18,}]}>Bank Details </Text>
                        {userData.user.bank_name &&
                          <View style={{ flexDirection: "row",  marginTop: 10,  }}>
                            <Text style={{
                              fontFamily: MEDIUM,
                              color: black,
                              fontSize: FontSize.FS_14,
                              textAlign: "right"
                            }}>Bank Name : </Text>
                            <Text style={{
                              fontFamily: REGULAR,
                              color: warmGrey,
                              fontSize: FontSize.FS_14,
                            }}>{userData.user.bank_name}</Text>
                          </View>
                        }
                        {userData.user.account_no &&
                          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Text style={{
                              fontFamily: MEDIUM,
                              color: black,
                              fontSize: FontSize.FS_15,
                              textAlign: "right"
                            }}>Account Number : </Text>
                            <Text style={{
                              fontFamily: REGULAR,
                              color: warmGrey,
                              fontSize: FontSize.FS_14,
                              marginTop: 2
                            }}>{userData.user.account_no}</Text>
                          </View>
                        }

                        {userData.user.ifsc_code &&
                          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Text style={{
                              fontFamily: MEDIUM,
                              color: black,
                              fontSize: FontSize.FS_14,
                              textAlign: "right"
                            }}>IFSC Code : </Text>
                            <Text style={{
                              fontFamily: REGULAR,
                              color: warmGrey,
                              fontSize: FontSize.FS_14,
                              marginTop: 2
                            }}>{userData.user.ifsc_code}</Text>
                          </View>
                        }
                        {userData.user.branch_name &&
                          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Text style={{
                              fontFamily: MEDIUM,
                              color: black,
                              fontSize: FontSize.FS_14,
                              textAlign: "right"
                            }}>Branch Name : </Text>
                            <Text style={{
                              fontFamily: REGULAR,
                              color: warmGrey,
                              fontSize: FontSize.FS_14,
                            }}>{userData.user.branch_name}</Text>
                          </View>
                        }
                        {userData.user.upi_id &&
                          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Text style={{
                              fontFamily: MEDIUM,
                              color: black,
                              fontSize: FontSize.FS_14,
                              textAlign: "right"
                            }}>UPI ID : </Text>
                            <Text style={{
                              fontFamily: REGULAR,
                              color: warmGrey,
                              fontSize: FontSize.FS_14,
                            }}>{userData.user.upi_id}</Text>
                          </View>
                        }
                      </View>
                    </>
                  )
                }

                {isDisabled !== true &&
                  (userData.user.is_kyc_verify == 3 &&
                    <>
                  <View  style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: pixelSizeHorizontal(20),
                      borderRadius: 8,
                    }}>
                    <Text style={styles.textHeader}>KYC Status : </Text>
                    <Text
                      style={{
                        backgroundColor: warmGrey,
                        paddingVertical: 3,
                        paddingHorizontal:8,
                        fontFamily: MEDIUM,
                        color: white,
                        fontSize: FontSize.FS_16,
                        marginTop: 5,
                        borderRadius: 8
                      }}>{"Rejected"}</Text>

                  </View>
                  {userData?.user?.kyc_reject_reason &&
                  <Text
                      style={{
                        fontFamily: REGULAR,
                        color: red,
                        fontSize: FontSize.FS_14,
                        marginTop: 5,
                      }}>*{userData?.user?.kyc_reject_reason}</Text>}
                      <TouchableOpacity onPress={() => navigate("BankDetails")}
                        style={{
                          backgroundColor: black,
                          padding: pixelSizeHorizontal(5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: widthPixel(8),
                          marginVertical: pixelSizeHorizontal(15)
                        }}>
                        <Text style={{
                          fontFamily: SEMIBOLD,
                          color: white,
                          fontSize: FontSize.FS_14,
                          textTransform: 'uppercase',
                        }}>COMPLETE KYC</Text>
                      </TouchableOpacity>
                    </>
                  )
                }



                {isEdit &&
                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: pixelSizeHorizontal(40) }}>

                    <Pressable
                      onPress={() => {
                        setIsEdit(false)
                        seIsDisabled(false)
                        resetForm()
                      }}
                      style={[styles.btnSaveStyle, { backgroundColor: disableColor, marginRight: pixelSizeHorizontal(20) }]}>
                      <Text style={styles.btnSaveText} >{Translate.t("cancel")}</Text>

                    </Pressable>

                    <Pressable
                      onPress={handleSubmit}
                      style={[styles.btnSaveStyle, { flex: 1 }]}>
                      <Text style={styles.btnSaveText} >{Translate.t("save_details")}</Text>

                    </Pressable>
                  </View>
                }

              </View>
            )}
          </Formik>




        </View>
        {/* <AlertView
          isAlertVisible={AlertShow}
          toggleAlert={() => AlertActive()}
          title={Translate.t('success')}
          description={Translate.t('profile_update_successfully')}
          type="success"
          successText="OK"
          onSucess={() => { setAlertShow(false) }}
        /> */}
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

export default Profile