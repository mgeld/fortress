import { TZone } from "@ctypes/model";
import { FC, useEffect } from "react";

import styles from './styles.module.scss'
import { AboutSectorItem } from "./about-sector-item";
import { IconFort, IconLocation, IconSector, IconTarget } from "./icons/_icons";
import { sectorMapModel } from "entities/sector";
import { getAboutSectorAPI } from "shared/api/get-about-sector";
import { latLngToCell } from "h3-js";
import { mapModel } from "entities/map";

type TAboutSectorProps = TZone

export const AboutSector: FC<TAboutSectorProps> = ({
    name,
    zone_id
}) => {

    const sector = sectorMapModel.selectors.useAboutSector().sector

    const { latlng } = mapModel.selectors.useMapClickLatLng()

    useEffect(() => {
        if (latlng) {
            const h3Index = latLngToCell(latlng[0], latlng[1], 9);
            getAboutSectorAPI(h3Index)
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
                    icon={<IconTarget width={18} height={18} />}
                    name="Область:"
                    text={`${sector.areal}`}
                />
                <AboutSectorItem
                    icon={<IconFort width={16} height={16} />}
                    name="Форт:"
                    text={`${sector.defenders} стражей`}
                />
                <AboutSectorItem
                    icon={<IconLocation width={16} height={16} />}
                    name="Владелец:"
                    text={`${sector.owner}`}
                />
            </div>
        </div>
    )
}