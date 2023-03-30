import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import FastImage from 'react-native-fast-image'
import { black, black05, disableColor, greenPrimary, paleGreen, primary, transparent, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { Account, AppLogoImg, Bank, Branch, BuildingImg, Camera, CardId, Check, FooterImage, Ifsc, LocationImg, PhoneImg, PinImg, PrivacyImg, Selfie, SmileImg, Success, Upi } from '../constants/Images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, USER_DATA } from '../constants/ConstantKey'
import { GET_PROFILE, UPDATE_BANK, UPDATE_PROFILE, UPDATE_UPI } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'
import { storeData } from '../commonComponents/AsyncManager'
import { storeUserData, user_data } from '../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AlertView from '../commonComponents/AlertView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { goBack, navigate } from '../navigations/RootNavigation'


const KycIntro = () => {

    const dispatch = useDispatch()
    const userData = useSelector(user_data)
    const [isLoading, setIsLoading] = useState(false)




    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}  >
            <HeaderView title={"KYC verification"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>
                <View style={{ marginVertical: pixelSizeHorizontal(10), alignItems: "center" }}>
                    <FastImage
                        source={AppLogoImg}
                        style={{ width: "40%", height: 30 }}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{ alignItems: "center", marginVertical: pixelSizeHorizontal(15) }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_22, color: black }}>Submit Documents</Text>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, textAlign: "center", marginTop: 20 }}>We need to verify your information</Text>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, textAlign: "center", marginTop: 5 }}>Please submit the documents bellow to process your information</Text>
                </View>

                <View style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: white,
                    borderRadius: 8,
                    padding: 10,
                    shadowColor: black05,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 8,
                    elevation: 3
                }}>
                    <FastImage tintColor={greenPrimary}
                        source={CardId}
                        style={{ width: 60, height: 50 }}
                        resizeMode={'contain'}
                    />
                    <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: warmGrey, }}>Step 1</Text>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_17, color: black }}>Upload your document</Text>
                    </View>
                </View>

                <View style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: white,
                    borderRadius: 8,
                    padding: 10,
                    shadowColor: black05,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 8,
                    elevation: 3
                }}>
                    <FastImage tintColor={greenPrimary}
                        source={Selfie}
                        style={{ width: 60, height: 50 }}
                        resizeMode={'contain'}
                    />
                    <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: warmGrey, }}>Step 2</Text>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_17, color: black }}>Take a selfie</Text>
                    </View>
                </View>


                <View style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: white,
                    borderRadius: 8,
                    padding: 10,
                    shadowColor: black05,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 8,
                    elevation: 3
                }}>
                    <FastImage tintColor={greenPrimary}
                        source={Check}
                        style={{ width: 60, height: 50 }}
                        resizeMode={'contain'}
                    />
                    <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: warmGrey, }}>Step 3</Text>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_17, color: black }}>Success</Text>
                    </View>
                </View>
                <Pressable
                    onPress={() =>{navigate("UploadDocument")}}
                    style={{backgroundColor: greenPrimary,
                        padding: pixelSizeHorizontal(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: widthPixel(8),
                        marginVertical: pixelSizeHorizontal(30)}}>
                    <Text style={styles.btnSaveText} >Start</Text>

                </Pressable>
            </HeaderView>
            {isLoading && <LoadingView />}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        borderRadius: widthPixel(20),
        width: '70%'
    },
    btnText: {
        fontFamily: MEDIUM,
        color: white,
        fontSize: FontSize.FS_12,
        textTransform: 'uppercase',
    },
    textTitle: {
        fontFamily: MEDIUM,
        color: warmGrey,
        fontSize: FontSize.FS_14,
    },
    textHeader: {
        fontFamily: SEMIBOLD,
        color: greenPrimary,
        fontSize: FontSize.FS_20,
    },
    btnSaveStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthPixel(8),
        marginBottom: pixelSizeHorizontal(30)
    },
    btnSaveText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_16,
        textTransform: 'uppercase',
    },
    errorText: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_10,
        color: 'red',
        marginLeft: pixelSizeHorizontal(40)
    },
})

export default KycIntro