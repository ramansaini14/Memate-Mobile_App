import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SickLeaveIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M11.166 2.667v4M21.834 2.667v4M21.833 4.667c4.44.24 6.667 1.933 6.667 8.2v8.24c0 5.493-1.333 8.24-8 8.24h-8c-6.667 0-8-2.747-8-8.24v-8.24c0-6.267 2.227-7.947 6.667-8.2h10.666ZM28.167 23.467H4.833"
        />
        <Path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M19 14.44h-5M16.5 12v5"
        />
    </Svg>
)
export default SickLeaveIcon
