import React, { useState, FC } from 'react';

import { noticeModel } from 'shared/ui/notice';
import { zoneModel } from 'entities/zone';
import { userModel } from 'entities/user';
import { getFormData } from '../lib/getFormData';
import { IconClose, IconLoad } from 'shared/assets/icons/_icons';
import { popoutModel } from 'shared/ui/popout-root';
import { zoneColors } from '../lib/colors';

import { editZoneAPI } from 'shared/api/edit-zone';

import styles from './styles.module.scss'
import { TZoneColor } from '@ctypes/model';

const ZoneEdit = () => {

    const {
        userIcon,
        userName,
    } = userModel.selectors.useUser()

    let _color = zoneModel.selectors.useZoneColor()
    let _description = zoneModel.selectors.useZoneDescription()

    const [zoneName, setZoneName] = useState({ val: userName, edit: 0 });
    const [description, setDescription] = useState({ val: _description || '', edit: 0 });
    const [zoneColor, setZoneColor] = useState<TZoneColor>(_color);

    const [userImage, setUserImage] = useState({
        img: userIcon,
        hash: '',
        load: 0
    });

    const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let { value } = e.currentTarget;
        let v = value + '.';
        if (v.slice(-3, -1) === "  ") {
            value = value.slice(0, -1);
        }
        setDescription({ val: value.slice(0, 101), edit: 1 });
    }

    const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.currentTarget;
        let v = value + '.';

        if (v.slice(-3, -1) === "  ") {
            value = value.slice(0, -1);
        }
        setZoneName({ val: value.slice(0, 13), edit: 1 });
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        let img_file: File = e.target.files[0]
        let size_file = img_file.size / 1024 / 1024;

        if (size_file > 15) {
            noticeModel.events.newToast({
                name: 'Большой файл',
                text: 'Размер файла слишком большой!',
                t: 'warning'
            })
        } else {
            if (img_file) {
                setUserImage({
                    img: '',
                    hash: '',
                    load: 1
                });
                uploadImage(img_file);
            }
        }
    }


    const uploadImage = (file: File) => {

        const vkey = window.btoa(window.location.search);
        const data_type = window.btoa('uploadImage');

        const api_send_object = {
            data_type,
            file,
            payload: {},
            vkey
        }

        fetch('https://app2023.ru/php-fortress/api/upload-form.php', {
            method: 'POST',
            body: getFormData(api_send_object)
        })
            .then(response => {
                
                console.log('response', response)
                return response.json()
            })
            .then(result => {

                console.log('result', result)

                if (result.res === "ok") {

                    setUserImage({
                        img: result.data.filename,
                        hash: result.data.hash,
                        load: 0
                    });

                } else {

                    setUserImage({
                        img: userIcon,
                        hash: '',
                        load: 0
                    });

                    if (result.data.code === 2) {
                        noticeModel.events.newToast({
                            name: 'Превышение размера',
                            text: 'Размер фото не должен превышать 15МБ!',
                            t: 'warning'
                        })
                    } else if (result.data.code === 3) {
                        noticeModel.events.newToast({
                            name: 'Некачественное фото',
                            text: 'Минимальный размер фото  — 10 кБ!',
                            t: 'warning'
                        })
                    } else if (result.data.code === 5) {
                        noticeModel.events.newToast({
                            name: 'Ошибочка!',
                            text: 'Неверный тип фото!',
                            t: 'warning'
                        })
                    } else {
                        noticeModel.events.newToast({
                            name: 'Ошибочка!',
                            text: 'Не удалось загрузить изображение!',
                            t: 'warning'
                        })
                    }
                }

            }).catch(e => {
                setUserImage({
                    img: userIcon,
                    hash: '',
                    load: 0
                });
            });

    }


    const editZone = () => {

        if (userImage.img === '' || zoneName.val === '') {

            noticeModel.events.newToast({
                name: 'Ошибочка!',
                text: 'Необходимо заполнить все обязательные поля!',
                t: 'warning'
            })
        } else {

            editZoneAPI(
                userImage.img,
                zoneName.val,
                description.val,
                zoneColor,
                userImage.hash
            )

        }

    }

    return (
        <div className={styles.zoneConfig}>

            <div className={styles.__header}>
                <div className={styles.__border}>
                    <div className={styles.name}>
                        Редактор зоны
                    </div>
                    <div
                        onClick={() => popoutModel.events.setPopout(null)}
                        className={styles.close}
                    >
                        <IconClose width={16} height={16} fill="#867aa0" />
                    </div>
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.form}>

                    <div className={styles.formImage}>
                        <div className={styles.iconLayout}>

                            <div className={styles.icon}>
                                {userImage.load === 1 ?
                                    <div className={styles.loader}>
                                        <IconLoad />
                                    </div> :
                                    <img
                                        src={userImage.img}
                                        className="cc_image"
                                        alt='<>'
                                    />
                                }
                                <input
                                    type='file'
                                    onChange={(e) => onSelectFile(e)}
                                    // accept={"image/png,image/jpeg"}
                                    accept=".jpg, .jpeg, .png"
                                />
                            </div>

                        </div>
                    </div>

                    <div className={styles.formLayout}>

                        <div className={styles.inputZoneName}>
                            <div className={styles.top}>
                                Название зоны
                            </div>
                            <input
                                type="text"
                                name="name_state"
                                value={zoneName.val}
                                onChange={onName}
                            />
                            <div className={styles.bottom}>
                                <NameBottom {...zoneName} />
                            </div>
                        </div>

                        <div className={styles.inputZoneDescription}>
                            <div className={styles.top}>
                                Информация о зоне
                            </div>
                            <textarea
                                rows={4}
                                value={description.val}
                                name="description"
                                onChange={onDescription}
                                placeholder="Введите короткое описание вашей зоны"
                            />
                            <div className={styles.bottom}>
                                <DescriptionBottom {...description} />
                            </div>
                        </div>

                    </div>

                    <div className={styles.colorsLayout}>

                        <div className={styles.header}>
                            Цвет территории
                        </div>

                        <div className={styles.list}>
                            <div className={styles.__content}>
                                {zoneColors.map((item, i) => {
                                    return (
                                        <div key={'c' + i}>
                                            <div
                                                onClick={() => setZoneColor(item.id)}
                                                className={`${styles.color} ${zoneColor === item.id ? styles.checked : ''}`}
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: item.color
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <div className={styles.buttonLayout}>
                        <div
                            onClick={editZone}
                            className={styles.button}
                        >
                            <div
                                className={styles.text}
                            >
                                Сохранить
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default ZoneEdit;


/****/

type TText = {
    val: string
    edit: number
}


const NameBottom: FC<TText> = (text) => {
    if (text.edit === 0) return <span>&nbsp;</span>
    if (text.val.length === 0) return <span className={styles.error}>Пожалуйста, введите название!</span>
    if (text.val.trim().length < 3) return <span className={styles.error}>Минимальная длина 3 символа!</span>
    if (text.val.trim().length > 12) return <span className={styles.error}>Максимальная длина 12 символов!</span>
    return <span className={styles.success}>Все верно!</span>
}

const DescriptionBottom: FC<TText> = (text) => {
    if (text.edit === 0) return <span>&nbsp;</span>
    if (text.val.length > 0 && text.val.length < 3) return <span className={styles.error}>Минимальная длина 3 символа!</span>
    if (text.val.length > 100) return <span className={styles.error}>Максимальная длина 100 символов!</span>
    return <span className={styles.success}>Все верно!</span>
}

