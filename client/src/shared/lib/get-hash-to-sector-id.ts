export const getHashToSectorId = () => {

    // Разбираем параметры после хэш
    let href = window.location.href;

    if (~href.lastIndexOf('#s')) {

        let index_sector = href.lastIndexOf('#s');

        let sector_id = href.slice(index_sector + 2);

        return sector_id

    }

    return null

}