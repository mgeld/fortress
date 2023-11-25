import { FC, useEffect } from "react";

import styles from './styles.module.scss'
import { AboutSectorItem } from "./about-sector-item";
import { IconFort, IconLocation, IconTarget } from "./icons/_icons";
import { latLngToCell } from "h3-js";
import { mapModel } from "entities/map";
import { aboutSectorModel } from ".";
import { sectorMapModel } from "entities/sector";

// type TAboutSectorProps = TZone

export const AboutSector: FC = () => {

    const sector = sectorMapModel.selectors.useAboutSector().sector

    const { latlng } = mapModel.selectors.useMapClickLatLng()

    useEffect(() => {
        if (latlng) {
            const h3Index = latLngToCell(latlng[0], latlng[1], 9);
            aboutSectorModel.events.getAboutInfo(h3Index)
        }
    }, [latlng])

    if (!sector) return (
        <div className={styles.loading}>
            Загружаем информацию...
        </div>
    )

    return (
        <div className={styles.aboutSector}>
            <div className={[styles.__container, styles.__one].join(' ')}>
                {/* <AboutSectorItem
                    icon={<IconSector width={16} height={16} />}
                    name="Ячейка:"
                    text={sector.number > 0 ? `${sector.number}` : 'Новый'}
                /> */}
                <AboutSectorItem
                    icon={<IconLocation width={16} height={16} />}
                    name="Владелец:"
                    text={`${sector.owner}`}
                />
                <AboutSectorItem
                    icon={<IconFort width={16} height={16} />}
                    name="Форт:"
                    text={`${sector.defenders} стражей`}
                />
                <AboutSectorItem
                    icon={<IconTarget width={18} height={18} />}
                    name="Точка:"
                    text={`${sector.latlng[0].toFixed(4)}, ${sector.latlng[0].toFixed(4)}`}
                />
            </div>
        </div>
    )
}