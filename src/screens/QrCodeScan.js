import { View, Text, TouchableOpacity, StyleSheet, Share, Pressable, FlatList, SectionList, Linking, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import { black, greenPrimary, iceBlue, offWhite, paleGreen, white, warmGrey, disableColor } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { AppLogoImg, CloseImg, CoinImg, CongratsImg, FlashImg, InviteImg, NotificationSq, RedeemImg, ScanImg, ScanImgBlack, ScanImgOutline, ShareBoxImg, WithdrawImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/ConstantKey'

import { goBack, navigate } from '../navigations/RootNavigation'
import InvitePopUp from './InvitePopUp'
import CongratulationsPopUp from './CongratulationsPopUp'
import QRCodeScanner from 'react-native-simple-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const QrCodeScan = () => {

    const refScan = useRef(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFlash, setIsFlash] = useState(RNCamera.Constants.FlashMode.off)


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        // setTimeout(() => {
        //     goBack()
        // }, 3000)
    };
    const onSuccess = e => {
        console.log("success", e)
        toggleModal()
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    const toggleFlash = () => {
        if(isFlash == 0){
            setIsFlash(RNCamera.Constants.FlashMode.torch)
        }else{
            setIsFlash(RNCamera.Constants.FlashMode.off)
        }
    }

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
                <QRCodeScanner
                    style={{ flex: 1 }}
                    cameraStyle={{ height: '100%' }}
                    containerStyle={{ flex: 1, backgroundColor: "transparent" }}
                    onRead={onSuccess}
                    flashMode={isFlash}
                    cameraProps={{ captureAudio: false }}
                    reactivate={true}
                    showOnlyCamera={true}
                    showMarker={Platform.OS !== "ios"}
                    ref={refScan}
                />
                <TouchableOpacity style={styles.headContainer} onPress={() => goBack()}>
                    <FastImage
                        style={styles.closeImage}
                        resizeMode="contain"
                        source={CloseImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.flashContainer}
                    onPress={() => toggleFlash()}>
                    <FastImage
                        style={styles.flashImage}
                        resizeMode="contain"
                        source={FlashImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanBtn}
                onPress={() => refScan.current.reactivate()}>
                    <FastImage
                        style={styles.image}
                        resizeMode="contain"
                        source={ScanImgBlack}
                    />
                    <Text style={styles.scanText}>{Translate.t("Scan_QR")} </Text>
                </TouchableOpacity>

            </View>
            <CongratulationsPopUp isWithDrawModel={false}
                isInviteVisible={isModalVisible} toggleInvite={() => toggleModal()} />
        </>
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
        backgroundColor: 'transparent'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },


    scanText: {
        fontFamily: SEMIBOLD,
        fontSize: FontSize.FS_25,
        color: black,
    },
    image: {
        height: 28,
        width: 28,
        marginRight: pixelSizeHorizontal(12)

    },
    scanBtn: {
        backgroundColor: white,
        width: SCREEN_WIDTH - 100,
        height: 60,
        position: "absolute",
        bottom: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 33,
        alignSelf: "center"
    },
    headContainer: {
        position: "absolute",
        left: 30,
        top: SCREEN_HEIGHT / 16
    },
    flashContainer: {
        position: "absolute",
        right: 30,
        top: SCREEN_HEIGHT / 16
    },
    closeImage: {
        height: 18,
        width: 18,
    },
    flashImage: {
        height: 22,
        width: 22,
    },

})

export default QrCodeScan