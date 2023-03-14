import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, disableColor, greenPrimary, paleGreen, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { PhoneImg, SmileImg } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {

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


  // Action Methods
  const btnEditTap = () => {
    
    setIsEdit(!isEdit)
    seIsDisabled(true)
  }

  const btnSaveTap = (value) => {
    const editProfileData = value
    console.log("editProfileData",editProfileData)
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
  return (
    <HeaderView title={isEdit ? Translate.t("edit_profile") : Translate.t("profile")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>

      <View style={{ marginTop: pixelSizeHorizontal(30) }}>

        <View style={{ flexDirection: 'row' }} >

          <TouchableOpacity>
            <FastImage
              style={{ width: widthPixel(90), height: widthPixel(90), borderRadius: widthPixel(90), borderWidth: 3, borderColor: paleGreen }}
              source={{ uri: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg" }}
            />
          </TouchableOpacity>

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
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between',marginTop: pixelSizeHorizontal(40) }}>

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
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    borderRadius: widthPixel(20),
    width: '60%'
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
    marginLeft:pixelSizeHorizontal(40)
},
})

export default Profile