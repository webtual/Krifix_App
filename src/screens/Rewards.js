import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack } from '../navigations/RootNavigation'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CoinImg, InviteImg, ScanColorImg, TicketImg } from '../constants/Images'
import { black, greenPrimary, iceBlue, white } from '../constants/Color'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import InvitePopUp from './InvitePopUp'
import { RUPEE } from '../constants/ConstantKey'

const Rewards = () => {


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const btnScanTap = () => {

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
                        data={[1, 2, 3, 5, 5, 9]}
                        numColumns={2}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        renderItem={({ item, index }) => (
                            <View style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(25) }}>

                                <View style={{ height: widthPixel(60) }}>
                                    <FastImage
                                        source={TicketImg}
                                        style={{ flex: 1, height: widthPixel(60) }}
                                    // resizeMode={'contain'}
                                    />
                                    <View style={{ position: 'absolute', height: widthPixel(60), alignItems: 'center', justifyContent: 'center', left: 0, right: 0 }}>
                                        <Text style={styles.textItemPrice}>
                                            {RUPEE} 50
                                        </Text>
                                    </View>

                                </View>

                                <View style={{ backgroundColor: iceBlue, paddingVertical: pixelSizeHorizontal(10) }}>
                                    <Text style={styles.textItem}>
                                        {Translate.t("cash_voucher")}
                                    </Text>
                                    <View style={{
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

                                    </View>

                                </View>

                                <TouchableOpacity style={{
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

                <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} />


            </HeaderView>
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
        fontSize: FontSize.FS_30,
        color: white,
        fontFamily: MEDIUM,
        textAlign: 'center',
    }
})
export default Rewards