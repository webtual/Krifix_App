import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, disableColor, greenPrimary, paleGreen, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { PhoneImg, SmileImg } from '../constants/Images'

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [mobile, setMobile] = useState("")
  const [fullName, setFullName] = useState("")

  const [bankName, setBankName] = useState("")
  const [bankLocation, setBankLocation] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")


  // Action Methods
  const btnEditTap = () => {
    setIsEdit(!isEdit)
  }

  const btnSaveTap = () => {
    
  }

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


        <View style={{ marginTop: pixelSizeHorizontal(30) }}>

          <Text style={styles.textTitle}>
            {Translate.t("name")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            value={fullName}
            imageSource={SmileImg}
            onChangeText={(text) => setFullName(text)}
            placeholder={Translate.t("full_name")}
          />


          <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
            {Translate.t("mobile")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            value={mobile}
            imageSource={PhoneImg}
            onChangeText={(text) => setMobile(text)}
            placeholder={Translate.t("mobile")}
          />


          <Text style={[styles.textHeader, { marginTop: pixelSizeHorizontal(40) }]}>
            {Translate.t("bank_details")}
          </Text>

          <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
            {Translate.t("bank_name")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            value={bankName}
            imageSource={PhoneImg}
            onChangeText={(text) => setBankName(text)}
            placeholder={Translate.t("bank_name")}
          />


          <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
            {Translate.t("branch_location")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            value={bankLocation}
            imageSource={PhoneImg}
            onChangeText={(text) => setBankLocation(text)}
            placeholder={Translate.t("branch_location")}
          />


          <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
            {Translate.t("account_number")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            value={accountNumber}
            imageSource={PhoneImg}
            onChangeText={(text) => setAccountNumber(text)}
            placeholder={Translate.t("account_number")}
          />


          <Text style={[styles.textTitle, { marginTop: pixelSizeHorizontal(20) }]}>
            {Translate.t("ifsc_code")}
          </Text>

          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10), marginBottom: pixelSizeHorizontal(40) }}
            value={ifscCode}
            imageSource={PhoneImg}
            onChangeText={(text) => setIfscCode(text)}
            placeholder={Translate.t("ifsc_code")}
          />


          {isEdit &&
          <View style={{flexDirection : 'row', flex : 1, justifyContent : 'space-between'}}>

            <Pressable
              onPress={() => btnEditTap()}
              style={[styles.btnSaveStyle,{backgroundColor : disableColor, marginRight : pixelSizeHorizontal(20)}]}>
              <Text style={styles.btnSaveText} >{Translate.t("cancel")}</Text>

            </Pressable>

            <Pressable
              onPress={() => btnSaveTap()}
              style={[styles.btnSaveStyle,{ flex:1 }]}>
              <Text style={styles.btnSaveText} >{Translate.t("save_details")}</Text>

            </Pressable>
            </View>
          }

        </View>




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
    justifyContent : 'center',
    borderRadius: widthPixel(8),
    marginBottom: pixelSizeHorizontal(30)
  },
  btnSaveText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
    textTransform: 'uppercase',
  }
})

export default Profile