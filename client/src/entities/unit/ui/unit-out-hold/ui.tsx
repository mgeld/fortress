import { unitModel } from "entities/unit";
import { modules } from "entities/unit/lib/modules";
import { FC } from "react";
import { Alert } from "shared/ui/alert";
import { popoutModel } from "shared/ui/popout-root";

export const UnitOutHold: FC = () => {

    const unit = unitModel.selectors.useUnit()

    if (!unit) return <></>

    return (
        <Alert
            alert={modules[unit].name}
            message={`В трюме нет нужного предмета для использования. Перейти к покупке?`}
            action={{
                text: 'Подтвердить',
                _click: () => {
                    popoutModel.events.setPopout('select-unit')
                }
            }}
        />
    )
}