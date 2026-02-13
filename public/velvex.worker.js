importScripts("/velvex_compiler.js");
let compilerModule = null;
let initializing = false;

self.onmessage = async (e) => {
  const { code } = e.data;

  try {
    // Initialize the WASM module once
    if (!compilerModule) {
      if (initializing) return;
      initializing = true;

      compilerModule = await self.createVelvexModule({
        locateFile: (path) => {
          if (path.endsWith(".wasm")) {
            return "/velvex_compiler.wasm";
          }
          return path;
        },

        // stdout from C++
        print: (text) => {
          self.postMessage({ type: "stdout", text });
        },

        // stderr from C++
        printErr: (text) => {
          self.postMessage({ type: "stderr", text });
        },
      });

      initializing = false;
    }

    // Call the exported C++ function
    compilerModule.ccall(
      "compile_velvet",   // function name
      null,               // return type
      ["string"],         // argument types
      [code]              // arguments
    );

    self.postMessage({ type: "done" });
  } catch (err) {
    
    self.postMessage({
      type: "stderr",
      text: err?.message || String(err),
    });

    self.postMessage({ type: "done" });
  }
};
