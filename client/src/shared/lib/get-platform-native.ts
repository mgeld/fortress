
var userDeviceArray = [
    {device: 'android', platform: /Android/},
    {device: 'iphone', platform: /iPhone/},
    // {device: 'iPad', platform: /iPad/},
    // {device: 'Symbian', platform: /Symbian/},
    // {device: 'Windows Phone', platform: /Windows Phone/},
    // {device: 'Tablet OS', platform: /Tablet OS/},
    // {device: 'Linux', platform: /Linux/},
    // {device: 'Windows', platform: /Windows NT/},
    // {device: 'Macintosh', platform: /Macintosh/}
];

var platform = navigator.userAgent;

export const getPlatformNative = () => {
    for (var i in userDeviceArray) {
        if (userDeviceArray[i].platform.test(platform)) {
            return userDeviceArray[i].device;
        }
    }
}