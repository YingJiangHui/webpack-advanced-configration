import aaa from '@src/ts-demo.ts'
import TsxDemo from './tsx-demo.tsx'
import styles from '@src/export-scss.scss'
import styles2 from '@src/css.scss'
import '@src/less-vars.less'
import vars from '@src/less-vars.less'
console.log(vars)
console.log('styles',styles);
console.log("styles2",styles2);
const hi = () => {
    console.log(aaa);
    console.log(TsxDemo)
}
hi()