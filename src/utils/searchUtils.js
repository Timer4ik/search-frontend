
const Type = {
    NICKNAME: "NICKNAME",
    SURNAME_AND_NAME: "SURNAME_AND_NAME",
    PHONE: "phone",
    EMAIL: "EMAIL",
    IP: "IP"
}

const Checks = {

    checkIsPhone(value) {
        // "888402fh".match(/[a-zA-Z]/g)
        const isHaveLetters = value.match(/[a-zA-Z]/g)

        if (isHaveLetters) return

        const numbers = value.match(/[0-9]/g);

        if (numbers.length !== 11 && numbers.length !== 10) return

        let phone = numbers.join("")

        return {
            type: Type.PHONE,
            initialValue: value,
            handledValue: phone.length === 11 ? phone.slice(1, 11) : phone
        }
    },

    checkIsEmail(value) {

        const regx = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

        let isEmail = regx.test(value)

        if (!isEmail) return

        return {
            type: Type.EMAIL,
            initialValue: value,
            handledValue: value
        }
    },

    checkIsSurnameAndName(value) {
        const stringWords = value.trim().split(" ")

        if (stringWords.length !== 2) return

        const normalizeString = stringWords.join(" ")

        return {
            type: Type.SURNAME_AND_NAME,
            initialValue: value,
            handledValue: normalizeString
        }
    },

    checkIsNickName(value) {

        const stringWords = value.trim().split(" ")

        if (stringWords.length !== 1) return

        const normalizeName = stringWords[0]

        const specSymbols = normalizeName.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g)

        if (specSymbols) {
            let specSymbolsString = specSymbols.join("")
            if (specSymbolsString.length > 1) return

            if (specSymbolsString.length === 1 && normalizeName[0] !== "@") return
        }

        return {
            type: Type.NICKNAME,
            initialValue: value,
            handledValue: normalizeName
        }
    },

    checkIsIp(value) {

        let regx = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/

        let isValidIp = regx.test(value.trim())

        if (!isValidIp) return

        return {
            type: Type.IP,
            initialValue: value.trim(),
            handledValue: value.trim()
        }
    }
}

export const getCheckResult = (value) => {

    let isNickName = Checks.checkIsNickName(value);
    let isEmail = Checks.checkIsEmail(value);
    let isPhone = Checks.checkIsPhone(value);
    let isSurnameAndName = Checks.checkIsSurnameAndName(value);
    let isIp = Checks.checkIsIp(value);

    return isPhone || isNickName || isEmail || isSurnameAndName || isIp;
};
