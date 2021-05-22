import b from './b'
const c =
    import ('./b')

const hi = () => {
    console.log(c)
    console.log(b)
    console.log(Promise.resolve('success'))
}
hi()