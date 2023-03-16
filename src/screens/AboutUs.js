import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import { goBack } from '../navigations/RootNavigation'
import RenderHtml from 'react-native-render-html';
import LoadingView from '../commonComponents/LoadingView'
import ApiManager from '../commonComponents/ApiManager'
import { GET_CMS } from '../constants/ApiUrl'

const AboutUs = () => {
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false)
    const [aboutData, setAboutData] = useState()


    useEffect(() => {
        Api_About(true)
    }, [])

    const Api_About = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(GET_CMS, {
            page_id: 3,
        }).then((response) => {
            console.log("Api_About : ", response)
            setIsLoading(false)

            var data = response.data
            if (data.status == true) {
                setAboutData(data.data)


            } else {
                alert(data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_About Error ", err);
        })
    }

    const source = {
        html: `${aboutData?.page_desc}`
    };
    return (
        <>
            <HeaderView title={Translate.t("about_us")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
                onPress={() => goBack()}>
                {aboutData?.page_desc &&
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