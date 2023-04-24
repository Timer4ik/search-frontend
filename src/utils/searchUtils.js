
export const Type = {
    NICKNAME: { name: "NICKNAME", ru: "имя пользователя" },
    SURNAME_AND_NAME: { name: "SURNAME_AND_NAME", ru: "фамилия и имя" },
    PHONE: { name: "PHONE", ru: "номер телефона" },
    EMAIL: { name: "EMAIL", ru: "электронная почта" },
    IP: { name: "IP", ru: "IP" },
}

export function checkIsPhone(value) {
    // "888402fh".match(/[a-zA-Z]/g)
    const isHaveLetters = value.match(/[a-zA-Z]/g)

    if (isHaveLetters) return

    const numbers = value.match(/[0-9]/g);

    if (!numbers || numbers.length < 10) return

    const hasPlus = value[0] == "+"
    const country = numbers.slice(0, numbers.length - 10).join("")
    const numWithoutCountry = numbers.slice(numbers.length - 10, numbers.length)

    if (numWithoutCountry.length !== 10) return

    let phone = hasPlus ? `+${country}${numWithoutCountry.join("")}` : numbers.join("")

    return {
        type: Type.PHONE,
        initialValue: value,
        handledValue: phone
    }
}

export function checkIsEmail(value) {
    const regx = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

    let isEmail = regx.test(value)

    if (!isEmail) return

    return {
        type: Type.EMAIL,
        initialValue: value,
        handledValue: value
    }
}

export function checkIsSurnameAndName(value) {
    const stringWords = value.trim().split(" ")

    if (stringWords.length !== 2) return

    const normalizeString = stringWords.join(" ")

    return {
        type: Type.SURNAME_AND_NAME,
        initialValue: value,
        handledValue: normalizeString
    }
}

export function checkIsNickName(value) {
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
        handledValue: normalizeName[0] !== "@" ?
            normalizeName : normalizeName.slice(1, normalizeName.length)
    }
}

export function checkIsIp(value) {
    let regx = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/

    let isValidIp = regx.test(value)

    if (!isValidIp) return

    return {
        type: Type.IP,
        initialValue: value,
        handledValue: value
    }
}

export const getCheckResult = (value) => {

    let isNickName = checkIsNickName(value);
    let isEmail = checkIsEmail(value);
    let isPhone = checkIsPhone(value);
    let isSurnameAndName = checkIsSurnameAndName(value);
    let isIp = checkIsIp(value);

    return isIp || isPhone || isNickName || isEmail || isSurnameAndName;
};
