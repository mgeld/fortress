
import { FC } from 'react'

interface CanvasProps {
    width?: number
    height?: number
}
const Canvas: FC<CanvasProps> = ({ width, height }) => {

    return (
        <canvas
            id='draw'
            width={width || 600}
            height={height || 340}
            style={{ width: '0px', height: '0px', position: 'absolute'}}
            // style={{ width: '100%', zIndex: 2000}}
        />
    )
}
export default Canvas