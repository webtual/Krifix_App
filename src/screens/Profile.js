import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, disableColor, greenPrimary, paleGreen, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Camera, PhoneImg, PrivacyImg, SmileImg } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { storeData } from '../commonComponents/AsyncManager'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'


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
  const [bankName, setBankName] = useState("")
  const [bankLocation, setBankLocation] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [profileImg, setProfileImg] = useState({ path: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" })


  useEffect(() => {
    Api_Get_Profile(true)
  }, [])

  const Api_Get_Profile = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.get(GET_PROFILE).then((response) => {
      console.log("Api_Get_Profile : ", response)
      setIsLoading(false)


      if (response.data.status == true) {

         var user_data = response.data.data

         console.log("first Name : ",user_data.user.first_name)
         setFirstname(user_data.user.first_name)
         setLastName(user_data.user.last_name)
         setMobile(user_data.user.phone)
         setBankName(user_data.user.bank_name)
         setBankLocation(user_data.user.phone)
         setAccountNumber(user_data.user.account_no)
         setIfscCode(user_data.user.ifsc_code)
         setProfileImg({path: userData.asset_url+user_data.user.avatar})


        storeData(USER_DATA, user_data,() => {
          dispatch(storeUserData(user_data))

      })


      } else {
        alert(response.data.message)
      }

    }).catch((err) => {
      setIsLoading(false)
      console.error("Api_Get_Profile Error ", err);
    })
  }


  // Action Methods
  const btnEditTap = () => {
    setIsEdit(!isEdit)
    seIsDisabled(true)
  }

  const btnSaveTap = (value) => {
    const editProfileData = value
    editProfileData["profileImg"] = profileImg.path;
    console.log("EditProfileData :", editProfileData)
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

            console.log("Selected Image  " + JSON.stringify(images))
            setProfileImg(images)
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

            console.log("Selected Image : " + JSON.stringify(images))

            setIsLoading(false)
            setProfileImg(images)

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
    <>
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
                  {Translate.t("name")}
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
                <TextInputView
                  editable={isDisabled}
                  imageSource={SmileImg}
                  containerStyle={{ marginTop: pixelSizeHorizontal(15) }}
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
                  editable={isDisabled}
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
    </>
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
    fontSize: FontSize.FS_22,
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