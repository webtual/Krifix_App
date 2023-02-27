import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, SEMIBOLD } from '../constants/Fonts'
import { black } from '../constants/Color'
import FastImage from 'react-native-fast-image'
import { CallImg, HelpImg, HomeFillImg, InfoImg, LogoutImg, NotificationImg, PrivacyImg, ShareImg } from '../constants/Images'

const Settings = () => {

  const Items = [
    {
      title: Translate.t("notifications"),
      image: NotificationImg,
      screenName : ""
    },
    {
      title: Translate.t("privacy"),
      image: PrivacyImg,
      screenName : ""
    },
    {
      title: Translate.t("help_center"),
      image: HelpImg,
      screenName : ""
    },
    {
      title: Translate.t("about_us"),
      image: InfoImg,
      screenName : ""
    },
    {
      title: Translate.t("refer_earn"),
      image: ShareImg,
      screenName : ""
    },
    {
      title: Translate.t("contact_us"),
      image: CallImg,
      screenName : ""
    },
    {
      title: Translate.t("logout"),
      image: LogoutImg,
      screenName : ""
    },
  ]

  return (
    <HeaderView title={Translate.t("settings")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>


      <FlatList
        data={Items}
        scrollEnabled={false}
        ListHeaderComponent={() => (<View style={{height : widthPixel(20)}}></View>)}
        ListFooterComponent={() => (<View style={{height : widthPixel(20)}}></View>)}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pixelSizeHorizontal(15) }}>

            <FastImage
              style={{ width: widthPixel(40), height: widthPixel(40) }}
              resizeMode="contain"
              source={item.image}
            />
            <Text style={styles.textTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

    </HeaderView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: FontSize.FS_18,
    color: black,
    fontFamily: SEMIBOLD,
    marginLeft : pixelSizeHorizontal(15)
  }
})

export default Settings