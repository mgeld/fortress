import { FC, ReactNode, useContext } from "react";

import styles from './styles.module.scss'

import { PageRootContext } from "../page-root/ui";

type PageProps = {
    id: string
    children: ReactNode
}
export const Page: FC<PageProps> = ({
    id,
    children
}) => {

    const activePage = useContext(PageRootContext)

    if (activePage !== id) return null

    return (
        <div
            className={styles.page}
        >
            {children}
        </div>
    )
}