import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TrueIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.5 22c5.5 0 10-4.5 10-10S18 2 12.5 2s-10 4.5-10 10 4.5 10 10 10Z"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m8.25 12 2.83 2.83 5.67-5.66"
        />
    </Svg>
)
export default TrueIcon
