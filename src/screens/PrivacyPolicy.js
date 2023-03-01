import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'

const PrivacyPolicy = () => {
    return (
        <HeaderView title={Translate.t("privacy")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>

            <Text style={styles.textTitle}> 
                {Translate.t("privacy")}
            </Text>

            <Text style={styles.textDesc}> 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the electronic typesetting, remaining essentially unchanged.

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>

        </HeaderView>
    )
}

const styles = StyleSheet.create({

    textTitle : {
        fontSize : FontSize.FS_16,
        fontFamily : SEMIBOLD,
        color : black,
        marginTop : pixelSizeHorizontal(30)
    },
    textDesc : {
        fontSize : FontSize.FS_12,
        fontFamily : REGULAR,
        color : warmGrey,
        marginVertical : pixelSizeHorizontal(30)
    }
})

export default PrivacyPolicy