import { FC, ReactNode } from 'react'
import { _classNames } from 'shared/lib/classnames'
import { getPlatform } from 'shared/lib/get-platform'
import { goLink } from 'shared/lib/go-link'

type TLinkProps = {
    link: string
    disabled?: boolean
    className?: string
    children: ReactNode
}

let platform = getPlatform()

const Link: FC<TLinkProps> = ({ link, children, className, disabled = false }) => {

    if (disabled)
        return (
            <div className={className}>
                {children}
            </div>
        )
    else if (platform === 'mobile_iphone')
        return (
            <a
                className={_classNames(['linkPlatform', className])}
                href={link}
                target='_blank'
                rel="noreferrer"
            >
                {children}
            </a>
        )
    else {
        return (
            <div
                className={className}
                onClick={(e) => goLink(link)}
            >
                {children}
            </div>
        )
    }


}

export default Link