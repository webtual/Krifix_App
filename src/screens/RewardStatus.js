import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../navigations/RootNavigation'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, ScanColorImg, TicketImg, WithdrawImg } from '../constants/Images'
import { black, greenPrimary, iceBlue, warmGrey, white, } from '../constants/Color'
import { BOLD, FontSize, ITALIC, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import InvitePopUp from './InvitePopUp'
import { RUPEE, SCREEN_WIDTH } from '../constants/ConstantKey'
import CongratulationsPopUp from './CongratulationsPopUp'
import { useSelector } from 'react-redux'
import { user_data } from '../redux/reducers/userReducer'
import ApiManager from '../commonComponents/ApiManager'
import { GET_CONTACT_DETAILS, GET_PROFILE, GET_REWARD, GET_TRANSACTION_HISTORY, REDEEM_REWARD } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const RewardStatus = () => {
  const userData = useSelector(user_data)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState(false)

  useEffect(() => {
    Api_Get_Transaction_History(true)
  }, [])


  const Api_Get_Transaction_History = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.post(GET_TRANSACTION_HISTORY).then((response) => {
      console.log("Api_Get_Transaction_History : ", response)
      setIsLoading(false)
      var data = response.data
      if (data.status == true) {
        console.log("image", data.data)
        setTransactionData(data.data)
        console.log("GET TRANSACTION DATA SUCCESSFULLY")
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
      console.error("Api_Get_Transaction_History Error ", err);
    })
  }

  return (
    <>
      <HeaderView title={Translate.t("transaction_history")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        onPress={() => goBack()}>

        {transactionData !== "" ?
          <FlatList
            data={transactionData}
            style={{ marginVertical: pixelSizeHorizontal(15) }}
            numColumns={2}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
            ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
            renderItem={({ item, index }) => (
              <>
                <View style={{ width: "46%", backgroundColor: iceBlue, margin: "2%", borderRadius: 8, paddingTop: pixelSizeVertical(12), }} >
                  <FastImage
                    source={{ uri: userData.asset_url + item?.order_details?.items?.item_image }}
                    style={{ width: 150, height: 100 }}
                    resizeMode={'contain'}
                  />
                  <View style={{ flex: 1, alignItems: "center", marginTop: pixelSizeVertical(12), }}>
                    <Text style={[styles.textItem]}>{item?.order_details?.items?.item_name}
                    </Text>
                    <Text style={[styles.textItem, { marginTop: pixelSizeVertical(6), color: warmGrey }]}>{item?.order_details?.items?.item_desc}
                    </Text>
                    <Text style={[styles.textItem, { marginTop: pixelSizeVertical(6), color: warmGrey }]}>{moment(item?.created_at).format("DD MMM YYYY")}
                    </Text>
                    <View style={{
                      alignItems: 'center', flexDirection: 'row',
                      marginVertical: pixelSizeHorizontal(6),
                    }}>
                      <FastImage
                        source={CoinImg}
                        style={{ width: widthPixel(18), height: widthPixel(18) }}
                        resizeMode={'contain'}
                      />
                      <Text style={[styles.textItem, { marginLeft: pixelSizeHorizontal(5), fontFamily: SEMIBOLD }]}>{item?.order_details?.items?.item_point}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: black, paddingVertical: pixelSizeHorizontal(8),
                      borderBottomRightRadius: widthPixel(8), borderBottomLeftRadius: widthPixel(8)
                    }}>
                    <Text style={styles.textRedeemIt}>{item?.order_status}</Text>
                  </View>
                </View>
              </>
            )}
          />
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textItem}>{Translate.t("no_data_found")}</Text>
          </View>
        }

      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  )
}



const styles = StyleSheet.create({
  textItem: {
    fontSize: FontSize.FS_12,
    color: black,
    fontFamily: MEDIUM,
    // textAlign: 'center'
  },
  textRedeemIt: {
    fontSize: FontSize.FS_12,
    color: white,
    fontFamily: SEMIBOLD,
    textAlign: 'center'
  }
})
export default RewardStatus