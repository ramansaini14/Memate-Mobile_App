import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DoubleTick = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#6ACD75"
            d="M.273 5.44 4 9.167l.94-.947L1.22 4.5M14.827.22 7.773 7.28 5 4.5l-.953.94 3.726 3.727 8-8m-3.773 0L11.06.22 6.827 4.453l.946.94L12 1.167Z"
        />
    </Svg>
)
export default DoubleTick
