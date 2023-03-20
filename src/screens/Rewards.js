import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../navigations/RootNavigation'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, ScanColorImg, TicketImg, WithdrawImg } from '../constants/Images'
import { black, greenPrimary, iceBlue, white } from '../constants/Color'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import InvitePopUp from './InvitePopUp'
import { RUPEE, SCREEN_WIDTH } from '../constants/ConstantKey'
import CongratulationsPopUp from './CongratulationsPopUp'
import { useSelector } from 'react-redux'
import { user_data } from '../redux/reducers/userReducer'
import ApiManager from '../commonComponents/ApiManager'
import { GET_PROFILE, GET_REWARD, REDEEM_REWARD } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import { useFocusEffect } from '@react-navigation/native'

const Rewards = () => {
    const userData = useSelector(user_data)
    const [isCongratulationModel, setCongratulationModel] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [totalPoints, setTotalPoints] = useState()
    const [voucherData, setVoucherData] = useState()
    const [point, setPoint] = useState()

    useEffect(() => {
        Api_Get_Profile(true)
        Api_Get_Reward_item(true)
    }, [])



    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };
    const CongratulationModel = () => {
        setCongratulationModel(!isCongratulationModel);
    };
    const btnScanTap = () => {
        navigate('QrCodeScan')
    }
    const Api_Get_Reward_item = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_REWARD).then((response) => {
            console.log("Api_Get_Reward_item : ", response)
            setIsLoading(false)
            if (response.data.status == true) {
                var user_data = response.data.data
                setVoucherData(user_data)
            } else {

            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Reward_item Error ", err);
        })
    }
    const Api_Redeeem = (isLoad, item) => {
        console.log("item", item)
        setIsLoading(isLoad)
        ApiManager.post(REDEEM_REWARD, {
            item_id: item.id,
        }).then((response) => {
            console.log("Api_Redeeem : ", response)
            setIsLoading(false)
            setPoint(item.item_point)
            var data = response.data;
            console.log("data", data)
            if (data.status == true) {
                CongratulationModel()
            } else {
                // Alert.alert(
                //     Translate.t('alert'),
                //     data.message,
                //     [
                //     { text: 'Ok', onPress: () => setOpneScanner(true), style: 'default' },
                // ]
                //   );
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Redeeem Error ", err);
        })
    }
    const Api_Get_Profile = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_PROFILE).then((response) => {
            console.log("Api_Get_Profile : ", response)
            setIsLoading(false)
            if (response.data.status == true) {
                var user_data = response.data.data
                setTotalPoints(user_data.user.reward_point)
            } else {
                alert(response.data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Profile Error ", err);
        })
    }

    return (
        <>
            <HeaderView title={Translate.t("krifix_reward")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
                onPress={() => goBack()}>

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

                        <Text style={styles.textBigName}>{userData.user.first_name.charAt(0)}</Text>

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
                        onPress={() => btnScanTap()}>
                        <FastImage
                            source={ScanColorImg}
                            style={{ width: widthPixel(32), height: widthPixel(32) }}
                            resizeMode={'contain'}
                        />
                        <Text style={styles.textSmallTitle}>
                            {Translate.t("scan_qr")}
                        </Text>
                    </TouchableOpacity>

                </View>


                <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                    <FlatList
                        data={voucherData}
                        numColumns={2}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListEmptyComponent={() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textItem}>{Translate.t("no_data_found")}</Text>
                        </View>)}
                        renderItem={({ item, index }) => (
                            <View style={{ flex : 1/2, marginHorizontal: pixelSizeHorizontal(25) }}>

                                <View style={{ height: widthPixel(60) }}>
                                    <FastImage
                                        source={TicketImg}
                                        style={{ flex: 1, height: widthPixel(60) }}
                                        resizeMode={'cover'}
                                    />
                                    <View style={{ position: 'absolute', height: widthPixel(60), alignItems: 'center', justifyContent: 'center', left: 0, right: 0 }}>
                                        <Text style={styles.textItemPrice}>
                                            {RUPEE} {item.item_price}
                                        </Text>
                                    </View>

                                </View>

                                <View style={{ backgroundColor: iceBlue, paddingVertical: pixelSizeHorizontal(10) }}>
                                    <Text style={styles.textItem}>{item.item_name}
                                    </Text>
                                    {/* <View style={{
                                        alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                                        marginTop: pixelSizeHorizontal(10)
                                    }}>
                                      <FastImage
                                            source={CoinImg}
                                            style={{ width: widthPixel(18), height: widthPixel(18) }}
                                            resizeMode={'contain'}
                                        />
                                        <Text style={[styles.textItem, { marginLeft: pixelSizeHorizontal(5), fontFamily: SEMIBOLD }]}>
                                            500
                                        </Text>

                                    </View> */}

                                </View>

                                <TouchableOpacity onPress={() => {
                                    console.log("item.id ", item)
                                    Api_Redeeem(true, item)
                                }
                                }
                                    style={{
                                        backgroundColor: black, paddingVertical: pixelSizeHorizontal(5),
                                        borderBottomLeftRadius: widthPixel(8), borderBottomRightRadius: widthPixel(8)
                                    }}>
                                    <Text style={styles.textRedeemIt}>
                                        {Translate.t("redeem_it")}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    />

                </View>

                <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} referralcode={userData?.user?.referral_code} />
                <CongratulationsPopUp isWithDrawModel={true} Point={point}
                    isInviteVisible={isCongratulationModel} toggleInvite={() => {
                        Api_Get_Profile(true)
                        CongratulationModel()
                    }} />
 
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
        fontSize: FontSize.FS_12,
        color: black,
        fontFamily: MEDIUM,
        textAlign: 'center'
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
export default Rewards