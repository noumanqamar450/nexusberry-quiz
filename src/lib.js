export const getResult = (option, ans, image, ques) => {
    let opt = Object.values(option)[0]
    let an = Object.values(ans)[0]
    let boolean;
    boolean = opt === an ? true : false;

    let result = {
        question:ques,
        image,
        selected: option,
        answer: ans,
        boolean
    }
    return result;
}

export const getResultWithCSV = (data) => {
    let newData = [...data];
    newData = newData.map((r) => {
        return {
            question: r.question,
            image: r.image,
            selected: Object.values(r.selected)[0],
            answer: Object.values(r.answer)[0],
            boolean:r.boolean
        }
    })
    let date = Date.now();
    const dataToConvert = {
        data: newData,
        filename: `quiz_result_report_${date}`,
        delimiter: ',',
        headers: ['Question', "Images", "Your Selected Option", "Correct Option", "Status"]
    }
    return dataToConvert;
}
