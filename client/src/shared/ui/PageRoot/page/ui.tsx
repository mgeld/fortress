import { FC, ReactNode, useContext } from "react";

import styles from './styles.module.scss'

import { PageRootContext } from "../page-root/ui";

type PageProps = {
    id: string
    // fill: string
    children: ReactNode
}
export const Page: FC<PageProps> = ({
    id,
    // fill,
    children
}) => {

    const activePage = useContext(PageRootContext)

    if (activePage !== id) return null

    return (
        <div
            // style={{ backgroundColor: fill }}
            className={styles.page}
        >
            {children}
        </div>
    )
}