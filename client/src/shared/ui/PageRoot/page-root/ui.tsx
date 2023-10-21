import { FC, ReactNode, createContext } from "react";

interface PageRootProps {
    children: ReactNode
    activePage: string
}

const DEFAULT_VALUE = 'map'

export const PageRootContext = createContext<string>(DEFAULT_VALUE);

export const PageRoot: FC<PageRootProps> = ({
    children,
    activePage
}) => {
    return (
        <PageRootContext.Provider
            value={activePage}
        >
            <div className="pageRoot">
                {children}
            </div>
        </PageRootContext.Provider>
    )
}