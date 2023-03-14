import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import RenderHtml from 'react-native-render-html';

const AboutUs = () => {
    const { width } = useWindowDimensions();
    const source = {
        html: `
      <p style='text-align:center;'>
       About Us
      </p>`
    };
    return (
        <HeaderView title={Translate.t("about_us")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>
            <RenderHtml
                contentWidth={width}
                source={source}
            />
        </HeaderView>
    )
}

const styles = StyleSheet.create({

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
        marginVertical: pixelSizeHorizontal(30)
    }
})

export default AboutUs