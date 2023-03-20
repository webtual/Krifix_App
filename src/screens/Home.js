import { View, Text, TouchableOpacity, StyleSheet, Share, Pressable, FlatList } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, greenPrimary, iceBlue, offWhite, paleGreen, white } from '../constants/Color'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, RedeemImg, ScanImg, ShareBoxImg } from '../constants/Images'
import { ANDROID_APP_LINK, BANNER_DATA, FCM_TOKEN, IOS_APP_LINK, SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'

import { navigate } from '../navigations/RootNavigation'
import InvitePopUp from './InvitePopUp'
import { useDispatch, useSelector } from 'react-redux'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { GET_HOME_BANNER, GET_PROFILE } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { getData, storeData } from '../commonComponents/AsyncManager'
import { useFocusEffect } from '@react-navigation/native'

const Home = () => {
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [bannerData, setBannerData] = useState([])
  const [totalPoints, setTotalPoints] = useState()
  const userData = useSelector(user_data)
  // console.log("userData :::",userData.user.referral_code)


  useFocusEffect(
    useCallback(() => {
    //   getData(FCM_TOKEN, (data) => {
    //     console.log("FCM_TOKEN",data)
    // })
      Api_Get_Home_Banner(true)
    Api_Get_Profile(true)

    }, [])
  );

  const Api_Get_Profile = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.get(GET_PROFILE).then((response) => {
      console.log("Api_Get_Profile : ", response)
      setIsLoading(false)
      if (response.data.status == true) {
        var user_data = response.data.data
        console.log("user_data",user_data)
        setTotalPoints(user_data.user.reward_point)
        console.log("GET PROFILE SUCCESSFULLY")
      } else {
        alert(response.data.message)
      }

    }).catch((err) => {
      setIsLoading(false)
      console.error("Api_Get_Profile Error ", err);
    })
  }
  const Api_Get_Home_Banner = (isLoad) => {
    setIsLoading(isLoad)
    ApiManager.get(GET_HOME_BANNER).then((response) => {
      // console.log("Api_Get_Home_Banner : ", response)
      setIsLoading(false)
      var data = response.data
      if (data.status == true) {
        setBannerData(data.data)
       console.log("GET HOME BANNER SUCCESSFULLY")
      } else {
        alert(data.message)
      }

    }).catch((err) => {
      setIsLoading(false)
      console.error("Api_Get_Home_Banner Error ", err);
    })
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 

  

  return (
    <>
      <HeaderView title={Translate.t("welcome", { name: userData.user.first_name+"!" })} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}>

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
              <Text style={styles.textPoint}>{totalPoints}</Text>
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
              {userData.user.first_name.charAt(0)}
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
            data={bannerData}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (<View style={{ width: widthPixel(20) }}></View>)}
            renderItem={({ item, index }) => (
              <View style={{ borderRadius: widthPixel(10), width: SCREEN_WIDTH - 100, height: widthPixel(160), }}>
                <FastImage
                  style={{ flex: 1, borderRadius: widthPixel(10) }}
                  source={{ uri: userData.asset_url+item.banner_image }}
                />
              </View>
            )}
          />
        </View>



              <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} referralcode={userData?.user?.referral_code}/>

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
      {isLoading && <LoadingView />}
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