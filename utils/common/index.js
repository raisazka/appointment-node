const degreeDivider = 32
const fahrenheitDivider = 5/9

export const add = (num1, num2) => {
    return num1 + num2
}

export const celciusToF = (celcius) => {
    return (celcius * 1.8) + degreeDivider
}

export const FToCelcius = (fahrenheit) => {
    return Math.round((fahrenheit - degreeDivider) * fahrenheitDivider)
}

export const multiply = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 < 0 || num2 < 0) {
            reject("Number must be more than 0")
        }

        resolve(num1 * num2)
    })
}