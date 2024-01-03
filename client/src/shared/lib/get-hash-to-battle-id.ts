export const getHashToBattleId = (): string | null => {

    // Разбираем параметры после хэш
    let href = window.location.href;

    if (~href.lastIndexOf('#b')) {

        let index_sector = href.lastIndexOf('#b');
        let zone_id = href.slice(index_sector + 2);

        return zone_id

    }

    return null

}