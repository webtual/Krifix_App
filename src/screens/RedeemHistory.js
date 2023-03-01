import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, disableColor, greenPrimary, iceBlue, warmGrey } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { CoinImg, TrophyImg } from '../constants/Images'

const RedeemHistory = () => {
  return (
    <HeaderView title={Translate.t("redeem_history")} isBack={false} containerStyle={{}}>


      <View style={styles.pointView}>

        <Text style={styles.textKrifixPoint}>
          {Translate.t("krifix_point")}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: pixelSizeHorizontal(10) }}>

          <FastImage
            source={CoinImg}
            style={{ width: widthPixel(30), height: widthPixel(30) }}
            resizeMode={'contain'}
          />

          <Text style={styles.textPoint}>
            500
          </Text>

        </View>


        <Text style={[styles.textItem, { marginTop: pixelSizeHorizontal(20) }]}>
          {Translate.t("last_transaction") + " : "}
          <Text style={styles.textValue}>
            {moment(new Date()).format("DD MMM YYYY")}
          </Text>
        </Text>

        <Text style={[styles.textItem, { marginTop: pixelSizeHorizontal(10) }]}>
          {Translate.t("total_voucher_redeem") + " : "}
          <Text style={styles.textValue}>
            25
          </Text>
        </Text>

        <Text style={[styles.textItem, { marginTop: pixelSizeHorizontal(10) }]}>
          {Translate.t("total_referral") + " : "}
          <Text style={styles.textValue}>
            5
          </Text>
        </Text>

      </View>

      <FlatList
        data={[1, 2, 3, 6, 5, 4, 7, 8, 9, 0]}
        scrollEnabled={false}
        ListHeaderComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(1), backgroundColor: disableColor, marginHorizontal: pixelSizeHorizontal(25) }}></View>)}
        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pixelSizeHorizontal(8), paddingHorizontal: pixelSizeHorizontal(25) }}>

            <View style={{ width: widthPixel(40), height: widthPixel(40) }}>

              <FastImage
                style={{ flex: 1 }}
                resizeMode="contain"
                source={TrophyImg}
              />

            </View>

            <View style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(10) }}>
              <Text style={styles.textTitle}>
                Received Reward
              </Text>

              <Text style={styles.textDesc}>
                Savings Credited to your wallet
              </Text>
            </View>

            <View>
            <Text style={[styles.textTitle,{color : greenPrimary, textAlign : 'right',}]}>
                + 1500
              </Text>

              <Text style={styles.textDate}>
                {moment(new Date()).format("DD MMM YYYY")}
              </Text>
            </View>

          </View>
        )}
      />
    </HeaderView>

  )
}

const styles = StyleSheet.create({

  pointView: {
    backgroundColor: iceBlue, borderTopLeftRadius: widthPixel(25), borderTopRightRadius: widthPixel(25),
    paddingHorizontal: pixelSizeHorizontal(25), paddingVertical: pixelSizeHorizontal(30)
  },
  textKrifixPoint: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_16,
    color: black,
    // marginTop: pixelSizeHorizontal(30)
  },
  textItem: {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_16,
    color: warmGrey,
  },
  textValue: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_16,
    color: greenPrimary,
  },
  textPoint: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_25,
    color: greenPrimary,
    marginLeft: pixelSizeHorizontal(10)
  },
  textTitle: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_16,
    color: black,
  },
  textDesc: {
    fontFamily: REGULAR,
    fontSize: FontSize.FS_12,
    color: warmGrey,
    marginTop: pixelSizeHorizontal(10)
  },
  textDate : {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_10,
    color: warmGrey,
    textAlign : 'right',
    marginTop: pixelSizeHorizontal(10)
  }
})

export default RedeemHistory