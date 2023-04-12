import { FC } from "react"

import './ProgressCounter.scss'

type TProgressCounter = {
    width: number
    progress: number
    progress_color: string
}

const ProgressCounter: FC<TProgressCounter> = ({
    width,
    progress,
    progress_color
}) => {
    return (
        <div
            className='progressCounter'
            style={{ width: `${width}px` }}
        >
            <div
                className='__progressBar'
                style={{
                    width: `${progress}%`,
                    backgroundColor: progress_color
                }}
            />
            <div className='__counter'></div>

            <div className='__whiteEffect'><div /></div>
        </div>
    )
}

export default ProgressCounter