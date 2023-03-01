import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import FastImage from 'react-native-fast-image'
import { AtImg, BigPhoneImg, NavigateImg, PhoneImg } from '../constants/Images'

const ContactUs = () => {
    return (
        <HeaderView title={Translate.t("contact_us")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <Text style={styles.textTitle}>
                {Translate.t("contact_us")}
            </Text>

            <TouchableOpacity style={styles.viewItem}>

                <FastImage
                    source={NavigateImg}
                    style={{ width: widthPixel(40), height: widthPixel(40) }}
                    resizeMode='contain'
                />

                <Text style={styles.textDesc}>
                    B/803, Ganesh Glory, 11 Jagatpur Road, Sarkhej-Gandhinagar Highway, Gota, Ahmedabad, Gujarat 382470.
                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.viewItem}
                onPress={() => Linking.openURL("tel:+919925326200")}>

                <FastImage
                    source={BigPhoneImg}
                    style={{ width: widthPixel(40), height: widthPixel(40) }}
                    resizeMode='contain'
                />

                <Text style={styles.textDesc}>
                    +91 9925326200
                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.viewItem}
                onPress={() => Linking.openURL("mailto:info@krifix.com")}>

                <FastImage
                    source={AtImg}
                    style={{ width: widthPixel(40), height: widthPixel(40) }}
                    resizeMode='contain'
                />

                <Text style={styles.textDesc}>
                    info@krifix.com
                </Text>

            </TouchableOpacity>

        </HeaderView>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row', marginTop: pixelSizeHorizontal(30),
        alignItems: 'center',
    },
    textTitle: {
        fontSize: FontSize.FS_16,
        fontFamily: SEMIBOLD,
        color: black,
        marginTop: pixelSizeHorizontal(30)
    },
    textDesc: {
        fontSize: FontSize.FS_12,
        fontFamily: REGULAR,
        color: warmGrey,
        flex: 1,
        marginLeft: pixelSizeHorizontal(20)
    }
})

export default ContactUs