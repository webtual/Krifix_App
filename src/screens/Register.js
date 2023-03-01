import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, greenPrimary, offWhite, warmGrey, white } from '../constants/Color'
import HeaderView from '../commonComponents/HeaderView'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import { FontSize, MEDIUM, SEMIBOLD } from '../constants/Fonts'
import TextInputView from '../commonComponents/TextInputView'
import { goBack, resetScreen } from '../navigations/RootNavigation'
import { BuildingImg, LocationImg, PhoneImg, PinImg, SmileImg } from '../constants/Images'

const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState("")
    const [fullName, setFullName] = useState("")
    const [city, setCity] = useState("")
    const [area, setArea] = useState("")
    const [pincode, setPincode] = useState("")

    const btnSignUpTap = () => {

    }

    const btnLoginTap = () => {
        goBack()
    }

    return (

        <HeaderView title={Translate.t("sign_up")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>


            <View style={{ marginTop: pixelSizeHorizontal(60) }}>

                <TextInputView
                    imageSource={SmileImg}
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                    placeholder={Translate.t("full_name")}
                />

                <TextInputView
                    imageSource={PhoneImg}
                    containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                    placeholder={Translate.t("mobile")}
                />

                <TextInputView
                    imageSource={BuildingImg}
                    containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder={Translate.t("city")}
                />


                <TextInputView
                    imageSource={LocationImg}
                    containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                    value={area}
                    onChangeText={(text) => setArea(text)}
                    placeholder={Translate.t("area")}
                />


                <TextInputView
                    imageSource={PinImg}
                    containerStyle={{ marginTop: pixelSizeHorizontal(30) }}
                    value={pincode}
                    onChangeText={(text) => setPincode(text)}
                    placeholder={Translate.t("pincode")}
                />

                <Pressable
                    onPress={() => btnLoginTap()}
                    style={styles.btnStyle}>
                    <Text style={styles.btnText}>{Translate.t("sign_up")}</Text>

                </Pressable>

                <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: pixelSizeHorizontal(25) }}>
                    <Text style={styles.text}>
                        {Translate.t("already_Registered")}
                    </Text>
                    <TouchableOpacity onPress={() => btnLoginTap()}>
                        <Text style={styles.textSignUp}>
                            {Translate.t("login")}
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

export default Register