import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    resolve:{
        alias:{
            "@ui": resolve('./src/UI/index.ts')
        }
    }
})