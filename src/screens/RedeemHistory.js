import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, disableColor, greenPrimary, iceBlue, warmGrey, yellow } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { CoinImg, TrophyImg } from '../constants/Images'
import ApiManager from '../commonComponents/ApiManager'
import { GET_REDEEM_HISTORY } from '../constants/ApiUrl'
import { useFocusEffect } from '@react-navigation/native'
import LoadingView from '../commonComponents/LoadingView'

const RedeemHistory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [headerData, setHeaderdata] = useState()
  const [redeemHistory, setReddemHistory] = useState()



  useFocusEffect(
    useCallback(() => {
      Api_Get_Redeem_History(true)
    }, [])
  );


  const Api_Get_Redeem_History = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.post(GET_REDEEM_HISTORY).then((response) => {
      // console.log("Api_Get_Redeem_History : ", response)
      setIsLoading(false)
      var data = response.data
      if (data.status == true) {
        setHeaderdata(data.data.summary)
        setReddemHistory(data.data.transaction)
        console.log("DATA REDEEM HISTORY SUCCESSFULLY")
      } else {
        alert(data.message)
      }

    }).catch((err) => {
      setIsLoading(false)
      console.error("Api_Get_Redeem_History Error ", err);
    })
  }


  return (
    <>

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
            <Text style={styles.textPoint}>{headerData?.total_point}</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(20) }}>
            <Text style={styles.textItem}>{Translate.t("last_transaction") + " : "}</Text>
            <Text style={[styles.textValue, { marginTop: pixelSizeVertical(4) }]}>{moment(headerData?.last_transation_date).format("DD MMM YYYY")}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(10) }}>
            <Text style={styles.textItem}>{Translate.t("total_voucher_redeem") + " : "}</Text>
            <Text style={[styles.textValue, { marginTop: pixelSizeVertical(4) }]}>{headerData?.total_voucher_redeem}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(10) }}>
            <Text style={styles.textItem}>{Translate.t("total_referral") + " : "}</Text>
            <Text style={[styles.textValue, { marginTop: pixelSizeVertical(4) }]}>{headerData?.total_referral}</Text>
          </View>

        </View>
{redeemHistory &&
        <FlatList
          data={redeemHistory}
          scrollEnabled={false}
          ListEmptyComponent={() =>(<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{textTransform:"capitalize"}}>{Translate.t("no_data_found")}</Text>
      </View>)}
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
                <Text 
                  style={[styles.textTitle, { textTransform: "capitalize" }]}>{item?.transaction_title}</Text>

                <Text style={[styles.textDesc, { textTransform: "capitalize" }]}>{Translate.t("redeem_desc", { name: item?.type == "credit" ? "credited" : "debited" })}
                </Text>
              </View>

              <View>
                <Text style={[styles.textTitle, { color: item?.type == "credit" ? greenPrimary : yellow, textAlign: 'right', }]}>{item?.type == "credit" ? "+" : "-"}{item?.reward_sale_point}</Text>

                <Text style={styles.textDate}>
                  {moment(item?.created_at).format("DD MMM YYYY")}
                </Text>
              </View>

            </View>
          )}
        />
}
      </HeaderView>
      {isLoading && <LoadingView />}
    </>

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
    marginTop: pixelSizeHorizontal(6)
  },
  textDate: {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_10,
    color: warmGrey,
    textAlign: 'right',
    marginTop: pixelSizeHorizontal(10)
  }
})

export default RedeemHistory