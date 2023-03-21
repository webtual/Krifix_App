import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import RenderHtml from 'react-native-render-html';
import LoadingView from '../commonComponents/LoadingView'
import { GET_CMS } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'

const PrivacyPolicy = () => {
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false)
    const [privacyData, setPrivacyData] = useState()

    useEffect(() => {
        Api_privacy(true)
    }, [])

    const Api_privacy = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(GET_CMS, {
            page_id: 2,
        }).then((response) => {
            console.log("Api_privacy : ", response)
            setIsLoading(false)

            var data = response.data
            if (data.status == true) {
                setPrivacyData(data.data)


            } else {
                alert(data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_privacy Error ", err);
        })
    }

    const source = {
        html: `${privacyData?.page_desc}`
    };

    return (
        <>
            <HeaderView title={Translate.t("privacy")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
                onPress={() => goBack()}>

                    {privacyData?.page_desc &&
                    <RenderHtml
                        contentWidth={width}
                        source={source}
                    />
                }
                
            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({

})

export default PrivacyPolicy