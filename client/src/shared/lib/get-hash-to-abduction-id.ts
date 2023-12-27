export const getHashToAbductionId = (): number | null => {

    // Разбираем параметры после хэш
    let href = window.location.href;

    if (~href.lastIndexOf('#a')) {

        let index_sector = href.lastIndexOf('#a');
        let zone_id = href.slice(index_sector + 2);

        return +zone_id

    }

    return null

}