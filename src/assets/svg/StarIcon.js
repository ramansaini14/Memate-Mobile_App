import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const StarIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#191C1F"
                d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Zm5.02 7.093-2.492 2.35.76 2.728c.154.55-.116.76-.61.466L8 11.021l-2.68 1.61c-.492.296-.78.086-.64-.472l.735-2.965-2.414-2.13c-.43-.38-.313-.686.26-.686h2.933l1.394-3.243c.227-.526.59-.526.81.004L9.76 6.379h2.972c.576.003.704.323.289.714Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default StarIcon
