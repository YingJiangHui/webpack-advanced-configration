import b from './b'
import jsxDemo from './jsx-demo.jsx'
const c =
    import ('./b')

const hi = () => {
    console.log(c)
    console.log(b)
    console.log(Promise.resolve('success'))
    console.log(jsxDemo)
}
hi()