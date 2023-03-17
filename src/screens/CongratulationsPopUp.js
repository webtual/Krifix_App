import { View, Text, Share, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { black, greenPrimary, offWhite, paleGreen, white } from '../constants/Color'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import FastImage from 'react-native-fast-image'
import { CoinImg, CongratsImg, ShareBoxImg, WithdrawImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";


const CongratulationsPopUp = ({ isInviteVisible, toggleInvite, image, isWithDrawModel, Point }) => {



  return (
    <Modal isVisible={isInviteVisible} 
    onBackdropPress={() => toggleInvite()}
      onBackButtonPress={() => toggleInvite()}>
      <View style={{ backgroundColor: offWhite, borderRadius: widthPixel(15), padding: pixelSizeHorizontal(20), marginHorizontal: pixelSizeHorizontal(10) }}>

        <Text style={styles.textModalTitle}>
          {Translate.t("Congratulations")}
        </Text>
        {isWithDrawModel ?
          <></>
          :
          <Text style={styles.textDesc}>
            {Translate.t("You_earned")}
          </Text>}
        {isWithDrawModel ? <FastImage
          source={WithdrawImg}
          style={{ width: 260, height: 240, }}
          resizeMode={'contain'}
        /> :
        <FastImage
          source={CongratsImg}
          style={{ width: 260, height: 240, }}
          resizeMode={'contain'}
        />
        }
        {isWithDrawModel ?
          <Text style={{
            fontSize: FontSize.FS_14,
            color: black,
            fontFamily: MEDIUM,
            marginTop: -50,
            marginBottom: pixelSizeHorizontal(25),
            textAlign: "center"
          }}>
            {Translate.t("Withdraw_desc")}
          </Text> :
          <></>
        }
        <View style={{
          backgroundColor: paleGreen,
          marginBottom: pixelSizeVertical(25),
          padding: pixelSizeHorizontal(10),
          borderRadius: widthPixel(50),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <FastImage
            source={CoinImg}
            style={{ width: 24, height: 24, }}
            resizeMode={'contain'}
          />
          <Text style={{
            fontSize: FontSize.FS_27,
            color: black,
            fontFamily: SEMIBOLD,
            marginLeft: pixelSizeHorizontal(15)
          }}>{Point}</Text>
          <Text style={{
            fontSize: FontSize.FS_14,
            color: black,
            fontFamily: SEMIBOLD,
            marginHorizontal: pixelSizeHorizontal(8),
            marginTop: 8
          }}>{Translate.t("Point")}</Text>
        </View>
        {isWithDrawModel ?
          <Text style={{
            fontSize: FontSize.FS_11,
            color: black,
            fontFamily: MEDIUM,
            textAlign: "center"
          }}>
            {Translate.t("withdraw_mail_text")}
          </Text>
          :
          <></>
        }
      </View>


    </Modal>
  )
}


const styles = StyleSheet.create({
  textModalTitle: {
    fontSize: FontSize.FS_27,
    color: greenPrimary,
    fontFamily: SEMIBOLD,
    textAlign: 'center'
  },
  textDesc: {
    fontSize: FontSize.FS_14,
    color: black,
    fontFamily: MEDIUM,
    marginTop: pixelSizeHorizontal(16),
    textAlign: "center"
  },
  btnShareStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPixel(8),
    marginTop: pixelSizeHorizontal(30)
  },
  btnShareText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
    textTransform: 'uppercase',
  },
})

export default CongratulationsPopUp