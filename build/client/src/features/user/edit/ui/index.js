"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const notice_1 = require("shared/ui/notice");
const zone_1 = require("entities/zone");
const user_1 = require("entities/user");
const getFormData_1 = require("../lib/getFormData");
const _icons_1 = require("shared/assets/icons/_icons");
const popout_root_1 = require("shared/ui/popout-root");
const colors_1 = require("../lib/colors");
const edit_zone_1 = require("shared/api/edit-zone");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ZoneEdit = () => {
    const { userIcon, userName, } = user_1.userModel.selectors.useUser();
    let _color = zone_1.zoneModel.selectors.useZoneColor();
    let _description = zone_1.zoneModel.selectors.useZoneDescription();
    const [zoneName, setZoneName] = (0, react_1.useState)({ val: userName, edit: 0 });
    const [description, setDescription] = (0, react_1.useState)({ val: _description || '', edit: 0 });
    const [zoneColor, setZoneColor] = (0, react_1.useState)(_color);
    const [userImage, setUserImage] = (0, react_1.useState)({
        img: userIcon,
        hash: '',
        load: 0
    });
    const onDescription = (e) => {
        let { value } = e.currentTarget;
        let v = value + '.';
        if (v.slice(-3, -1) === "  ") {
            value = value.slice(0, -1);
        }
        setDescription({ val: value.slice(0, 101), edit: 1 });
    };
    const onName = (e) => {
        let { value } = e.currentTarget;
        let v = value + '.';
        if (v.slice(-3, -1) === "  ") {
            value = value.slice(0, -1);
        }
        setZoneName({ val: value.slice(0, 13), edit: 1 });
    };
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0)
            return;
        let img_file = e.target.files[0];
        let size_file = img_file.size / 1024 / 1024;
        if (size_file > 15) {
            notice_1.noticeModel.events.newToast({
                name: 'Большой файл',
                text: 'Размер файла слишком большой!',
                t: 'warning'
            });
        }
        else {
            if (img_file) {
                setUserImage({
                    img: '',
                    hash: '',
                    load: 1
                });
                uploadImage(img_file);
            }
        }
    };
    const uploadImage = (file) => {
        const vkey = window.btoa(window.location.search);
        const data_type = window.btoa('uploadImage');
        const api_send_object = {
            data_type,
            file,
            payload: {},
            vkey
        };
        fetch('https://app2023.ru/php-fortress/api/upload-form.php', {
            method: 'POST',
            body: (0, getFormData_1.getFormData)(api_send_object)
        })
            .then(response => {
            return response.json();
        })
            .then(result => {
            if (result.res === "ok") {
                setUserImage({
                    img: result.data.filename,
                    hash: result.data.hash,
                    load: 0
                });
            }
            else {
                setUserImage({
                    img: userIcon,
                    hash: '',
                    load: 0
                });
                if (result.data.code === 2) {
                    notice_1.noticeModel.events.newToast({
                        name: 'Превышение размера',
                        text: 'Размер фото не должен превышать 15МБ!',
                        t: 'warning'
                    });
                }
                else if (result.data.code === 3) {
                    notice_1.noticeModel.events.newToast({
                        name: 'Некачественное фото',
                        text: 'Минимальный размер фото  — 10 кБ!',
                        t: 'warning'
                    });
                }
                else if (result.data.code === 5) {
                    notice_1.noticeModel.events.newToast({
                        name: 'Ошибочка!',
                        text: 'Неверный тип фото!',
                        t: 'warning'
                    });
                }
                else {
                    notice_1.noticeModel.events.newToast({
                        name: 'Ошибочка!',
                        text: 'Не удалось загрузить изображение!',
                        t: 'warning'
                    });
                }
            }
        }).catch(e => {
            setUserImage({
                img: userIcon,
                hash: '',
                load: 0
            });
        });
    };
    const editZone = () => {
        if (userImage.img === '' || zoneName.val === '') {
            notice_1.noticeModel.events.newToast({
                name: 'Ошибочка!',
                text: 'Необходимо заполнить все обязательные поля!',
                t: 'warning'
            });
        }
        else {
            (0, edit_zone_1.editZoneAPI)(userImage.img, zoneName.val, description.val, zoneColor, userImage.hash);
        }
    };
    return (<div className={styles_module_scss_1.default.zoneConfig}>

            <div className={styles_module_scss_1.default.__header}>
                <div className={styles_module_scss_1.default.__border}>
                    <div className={styles_module_scss_1.default.name}>
                        Редактор зоны
                    </div>
                    <div onClick={() => popout_root_1.popoutModel.events.setPopout(null)} className={styles_module_scss_1.default.close}>
                        <_icons_1.IconClose width={16} height={16} fill="#867aa0"/>
                    </div>
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.form}>

                    <div className={styles_module_scss_1.default.formImage}>
                        <div className={styles_module_scss_1.default.iconLayout}>

                            <div className={styles_module_scss_1.default.icon}>
                                {userImage.load === 1 ?
            <div className={styles_module_scss_1.default.loader}>
                                        <_icons_1.IconLoad />
                                    </div> :
            <img src={userImage.img} className="cc_image" alt='<>'/>}
                                <input type='file' onChange={(e) => onSelectFile(e)} accept=".jpg, .jpeg, .png"/>
                            </div>

                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.formLayout}>

                        <div className={styles_module_scss_1.default.inputZoneName}>
                            <div className={styles_module_scss_1.default.top}>
                                Название зоны
                            </div>
                            <input type="text" name="name_state" value={zoneName.val} onChange={onName}/>
                            <div className={styles_module_scss_1.default.bottom}>
                                <NameBottom {...zoneName}/>
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.inputZoneDescription}>
                            <div className={styles_module_scss_1.default.top}>
                                Информация о зоне
                            </div>
                            <textarea rows={4} value={description.val} name="description" onChange={onDescription} placeholder="Введите короткое описание вашей зоны"/>
                            <div className={styles_module_scss_1.default.bottom}>
                                <DescriptionBottom {...description}/>
                            </div>
                        </div>

                    </div>

                    <div className={styles_module_scss_1.default.colorsLayout}>

                        <div className={styles_module_scss_1.default.header}>
                            Цвет территории
                        </div>

                        <div className={styles_module_scss_1.default.list}>
                            <div className={styles_module_scss_1.default.__content}>
                                {colors_1.zoneColors.map((item, i) => {
            return (<div key={'c' + i}>
                                            <div onClick={() => setZoneColor(item.id)} className={`${styles_module_scss_1.default.color} ${zoneColor === item.id ? styles_module_scss_1.default.checked : ''}`}>
                                                <div style={{
                    backgroundColor: item.color
                }}/>
                                            </div>
                                        </div>);
        })}
                            </div>
                        </div>

                    </div>

                    <div className={styles_module_scss_1.default.buttonLayout}>
                        <div onClick={editZone} className={styles_module_scss_1.default.button}>
                            <div className={styles_module_scss_1.default.text}>
                                Сохранить
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>);
};
exports.default = ZoneEdit;
const NameBottom = (text) => {
    if (text.edit === 0)
        return <span>&nbsp;</span>;
    if (text.val.length === 0)
        return <span className={styles_module_scss_1.default.error}>Пожалуйста, введите название!</span>;
    if (text.val.trim().length < 3)
        return <span className={styles_module_scss_1.default.error}>Минимальная длина 3 символа!</span>;
    if (text.val.trim().length > 12)
        return <span className={styles_module_scss_1.default.error}>Максимальная длина 12 символов!</span>;
    return <span className={styles_module_scss_1.default.success}>Все верно!</span>;
};
const DescriptionBottom = (text) => {
    if (text.edit === 0)
        return <span>&nbsp;</span>;
    if (text.val.length > 0 && text.val.length < 3)
        return <span className={styles_module_scss_1.default.error}>Минимальная длина 3 символа!</span>;
    if (text.val.length > 100)
        return <span className={styles_module_scss_1.default.error}>Максимальная длина 100 символов!</span>;
    return <span className={styles_module_scss_1.default.success}>Все верно!</span>;
};
