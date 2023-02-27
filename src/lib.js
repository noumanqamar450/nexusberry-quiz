export const getResult = (option, ans, image, ques) => {
    let selected = Object.values(option)[0]
    let answer = Object.values(ans)[0]
    let result = {
        question:ques,
        image,
        selected,
        answer,
    }
    return result;
}

export const getResultWithCSV = (data) => {
    let date = Date.now();
    const dataToConvert = {
        data: data,
        filename: `quiz_result_report_${date}`,
        delimiter: ',',
        headers: ['Question', "Images", "Your Selected Option", "Correct Option"]
    }
    return dataToConvert;
}
