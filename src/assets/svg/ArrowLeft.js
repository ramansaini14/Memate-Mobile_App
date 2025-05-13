import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { G, Path } from 'react-native-svg';



const ArrowLeft = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={20}
            height={20}
            x="0"
            y="0"
            viewBox="0 0 24 24"
            style="enable-background:new 0 0 512 512"
            class=""
        >
            <G>
                <Path
                    d="M22 11H4.414l5.293-5.293a1 1 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L4.414 13H22a1 1 0 0 0 0-2z"
                    fill="#191c1f"
                    opacity="1"
                    data-original="#000000"
                    class="">
                </Path>
            </G>
        </Svg>
    )
}

export default ArrowLeft

const styles = StyleSheet.create({})