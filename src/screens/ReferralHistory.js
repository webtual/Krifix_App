import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../navigations/RootNavigation'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, ScanColorImg, TicketImg, WithdrawImg } from '../constants/Images'
import { black, greenPrimary, iceBlue, warmGrey, white, } from '../constants/Color'
import { BOLD, FontSize, ITALIC, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import InvitePopUp from './InvitePopUp'
import { RUPEE, SCREEN_WIDTH } from '../constants/ConstantKey'
import CongratulationsPopUp from './CongratulationsPopUp'
import { useSelector } from 'react-redux'
import { user_data } from '../redux/reducers/userReducer'
import ApiManager from '../commonComponents/ApiManager'
import { GET_CONTACT_DETAILS, GET_PROFILE, GET_REFERRAL, GET_REWARD, GET_TRANSACTION_HISTORY, REDEEM_REWARD } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const ReferralHistory = () => {
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)
    const [referralData, setReferralData] = useState([])
    const array = []
    useEffect(() => {
        Api_Get_Referral(true)
    }, [])

    const Api_Get_Referral = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_REFERRAL).then((response) => {
            console.log("Api_Get_Referral : ", response)
            setIsLoading(false)
            if (response.data.status == true) {
                var user_data = response.data.data
                console.log("user_data", user_data)
                setReferralData(user_data)
            } else {
                // Dialog.show({
                //     type: ALERT_TYPE.DANGER,
                //     title: Translate.t('alert'),
                //     textBody: response.data.message,
                //     button: 'Ok',
                // })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Referral Error ", err);
        })
    }

    return (
        <>
            <HeaderView title={Translate.t("referral_history")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
                onPress={() => goBack()}>
               
                {referralData.length !== 0 ?
                    <FlatList
                        data={referralData}
                        style={{ marginVertical: 20 }}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        renderItem={({ item, index }) => (
                            <>
                                <View style={{ paddingVertical: 5, backgroundColor: iceBlue, borderRadius: 8, paddingHorizontal: 10, flexDirection: "row", alignItems: "center" }}>

                                    {(item.avatar == null && item.avatar == "" && item.avatar == undefined) ?

                                        <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: "center", justifyContent: "center", backgroundColor: greenPrimary, }}>
                                            <Text style={{ color: white, fontFamily: BOLD, fontSize: 20 }}>{item.full_name.charAt(0)}</Text>
                                        </View>
                                        :
                                        <FastImage
                                            source={{ uri: userData.asset_url + item.avatar }}
                                            style={{ width: widthPixel(40), height: widthPixel(40), borderRadius: 40 }}
                                            resizeMode={'contain'}
                                        />
                                    }

                                    <View style={{ marginHorizontal: 15 }}>
                                        <Text style={{ fontFamily: BOLD, color: black }}>{parseInt(index + 1) + ". " + item.full_name}</Text>
                                        <Text style={{ fontFamily: REGULAR, color: warmGrey, marginVertical: 2 }}>{moment(item?.created_at).format("DD MMM YYYY")}</Text>

                                    </View>
                                </View>
                            </>

                        )}
                    />
                    :
                    isLoading !== true &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textItem}>No referral history found</Text>
                    </View>
                }



            </HeaderView>
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
    textItem: {
        fontSize: FontSize.FS_14,
        color: black,
        fontFamily: MEDIUM,
        // textAlign: 'center'
    },
    textRedeemIt: {
        fontSize: FontSize.FS_12,
        color: white,
        fontFamily: SEMIBOLD,
        textAlign: 'center'
    },
    textItemPrice: {
        fontSize: FontSize.FS_25,
        color: white,
        fontFamily: MEDIUM,
        textAlign: 'center',
    }
})
export default ReferralHistory