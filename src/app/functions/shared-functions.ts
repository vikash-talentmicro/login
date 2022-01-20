export function jsonParse(str: any) {
    try {
        if (typeof str == 'string')
            return JSON.parse(str);
        else
            return str;
    } catch (e) {

        if (typeof str == 'object')
            return str;
        else
            return str;
    }
}