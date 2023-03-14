import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Translate from '../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { goBack, resetScreen } from '../navigations/RootNavigation'
import { black, greenPrimary, seprator, warmGrey, white } from '../constants/Color'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LoadingView from '../commonComponents/LoadingView'

const OtpView = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [optcode, setOptcode] = useState("")


    // Action Methods
    const btnResendTap = () => {

    }

    const btnSubmitTap = () => {
        console.log("optcode.length",optcode.length)
        if(optcode.length == 4){
            resetScreen("Dashboard")
        }
    }

    return (
        <>
        <HeaderView title={Translate.t("enter_otp")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <View style={{ marginTop: pixelSizeHorizontal(60) }}>


            <View style={styles.otpView}>
					<OTPInputView
						style={{ flex: 1, height: heightPixel(55) }}
						pinCount={4}
						code={optcode}
						onCodeChanged={code => { setOptcode(code) }}
						autoFocusOnLoad={false}
						codeInputFieldStyle={styles.borderStyleBase}
						codeInputHighlightStyle={styles.borderStyleHighLighted}
						onCodeFilled={(code) => {

							setOptcode(code)

							// if (code != OTP) {
							// 	alert("Please enter valid OTP")
							// } 
							// else {
							// 	// API_CHECK_MOBILE(true)
							// }

							console.log(`Code is ${code}, you are good to go!`)
						}}
					/>
				</View>


                <Pressable
                    onPress={() => btnSubmitTap()}
                    style={styles.btnStyle}>
                    <Text style={styles.btnText}>{Translate.t("submit")}</Text>

                </Pressable>


                <View style={{ alignSelf: 'center', marginTop: pixelSizeHorizontal(25) }}>
                    <Text style={styles.textDesc}>
                        {Translate.t("otp_desc")}
                    </Text>
                    <TouchableOpacity style={{ marginTop: pixelSizeHorizontal(12) }}
                        onPress={() => btnResendTap()}>
                        <Text style={styles.textResend}>
                            {Translate.t("resend_otp")}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            
        </HeaderView>
    {isLoading && <LoadingView/>}
    </>
    )
}



const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent : 'center',
        borderRadius: widthPixel(8),
        marginTop: pixelSizeHorizontal(40)
    },
    btnText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_22,
        textTransform: 'uppercase',
    },
    textDesc: {
        color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
    textResend: {
        color: greenPrimary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16,
        textAlign: 'center',
    },
    otpView : {
		marginHorizontal: pixelSizeHorizontal(30),
	},
    borderStyleBase: {
		borderWidth: 2, borderColor: seprator, height : heightPixel(55),
		fontSize: FontSize.FS_22, fontFamily: REGULAR, borderRadius : 5,
		color: black, alignItems : 'center', justifyContent : 'center',
        backgroundColor : seprator
	},
	borderStyleHighLighted: {
		borderColor: greenPrimary, fontSize: FontSize.FS_22, height : heightPixel(55),
		fontFamily: REGULAR, color: black, alignItems : 'center', justifyContent : 'center'
	},
})

export default OtpView