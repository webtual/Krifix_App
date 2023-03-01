import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, greenPrimary, offWhite, warmGrey, white } from '../constants/Color'
import HeaderView from '../commonComponents/HeaderView'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { navigate, resetScreen } from '../navigations/RootNavigation'
import { PhoneImg } from '../constants/Images'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState("")

    const btnLoginTap = () => {
        navigate("OtpView")
    }

    const btnSignUpTap = () => {
        navigate("Register")
    }

    return (

        <HeaderView title={Translate.t("login")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}>

            <View style={{ marginTop: pixelSizeHorizontal(60) }}>

                <TextInputView
                    value={mobile}
                    imageSource={PhoneImg}
                    onChangeText={(text) => setMobile(text)}
                    placeholder={Translate.t("mobile")}
                />

                <Pressable
                    onPress={() => btnLoginTap()}
                    style={styles.btnStyle}>
                    <Text style={styles.btnText}>{Translate.t("login")}</Text>

                </Pressable>

                <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: pixelSizeHorizontal(25) }}>
                    <Text style={styles.text}>
                        {Translate.t("new_to_krifix")}
                    </Text>
                    <TouchableOpacity onPress={() => btnSignUpTap()}>
                        <Text style={styles.textSignUp}>
                            {Translate.t("sign_up")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </HeaderView>
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
    text: {
        color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
    textSignUp: {
        color: greenPrimary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16
    }
})

export default Login