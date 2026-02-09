/* eslint-disable no-restricted-globals */
importScripts('/velvex_compiler.js'); 

let compilerModule = null;

self.onmessage = async (e) => {
  const { code } = e.data;

  if (!compilerModule) {
    // createVelvexModule is defined in the generated glue code
    compilerModule = await self.createVelvexModule({
      print: (text) => {
        self.postMessage({ type: 'stdout', text: text });
      },
      printErr: (text) => {
        self.postMessage({ type: 'stderr', text: text });
      }
    });
  }

  // Clear previous output state if necessary and call the C++ function
  compilerModule.ccall('compile_velvet', null, ['string'], [code]);
  self.postMessage({ type: 'done' });
};