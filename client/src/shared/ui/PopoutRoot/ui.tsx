import { FC, ReactNode, createContext } from "react";

interface PopoutRootProps {
    children: ReactNode
    activePopout: string | null
}

const DEFAULT_VALUE = null

export const PopoutRootContext = createContext<string | null>(DEFAULT_VALUE);

export const PopoutRoot: FC<PopoutRootProps> = ({
    children,
    activePopout
}) => {
    return (
        <PopoutRootContext.Provider
            value={activePopout}
        >
            <div className="popoutRoot">
                {children}
            </div>
        </PopoutRootContext.Provider>
    )
}