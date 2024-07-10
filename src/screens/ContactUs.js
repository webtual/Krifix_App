import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import { AtImg, BigPhoneImg, NavigateImg, PhoneImg } from '../constants/Images'
import ApiManager from '../commonComponents/ApiManager'
import { GET_CONTACT_DETAILS } from '../constants/ApiUrl'
import LoadingView from '../commonComponents/LoadingView'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [contactData, setContactData] = useState()

    useEffect(() => {
        Api_Get_Contact_details(true)
    }, [])


    const Api_Get_Contact_details = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_CONTACT_DETAILS).then((response) => {
            // console.log("Api_Get_Contact_details : ", response)
            setIsLoading(false)
            var data = response.data
            if (data.status == true) {
                setContactData(data.data)

                // console.log("Api_Get_Contact_details data successfully")
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




    return (
        <>
        <HeaderView title={Translate.t("contact_us")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <Text style={styles.textTitle}>
                {Translate.t("contact_us")}
            </Text>

            <View style={styles.viewItem}>

                <Image
                    source={NavigateImg}
                    style={{ width: widthPixel(40), height: widthPixel(40), resizeMode : 'contain' }}
                    // resizeMode='contain'
                />

                <Text style={styles.textDesc}>{contactData?.contact_address}</Text>

            </View>

            <TouchableOpacity style={styles.viewItem}
                onPress={() => Linking.openURL("tel:+91"+(contactData?.contact_no))}>

                <Image
                    source={BigPhoneImg}
                    style={{ width: widthPixel(40), height: widthPixel(40), resizeMode : 'contain' }}
                    // resizeMode='contain'
                />

                <Text style={styles.textDesc}>{contactData?.contact_no}</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.viewItem}
                onPress={() => Linking.openURL("mailto:info@krifix.com")}>

                <Image
                    source={AtImg}
                    style={{ width: widthPixel(40), height: widthPixel(40),resizeMode : 'contain' }}
                    // resizeMode='contain'
                />

                <Text style={styles.textDesc}>{contactData?.contcat_email}</Text>

            </TouchableOpacity>

        </HeaderView>
        {isLoading && <LoadingView />}
        </>
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