export class Utils {
    static randomRoll() {
        return Math.floor(Math.random() * (10 - 1 + 1) + 1);
    }

    static convertToString(arr: Array<any>, newLine?: boolean) {
        if(arr?.length > 0) {
            return arr.toString().replace(new RegExp(',', 'g'), newLine? '\n': ' ')
        }
        return '';
    }

    static convertToStringArray(arr:Array<any>, item: any){
        let group: Array<any> = [];
        arr.forEach(value => {
            group.push(value[item]);
        });
        return group;
    }

    static isHighOrLow(number:Number, option:'h'|'l'){
        switch(option) {
            case 'h':
                return number > 5;
            case 'l':
                return number < 6;
        }
    }
}