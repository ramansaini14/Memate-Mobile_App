import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const AddedDateDeleteIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={39} height={39} x={0.5} y={0.5} stroke="#E9EBEE" rx={19.5} />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M29 13.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3l-2.04.2M16.5 12.97l.22-1.31c.16-.95.28-1.66 1.97-1.66h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M26.85 17.14l-.65 10.07C26.09 28.78 26 30 23.21 30h-6.42c-2.79 0-2.88-1.22-2.99-2.79l-.65-10.07M18.33 24.5h3.33M17.5 20.5h5"
        />
    </Svg>
)
export default AddedDateDeleteIcon
