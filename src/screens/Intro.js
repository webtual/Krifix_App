import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, Pressable, Animated } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { black, disableColor, greenPrimary, offWhite, white } from '../constants/Color';
import { FontSize, SEMIBOLD } from '../constants/Fonts';
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen';
import FastImage from 'react-native-fast-image';
import { Intro1, Intro2, Intro3 } from '../constants/Images';
import { SCREEN_WIDTH } from '../constants/ConstantKey';
import Translate from '../translation/Translate';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { resetScreen } from '../navigations/RootNavigation';

const Intro = () => {

    const scrollRef = useRef(null);

    const [index, setIndex] = useState(0);

    const SliderData = [
        {
            title: 'Find QR in bag',
            image: Intro1
        },
        {
            title: 'Scan a QR code',
            image: Intro2
        },
        {
            title: 'Earn exciting loyalty points',
            image: Intro3
        },
    ]


    const scrollX = React.useRef(new Animated.Value(0)).current;
    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setIndex(viewableItems[0].index);
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };


    // Action Methods
    const btnNextTap = () => {
        if (index == SliderData.length - 1) {
            resetScreen("Login");
        } else {
            scrollRef.current.scrollToIndex({ animated: true, index: index + 1 });
            setIndex(index + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>

                <FlatList
                    ref={scrollRef}
                    data={SliderData}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        }
                    )}
                    initialScrollIndex={index}
                    onViewableItemsChanged={_onViewableItemsChanged}
                    viewabilityConfig={_viewabilityConfig}
                    decelerationRate={'normal'}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => (
                        <View style={styles.itemView}>

                            <FastImage source={item.image} style={styles.imgStyle} resizeMode='contain' />
                            <Text style={styles.textStyle}>{item.title}</Text>
                        </View>
                    )}
                />


                <View style={{}}>
                    <ExpandingDot
                        data={SliderData}
                        expandingDotWidth={widthPixel(30)}
                        scrollX={scrollX}
                        // inActiveDotOpacity={0.3}
                        inActiveDotColor={disableColor}
                        activeDotColor={greenPrimary}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 5
                        }}
                        containerStyle={{
                        }}
                    />
                </View>


                <Pressable
                    onPress={() => btnNextTap()}
                    style={styles.btnStyle}>
                    <Text style={styles.btnText}>{index == SliderData.length - 1 ? Translate.t("done") : Translate.t("next")}</Text>

                </Pressable>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite
    },
    itemView: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontFamily: SEMIBOLD,
        color: black,
        fontSize: FontSize.FS_18,
        marginHorizontal: pixelSizeHorizontal(20),
        marginTop: pixelSizeHorizontal(50)
    },
    imgStyle: {
        width: SCREEN_WIDTH - 70,
        height: SCREEN_WIDTH - 70,
    },
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        borderRadius: widthPixel(8),
        marginHorizontal: pixelSizeHorizontal(40),
        marginVertical: pixelSizeHorizontal(70),
    },
    btnText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_22,
        textTransform: 'uppercase',
    }
});


export default Intro