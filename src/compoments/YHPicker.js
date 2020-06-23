import Picker from 'react-native-picker';

export function showDatePicker(format, callBack) {
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [];

    for (let i = 1; i < 201; i++) {
        years.push(i + 1900);
    }
    for (let i = 1; i < 13; i++) {
        months.push(i);
        hours.push(i);
    }
    for (let i = 1; i < 32; i++) {
        days.push(i);
    }
    for (let i = 1; i < 61; i++) {
        minutes.push(i);
    }
    let pickerData = [years, months, days, ['上午', '下午'], hours, minutes];
    let date = new Date();
    let selectedValue = [
        date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours() > 11 ? '下午' : '上午', date.getHours() === 12 ? 12 : date.getHours() % 12, date.getMinutes()
    ];

    Picker.init({
        pickerData: pickerData,
        selectedValue: selectedValue,
        pickerTitleText: '时间',
        pickerConfirmBtnText: '确定',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnColor: [255, 255, 255, 1],
        pickerTitleColor: [255, 255, 255, 1],
        pickerCancelBtnColor: [255, 255, 255, 1],
        pickerBg: [232, 232, 232, 1],
        pickerToolBarBg: [85, 85, 85, 1],
        onPickerConfirm: data => {
            if (format === 'y-m-d-h-s') {
                if (data[3] === '上午') {
                    callBack(data[0] + '-' + data[1] + '-' + data[2] + ' ' + data[4] + ':' + data[5])
                } else {
                    callBack(data[0] + '-' + data[1] + '-' + data[2] + ' ' + (parseInt(data[4]) + 12) + ':' + data[5])
                }
            }
        },
        onPickerSelect: pickedValue => {
            let targetValue = [...pickedValue];
            if (parseInt(targetValue[1]) === 2) {
                if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
                    targetValue[2] = 29;
                }
                else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
                    targetValue[2] = 28;
                }
            }
            else if (targetValue[1] in {4: 1, 6: 1, 9: 1, 11: 1} && targetValue[2] > 30) {
                targetValue[2] = 30;

            }
            // forbidden some value such as some 2.29, 4.31, 6.31...
            if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
                // android will return String all the time，but we put Number into picker at first
                // so we need to convert them to Number again
                targetValue.map((v, k) => {
                    if (k !== 3) {
                        targetValue[k] = parseInt(v);
                    }
                });
                Picker.select(targetValue);
                pickedValue = targetValue;
            }
        }
    });
    Picker.show();
}

export function showArray(data, callBack, selected) {

    Picker.init({
        pickerData: data,
        selectedValue: selected,
        pickerTitleText: '',
        pickerConfirmBtnText: '确定',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnColor: [62, 170, 249, 1],
        pickerCancelBtnColor: [36, 36, 36, 1],
        pickerBg: [232, 232, 232, 1],
        onPickerConfirm: data => {
            callBack(data);
        },
    });
    Picker.show();
}

export function hiddenPick() {
    Picker.hide();
}
