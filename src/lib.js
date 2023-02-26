export const getResult = (option, ans, image) => {
    let selected = Object.values(option)[0]
    let answer = Object.values(ans)[0]
    let result = {
        image,
        selected,
        answer,
    }
    return result;
}

