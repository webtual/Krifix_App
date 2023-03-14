import { View, Text, TouchableOpacity, StyleSheet, Share, Pressable, FlatList, SectionList } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, greenPrimary, iceBlue, offWhite, paleGreen, white, warmGrey, disableColor } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, NotificationSq, RedeemImg, ScanImg, ShareBoxImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK, SCREEN_WIDTH } from '../constants/ConstantKey'

import { goBack, navigate } from '../navigations/RootNavigation'
import InvitePopUp from './InvitePopUp'
import { Image } from 'react-native-svg'

const Notification = () => {

    const NotificationData = [
        {
            title: 'Today',
            data: [
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
            ]
        },
        {
            title: 'Yesterday',
            data: [
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                }, {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',

                },
                {
                    title: 'you have successfully earn',
                    desc: 'Savings Credited to your wallet',
                },
            ]
        }
    ];

    return (
        <>
            <HeaderView title={Translate.t("Notification")} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
                <View>
                    <SectionList
                        sections={NotificationData}
                        keyExtractor={(item, index) => item + index}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(1), backgroundColor: disableColor, marginVertical: pixelSizeVertical(10) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(40) }}></View>)}
                        renderItem={({ item }) => (
                            <View style={styles.notificationContainer}>
                                <FastImage
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={NotificationSq}
                                />
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.desc}</Text>
                                </View>
                                <View></View>
                            </View>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionText}>{title}</Text>
                        )}
                    />
                </View>
            </HeaderView>


        </>
    )
}

const styles = StyleSheet.create({

    sectionText: {
        fontFamily: MEDIUM,
        fontSize: FontSize.FS_16,
        color: warmGrey,
        marginTop: pixelSizeHorizontal(31),
        marginBottom: pixelSizeVertical(14)
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: pixelSizeHorizontal(12)

    },
    image: {
        height: 42,
        width: 42
    },
    titleContainer: {
        marginHorizontal: pixelSizeHorizontal(12)
    },
    title: {
        fontFamily: SEMIBOLD,
        fontSize: FontSize.FS_16,
        color: black,
    },
    description: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_12,
        color: warmGrey,
        marginTop: pixelSizeVertical(10)
    }

})

export default Notification