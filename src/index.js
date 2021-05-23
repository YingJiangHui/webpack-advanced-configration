import aaa from '@src/ts-demo.ts'
import TsxDemo from './tsx-demo.tsx'
import './stylus-vars.styl'
import vars from '@src/stylus-vars.styl'
import './style.styl'

console.log(vars)
const hi = () => {
    console.log(aaa);
    console.log(TsxDemo)
}
hi()