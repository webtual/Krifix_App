import { View, Text, TouchableOpacity, StyleSheet, Share, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, greenPrimary, iceBlue, offWhite, paleGreen, white } from '../constants/Color'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, RedeemImg, ScanImg, ShareBoxImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK, SCREEN_WIDTH } from '../constants/ConstantKey'

import { navigate } from '../navigations/RootNavigation'
import InvitePopUp from './InvitePopUp'

const Home = () => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 

  

  return (
    <>
      <HeaderView title={Translate.t("welcome", { name: "Developer!" })} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}>

        <View style={[styles.viewInvite, {
          alignItems: 'center', paddingVertical: pixelSizeHorizontal(25),
          borderBottomLeftRadius: 0, borderBottomRightRadius: 0
        }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

            <FastImage
              source={CoinImg}
              style={{ width: widthPixel(30), height: widthPixel(30) }}
              resizeMode={'contain'}
            />

            <View style={{ marginLeft: pixelSizeHorizontal(8) }}>
              <Text style={styles.textPoint}>
                500
              </Text>
              <Text style={[styles.textPoint, { fontSize: FontSize.FS_14 }]}>
                {Translate.t("krifix_point")}
              </Text>
            </View>


          </View>


          <View style={{
            width: widthPixel(80), height: widthPixel(80), borderRadius: widthPixel(80), backgroundColor: iceBlue,
            borderWidth: widthPixel(2), borderColor: greenPrimary, marginTop: pixelSizeHorizontal(-45),
            alignItems: 'center', justifyContent: 'center'
          }}>

            <Text style={styles.textBigName}>
              D
            </Text>

          </View>

          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <FastImage
              source={AppLogoImg}
              style={{ width: widthPixel(100), height: widthPixel(30), }}
              resizeMode={'contain'}
            />
          </View>


        </View>
        <FastImage
          source={{ uri: "https://efm49dcbc97.exactdn.com/wp-content/uploads/2020/01/referral-program-banner-scaled.jpg?strip=all&lossy=1&ssl=1" }}
          style={{ height: widthPixel(125), borderBottomLeftRadius: widthPixel(10), borderBottomRightRadius: widthPixel(10) }}

        />



        <View style={styles.viewInvite}>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => toggleModal()}>

            <FastImage
              source={InviteImg}
              style={{ width: widthPixel(32), height: widthPixel(32) }}
              resizeMode={'contain'}
            />
            <Text style={styles.textSmallTitle}>
              {Translate.t("invite_friend")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigate("Rewards")}>
            <FastImage
              source={RedeemImg}
              style={{ width: widthPixel(32), height: widthPixel(32) }}
              resizeMode={'contain'}
            />
            <Text style={styles.textSmallTitle}>
              {Translate.t("redeem")}
            </Text>
          </TouchableOpacity>

        </View>


        <Text style={styles.textTitle}>
          {Translate.t("popular_offer")}
        </Text>

        <View style={{ marginTop: pixelSizeHorizontal(20), marginBottom: pixelSizeHorizontal(120) }}>
          <FlatList
            data={[1, 2, 3, 5]}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (<View style={{ width: widthPixel(20) }}></View>)}
            renderItem={({ item, index }) => (
              <View style={{ borderRadius: widthPixel(10), width: SCREEN_WIDTH - 100, height: widthPixel(160), }}>
                <FastImage
                  style={{ flex: 1, borderRadius: widthPixel(10) }}
                  source={{ uri: "https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg" }}
                />
              </View>
            )}
          />
        </View>



              <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()}/>

      </HeaderView>

      <Pressable
        onPress={() =>  navigate("QrCodeScan")}
        style={[styles.btnScanStyle]}>

        <FastImage
          source={ScanImg}
          style={{ width: widthPixel(28), height: widthPixel(28) }}
          resizeMode={'contain'}
        />

        <Text style={styles.btnScanText} >{Translate.t("scan_qr")}</Text>

      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({

  textTitle: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_18,
    color: black,
    marginTop: pixelSizeHorizontal(20)
  },
  textBigName: {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_48,
    color: black,
  },
  viewInvite: {
    backgroundColor: iceBlue, flexDirection: 'row', padding: pixelSizeHorizontal(10),
    borderRadius: widthPixel(10), marginTop: pixelSizeHorizontal(25)
  },
  textPoint: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_20,
    color: greenPrimary,
  },
  textSmallTitle: {
    fontSize: FontSize.FS_12,
    color: black,
    fontFamily: SEMIBOLD,
    marginTop: pixelSizeHorizontal(7)
  },
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
    marginTop: pixelSizeHorizontal(20)
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
  btnScanStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPixel(33),
    width: '70%',
    bottom: pixelSizeHorizontal(30),
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  btnScanText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_25,
    textTransform: 'uppercase',
    marginLeft: pixelSizeHorizontal(12)
  }
})

export default Home