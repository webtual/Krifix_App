import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import RenderHtml from 'react-native-render-html';

const PrivacyPolicy = () => {
    const { width } = useWindowDimensions();
    const source = {
        html: `
      <p style='text-align:center;'>
        Privacy Policy
      </p>`
    };

    return (
        <HeaderView title={Translate.t("privacy")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>
            <RenderHtml
                contentWidth={width}
                source={source}
            />

        </HeaderView>
    )
}

const styles = StyleSheet.create({

})

export default PrivacyPolicy