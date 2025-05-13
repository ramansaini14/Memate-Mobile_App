import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SingleTick = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#75808A"
            d="m12 1.167-8 8L.333 5.5l.94-.94L4 7.28 11.06.227l.94.94Z"
        />
    </Svg>
)
export default SingleTick
