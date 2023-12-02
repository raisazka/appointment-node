import { FToCelcius, add, celciusToF, multiply } from "../utils/common"

test('Addition Test', () => {
   const res = add(1, 1)
   expect(res).toBe(2)
})

test('Celcius to F test',  () => {
    const f = celciusToF(100)
    expect(f).toBe(212)
})

test('F to celcius', () => {
    const c = FToCelcius(80)
    expect(c).toBe(27)
})

test('Test Async Multiply', async () => {
    const res = await multiply(2,8)
    expect(res).toBe(16)
})

test('Test Async Multiply Error', async () => {
    await expect(multiply(-1,-2)).rejects.toMatch('Number must be more than 0')
})