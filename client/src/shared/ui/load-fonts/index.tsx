import { FC } from "react"

type TLoadFontsProp = {
    fontFamily: string
}

const LoadFonts: FC<TLoadFontsProp> = ({
    fontFamily
}) => {
    return (
        <div style={{
            fontFamily: fontFamily,
            position: 'absolute',
            height: '0px'
        }}>.</div>
    )
}

export default LoadFonts