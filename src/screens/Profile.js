import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, disableColor, greenPrimary, paleGreen, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { BuildingImg, Camera, LocationImg, PhoneImg, PinImg, PrivacyImg, SmileImg } from '../constants/Images'
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


const Profile = () => {

  const dispatch = useDispatch()
  const userData = useSelector(user_data)
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
  const [bankName, setBankName] = useState("")
  const [bankLocation, setBankLocation] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [profileImg, setProfileImg] = useState({ path: "" })
  const [isImageUpdate, setIsImageUpdate] = useState(false)

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
        // console.log("user_data", user_data)
        setFirstname(user_data.user.first_name)
        setLastName(user_data.user.last_name)
        setCity(user_data.user.city)
        setArea(user_data.user.area)
        setPincode(user_data.user.pincode)
        setMobile(user_data.user.phone)
        setBankName(user_data.user.bank_name)
        setBankLocation(user_data.user.branch_name)
        setAccountNumber(user_data.user.account_no)
        setIfscCode(user_data.user.ifsc_code)
        setProfileImg({ path: userData.asset_url + user_data.user.avatar })

        storeData(USER_DATA, user_data, () => {
          dispatch(storeUserData(user_data))

        })
        console.log("GET PROFILE DATA SUCCEESSFULLY")

      } else {
        alert(response.data.message)
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
    body.append('bank_name', data.bankName)
    body.append('branch_name', data.bankLocation)
    body.append('account_no', data.accountNumber)
    body.append('ifsc_code', data.ifscCode)

    if (isImageUpdate == true) {
      body.append('avatar',
        {
          uri: profileImg.path,
          name: Platform.OS == 'android' ? "image.png" : profileImg.filename,
          type: profileImg.mime
        });
    }
    // console.log("body",JSON.stringify(body))
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
        Alert.alert(
          Translate.t('success'),
          Translate.t('profile_update_successfully'),
          { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'destructive' },
          { cancelable: true }
        );
        console.log("PROFILE DATA UPDATE SUCCEESSFULLY")
      } else {
        alert(data.message)
      }

    }).catch((err) => {
      setIsLoading(false)
      console.error("Api_Update_Profile Error ", err);
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

  const btnCancleTap = () => {
    setIsEdit(!isEdit)
    seIsDisabled(false)
  }

  const Editschema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, '* Too Short!')
      .max(50, '* Too Long!')
      .required('* First name cannot be empty'),
    lastName: Yup.string()
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
    bankName: Yup.string()
      .min(2, '* Bank name too short!')
      .max(20, '* Bank name too long!')
      .required('* Bank name cannot be empty'),
    bankLocation: Yup.string()
      .min(2, '* Bank location too short!')
      .max(30, '* Bank location too long!')
      .required('* Bank location cannot be empty'),
    accountNumber: Yup.string()
      .min(14, '* Enter your bank account number')
      .required('* Account number cannot be empty'),
    ifscCode: Yup.string()
      .min(11, '* Enter IFSC code')
      .required('* IFSC code cannot be empty'),

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
              <FastImage
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
                  <FastImage
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
              mobile: mobile,
              bankName: bankName,
              bankLocation: bankLocation,
              accountNumber: accountNumber,
              ifscCode: ifscCode
            }}
            validationSchema={Editschema}
            onSubmit={values => { btnSaveTap(values) }
            }
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{ marginTop: pixelSizeHorizontal(30) }}>

                <Text style={styles.textTitle}>
                  {Translate.t("first_name")}
                </Text>

                <TextInputView
                  editable={isDisabled}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
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
                  onBlur={handleBlur('lastName')}
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
                  onBlur={handleBlur('mobile')}
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
                  onBlur={handleBlur('city')}
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
                  onBlur={handleBlur('area')}
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
                  onBlur={handleBlur('pincode')}
                  placeholder={Translate.t("pincode")}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
                {(errors.pincode && touched.pincode) &&
                  <Text style={styles.errorText}>{errors.pincode}</Text>
                }



                <Text style={[styles.textHeader, { marginTop: pixelSizeHorizontal(40) }]}>
                  {Translate.t("bank_details")}
                </Text>

                <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
                  {Translate.t("bank_name")}
                </Text>

                <TextInputView
                  editable={isDisabled}
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  value={values.bankName}
                  imageSource={PhoneImg}
                  onChangeText={handleChange('bankName')}
                  onBlur={handleBlur('bankName')}
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
                  imageSource={PhoneImg}
                  onChangeText={handleChange('bankLocation')}
                  onBlur={handleBlur('bankLocation')}
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
                  imageSource={PhoneImg}
                  onChangeText={handleChange('accountNumber')}
                  onBlur={handleBlur('accountNumber')}
                  placeholder={Translate.t("account_number")}
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
                  imageSource={PhoneImg}
                  onChangeText={handleChange('ifscCode')}
                  onBlur={handleBlur('ifscCode')}
                  placeholder={Translate.t("ifsc_code")}
                />
                {(errors.ifscCode && touched.ifscCode) &&
                  <Text style={styles.errorText}>{errors.ifscCode}</Text>
                }

                {isEdit &&
                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: pixelSizeHorizontal(40) }}>

                    <Pressable
                      onPress={() => btnCancleTap()}
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