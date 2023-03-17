import { View, Text, StyleSheet, LayoutAnimation, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '../commonComponents/HeaderView'
import Translate from '../translation/Translate'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack } from '../navigations/RootNavigation'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { black, warmGrey } from '../constants/Color'
import FastImage from 'react-native-fast-image'
import { BackImg } from '../constants/Images'
import { GET_FAQS } from '../constants/ApiUrl'
import ApiManager from '../commonComponents/ApiManager'
import LoadingView from '../commonComponents/LoadingView'

const HelpCenter = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [Description_expanded, setDescription_expanded] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [ArrFaq, setArrFaq] = useState([1, 2, 3, 6, 5])
    const [faqData, setFaqData] = useState([])


    useEffect(() => {
        Description_changeLayout(0)
        Api_Get_Faq(true)
    }, [])

    const Api_Get_Faq = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.get(GET_FAQS).then((response) => {
            console.log("Api_Get_Faq : ", response)
            setIsLoading(false)
            var data = response.data
            if (data.status == true) {
                setFaqData(data.data)

                console.log("Api_Get_Faq data successfully")
            } else {
                alert(data.message)
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Faq Error ", err);
        })
    }
    const Description_changeLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (index == questionIndex) {
            setDescription_expanded(!Description_expanded)
        } else {
            setDescription_expanded(true)
        }
        setQuestionIndex(index)
    }


    return (
        <>
        <HeaderView title={Translate.t("faq")} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(25) }}
            onPress={() => goBack()}>
            {faqData?.length === 0 ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textItem}>{Translate.t("no_data_found")}</Text>
        </View>:
        <View>
           <Text style={styles.textTitle}>
           {Translate.t("we_are_here_to_help")}
       </Text>
            <FlatList
                data={faqData}
                scrollEnabled={false}
                ListHeaderComponent={() => (<View style={{ height: widthPixel(30), }} />)}
                ItemSeparatorComponent={() => (<View style={{ height: widthPixel(10), }} />)}
                renderItem={({ item, index }) => (
                    <View >

                        <TouchableOpacity
                            onPress={() => Description_changeLayout(index)}
                            style={{
                                alignItems: 'center', flexDirection: 'row', paddingVertical: pixelSizeHorizontal(10),
                                justifyContent: 'space-between',
                            }}>

                            <Text style={{
                                color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16,
                                justifyContent: 'center', marginRight: 10, flex: 1
                            }}
                                numberOfLines={2}>{item.name}</Text>

                            <FastImage
                                source={BackImg}
                                style={{ width: widthPixel(15), height: widthPixel(15), transform: [{ rotate: Description_expanded && questionIndex == index ? '90deg' : '270deg' }] }}
                                tintColor={warmGrey}
                                resizeMode='contain'
                            />

                        </TouchableOpacity>
                        {questionIndex == index &&

                            <View style={{
                                height: Description_expanded ? null : 0, overflow: 'hidden', marginTop: Description_expanded ? pixelSizeHorizontal(10) : 0
                            }}>
                                <Text style={{ fontSize: FontSize.FS_12, fontFamily: REGULAR, color: warmGrey }}>
                                    {item.description}
                                </Text>
                            </View>
                        }
                    </View>
                )}
            />
            </View>
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
})

export default HelpCenter