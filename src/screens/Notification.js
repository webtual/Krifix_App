import { View, Text, TouchableOpacity, StyleSheet, Share, Pressable, FlatList, SectionList, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, greenPrimary, iceBlue, offWhite, paleGreen, white, warmGrey, disableColor, light_grey } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, NotificationSq, RedeemImg, ScanImg, ShareBoxImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK, SCREEN_WIDTH } from '../constants/ConstantKey'

import { goBack, navigate } from '../navigations/RootNavigation'
import InvitePopUp from './InvitePopUp'
import { Image } from 'react-native-svg'
import ApiManager from '../commonComponents/ApiManager'
import { GET_NOTIFICATIONS, READ_NOTIFICATIONS } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import moment from 'moment'

const Notification = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [notificationData, setNoificationData] = useState()
    const NotificationData = [
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
        },
    ];

    useEffect(() => {
        Api_Get_Notification(true)
    }, [])


    const Api_Get_Notification = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_NOTIFICATIONS).then((response) => {
            // console.log("Api_Get_Notification : ", response)
            setIsLoading(false)
            var data = response.data
            if (data.status == true) {
                setNoificationData(data.data)
                console.log("GET NOTIFICATION SUCCEESSFULLY")
            } else {
                alert(data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Notification Error ", err);
        })
    }

    const Api_Read_Notifications = (isLoad, item) => {
        setIsLoading(isLoad)
        ApiManager.post(READ_NOTIFICATIONS, {
            id: item.id,
        }).then((response) => {
            // console.log("Api_Read_Notifications : ", response)
            setIsLoading(false)
            var data = response.data;
            if (data.status == true) {
                Api_Get_Notification(true)
                Alert.alert(
                    item.title,
                    item.body,
                    [
                        { text: 'Done', onPress: () =>console.log("") , style: 'default' },
                    ]
                );
                console.log("READ NOTIFICATION SUCCEESSFULLY")
            } else {

            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Read_Notifications Error ", err);
        })
    }
 
    return (
        <>
            <HeaderView title={Translate.t("Notification")} onPress={() => goBack()}
                containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
            >
                {notificationData &&
                    <FlatList
                        data={notificationData}
                        scrollEnabled={false}
                        ListEmptyComponent={() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textTransform: "capitalize" }}>{Translate.t("no_data_found")}</Text>
                        </View>)}
                        ListHeaderComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(1), backgroundColor: white, marginVertical: pixelSizeHorizontal(2) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() =>  Api_Read_Notifications(true, item)}
                                style={[styles.notificationContainer,
                                {
                                    backgroundColor: item.is_read  === 0 ?light_grey: white,
                                    paddingHorizontal: 25,
                                    paddingVertical: 10
                                }]}>
                                <FastImage
                                    style={styles.image}
                                    source={NotificationSq}
                                />
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.body}</Text>
                                    <Text style={[styles.description, { color: black }]}>{moment(item?.created_at).format("DD MMM YYYY")}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                }
            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({

    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
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
        fontSize: FontSize.FS_14,
        color: black,
    },
    description: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_12,
        color: warmGrey,
        marginTop: pixelSizeVertical(4)
    }

})

export default Notification