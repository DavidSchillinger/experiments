import ReactDOM from 'react-dom/client'
import {Application} from './Application.tsx'
import './index.css'


const element = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(element).render(<Application/>)
