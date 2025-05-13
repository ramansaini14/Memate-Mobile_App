import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PlayIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#6146C5"
            d="M8 0C3.57 0 0 3.57 0 8s3.57 8 8 8 8-3.57 8-8-3.57-8-8-8Zm3.551 8.37-5.327 3.123a.445.445 0 0 1-.214.058.445.445 0 0 1-.215-.058c-.136-.098-.215-.215-.215-.371V4.898h-.019c0-.157.098-.313.215-.371.117-.059.312-.098.448 0l5.327 3.102c.137.098.215.215.215.371a.435.435 0 0 1-.215.37Z"
        />
    </Svg>
)
export default PlayIcon
