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
import { GET_CONTACT_DETAILS, GET_PROFILE, GET_REWARD, REDEEM_REWARD } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import { useFocusEffect } from '@react-navigation/native'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const Rewards = () => {
    const userData = useSelector(user_data)
    const [isCongratulationModel, setCongratulationModel] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [totalPoints, setTotalPoints] = useState()
    const [voucherData, setVoucherData] = useState()
    const [point, setPoint] = useState()
    const [BannerPoints, setBannerPoints] = useState()
    const [message, setMessage] = useState("")
    const [AlertShow, setAlertShow] = useState(false)

    useEffect(() => {
        Api_Get_Profile(true)
        Api_Get_Reward_item(true)
        Api_Get_Contact_details(true)
    }, [])



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // const AlertActive = () => {
    //     setAlertShow(!AlertShow);
    // };

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
            setMessage(response?.data?.message)
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
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: Translate.t('alert'),
                    textBody: response.data.message,
                    button: 'Ok',
                  })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Profile Error ", err);
        })
    }
    const Api_Get_Contact_details = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_CONTACT_DETAILS).then((response) => {
            console.log("Api_Get_Contact_details : ", response)
            setIsLoading(false)
            var data = response.data
            if (data.status == true) {
                // setBannerPoints(data.data)
                setBannerPoints(1000)
                console.log("GET CONTACT DATA SUCCESSFULLY")
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
            console.error("Api_Get_Contact_details Error ", err);
        })
    }


    const redeem_cards = (item) => {
        if (userData.user.bank_name !== null && userData.user.ifsc_code && userData.user.account_no) {
            console.log(true)
            Api_Redeeem(true, item)
        }
        else {
            // AlertActive()
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: Translate.t('alert'),
                textBody: "We don't have your bank account details. please add your bank details.",
                button: 'Go to profile',
                onPressButton: ()=> {
                    Dialog.hide();
                    navigate("Profile")
                    console.log("go to Profile")},
              })
        }
        // Api_Redeeem(true, item)
    }


    return (
        <>
            <HeaderView title={Translate.t("krifix_reward")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
                onPress={() => goBack()}>

                <View
                    style={[styles.viewInvite, {
                        alignItems: 'center', paddingVertical: pixelSizeHorizontal(25),
                        borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                    }]}>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigate('RedeemHistory')}
                        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

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


                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigate('Profile')}
                        style={{
                            width: widthPixel(80), height: widthPixel(80), borderRadius: widthPixel(80), backgroundColor: iceBlue,
                            borderWidth: widthPixel(2), borderColor: greenPrimary, marginTop: pixelSizeHorizontal(-45),
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                        <Text style={styles.textBigName}>{userData.user.first_name.charAt(0)}</Text>

                    </TouchableOpacity>

                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                        <FastImage
                            source={AppLogoImg}
                            style={{ width: widthPixel(100), height: widthPixel(30), }}
                            resizeMode={'contain'}
                        />
                    </View>


                </View>
                <ImageBackground
                    imageStyle={{ borderBottomLeftRadius: widthPixel(10), borderBottomRightRadius: widthPixel(10) }}
                    source={require("../assets/images/Banner.png")}
                    style={{ height: widthPixel(124), borderBottomLeftRadius: widthPixel(10), borderBottomRightRadius: widthPixel(10) }}

                >
                    <View style={{ alignItems: "center", marginVertical: pixelSizeVertical(10) }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FastImage
                                source={require("../assets/images/krifix_trans.png")}
                                style={{ width: "40%", height: 30 }}
                                resizeMode={'contain'}
                            />
                            <Text style={{
                                fontFamily: ITALIC,
                                fontSize: 26,
                                color: black,
                            }}>Club</Text>
                        </View>
                        <Text style={{
                            fontFamily: MEDIUM,
                            fontSize: FontSize.FS_16,
                            color: black,
                        }}>Invite Friend And</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <Text style={{
                                fontFamily: BOLD,
                                fontSize: FontSize.FS_23,
                                color: black,
                                textAlign: "center"
                            }}>Earn {BannerPoints}</Text>
                            <FastImage
                                source={CoinImg}
                                style={{ width: widthPixel(26), height: widthPixel(26), marginLeft: 6 }}
                                resizeMode={'contain'}
                            />
                        </View>
                    </View>

                </ImageBackground>



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
                {/* {voucherData && */}
                <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                    {console.log("voucherData", message)}
                    <FlatList
                        data={voucherData}
                        // numColumns={1}
                        numColumns={2}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListFooterComponent={() => (<View style={{ height: widthPixel(20) }}></View>)}
                        ListEmptyComponent={() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{
                                fontSize: FontSize.FS_14,
                                color: black,
                                fontFamily: REGULAR,
                            }}>{message}</Text>
                        </View>)}
                        renderItem={({ item, index }) => (
                            // <>
                            //     <View style={{ flexDirection: "row", flex: 1, backgroundColor: iceBlue, borderRadius: 8, padding: widthPixel(8), }}>

                            //         <FastImage
                            //             source={{ uri: userData.asset_url + item.item_image }}
                            //             style={{ flex: 0.25 }}
                            //             resizeMode={'contain'}
                            //         />

                            //         <View style={{ backgroundColor: iceBlue, flex: 0.75, marginLeft: pixelSizeHorizontal(10) }}>
                            //             <Text style={[styles.textItem]}>{item.item_name}
                            //             </Text>
                            //             <Text style={[styles.textItem, { marginTop: pixelSizeVertical(6), color: warmGrey }]}>{item.item_desc}
                            //             </Text>
                            //             <View style={{
                            //                 alignItems: 'center', flexDirection: 'row',
                            //                 marginVertical: pixelSizeHorizontal(6), flex: 1
                            //             }}>
                            //                 <FastImage
                            //                     source={CoinImg}
                            //                     style={{ width: widthPixel(18), height: widthPixel(18) }}
                            //                     resizeMode={'contain'}
                            //                 />
                            //                 <Text style={[styles.textItem, { marginLeft: pixelSizeHorizontal(5), fontFamily: SEMIBOLD }]}>{item.item_point}</Text>
                            //             </View>

                            //         </View>
                            //     </View>
                            //     <TouchableOpacity onPress={() => { redeem_cards(item) }}
                            //         style={{
                            //             width: "100%",
                            //             backgroundColor: black, paddingVertical: pixelSizeHorizontal(8),
                            //             borderBottomRightRadius: widthPixel(8), borderBottomLeftRadius: widthPixel(8)
                            //         }}>
                            //         <Text style={styles.textRedeemIt}>
                            //             {Translate.t("redeem_it")}
                            //         </Text>
                            //     </TouchableOpacity>
                            // </>
                            <>
                                <View style={{ width: "46%", backgroundColor: iceBlue, margin: "2%", borderRadius: 8, paddingTop: pixelSizeVertical(12), }} >
                                    <FastImage
                                        source={{ uri: userData.asset_url + item.item_image }}
                                        style={{ width: 150, height: 100 }}
                                        resizeMode={'contain'}
                                    />
                                    <View style={{ flex: 1, alignItems: "center", marginTop: pixelSizeVertical(12), }}>
                                        <Text style={[styles.textItem]}>{item.item_name}
                                        </Text>
                                        <Text style={[styles.textItem, { marginTop: pixelSizeVertical(6), color: warmGrey }]}>{item.item_desc}
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
                                            <Text style={[styles.textItem, { marginLeft: pixelSizeHorizontal(5), fontFamily: SEMIBOLD }]}>{item.item_point}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { redeem_cards(item) }}
                                        style={{
                                            width: "100%",
                                            backgroundColor: black, paddingVertical: pixelSizeHorizontal(8),
                                            borderBottomRightRadius: widthPixel(8), borderBottomLeftRadius: widthPixel(8)
                                        }}>
                                        <Text style={styles.textRedeemIt}>
                                            {Translate.t("redeem_it")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    />

                </View>
                {/* } */}



                <InvitePopUp isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} referralcode={userData?.user?.referral_code} />
                <CongratulationsPopUp isWithDrawModel={true} Point={point}
                    isInviteVisible={isCongratulationModel} toggleInvite={() => {
                        Api_Get_Profile(true)
                        CongratulationModel()
                    }} />
                {/* <AlertView
                    isAlertVisible={AlertShow}
                    toggleAlert={() => AlertActive()}
                    title={Translate.t('alert')}
                    description={"We don't have your bank account details. please add your bank details."}
                    type="error"
                    successText="Go to profile"
                    cancleText="Cancle"
                    onSucess={() => { setAlertShow(false), navigate('Profile') }}
                    onCancel={() => { setAlertShow(false) }}
                /> */}
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
export default Rewards