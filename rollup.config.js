import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'

import { terser } from 'rollup-plugin-terser'
import { string } from 'rollup-plugin-string'

import builtins from 'builtin-modules'

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/main.js',
      format: 'cjs',
      strict: false,
    },
    {
      file: 'dist/main.min.js',
      format: 'cjs',
      strict: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript(),
    alias(),
    string({ include: '**/*.sql' }),
  ],
  external: [
    ...builtins,

    // modules to install
    'ws',
    'mysql2/promise',
  ],
}
