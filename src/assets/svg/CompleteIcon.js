import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CompleteIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#6ACD75"
            d="M8 0C3.606 0 0 3.606 0 8s3.606 8 8 8 8-3.606 8-8-3.606-8-8-8Zm-.968 11.639L3.529 8.136 4.854 6.81l2.24 2.239 4.494-4.086L12.85 6.35l-5.818 5.289Z"
        />
    </Svg>
)
export default CompleteIcon
