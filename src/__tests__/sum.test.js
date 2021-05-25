import sum from '@src/sum'
console.log(1)
describe('test sum',()=>{
  it('add number',()=>{
    expect(sum(1,2)).toBe(3)
  })
})