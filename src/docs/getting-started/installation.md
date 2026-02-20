# Installation & Setup

Welcome to the Velvet ecosystem. This guide will help you set up the **Velvex** compiler environment so you can start writing mathematical documents with speed and precision. Whether you are a local power user or a web developer, choose the method that fits your workflow.

---

### **Method 1: Native Desktop Installation**
The native installation provides the best performance for local document processing and integrates directly with your terminal.

### 1. Download the Compiler
Visit the official **[Velvet Downloads Page](#)** and select the version compatible with your operating system. 
* **Windows**: **velvex-setup-win64.exe**
* **Linux**: **velvex-linux-x64.tar.gz**

### 2. Install Compiler Locally
* **On Windows**: Launch the installer. It will handle the extraction and automatically add Velvex to your system PATH so you can call it from any directory.
* **On Linux**: Extract the archive and move the binary to your local path:
  ```bash
  sudo tar -xzf velvex-linux-x64.tar.gz -C /usr/local/bin
  ```

### 3. Verify the Setup
Open your terminal or command prompt and type the following:
```PowerShell
velvex --version
```
> **Note**: If you see the version number (e.g., velvex version 1.2.0 LTS / Nightly), you are ready to go!

---

### **Method 2: Web Integration for Developers**
If you are integrating Velvet into a website, blog, or interactive editor, use our pre-built WebAssembly module for near-native speeds in the browser.

### 1. Download the Wasm Bundle
Download the **[Wasm SDK](#)**. This package includes:
* **velvex_compiler.wasm**: The core compilation engine.
* **velvex_compiler.js**: The JavaScript bridge and code funnel.

### 2. Implement the Worker Script
To ensure your website stays responsive, we recommend you to run the compiler in a background thread using a **Web Worker**. Below is an example worker script, **velvex.worker.js**:

```javascript
importScripts("/velvex_compiler.js");

let compilerModule = null;
let initializing = false;

self.onmessage = async (e) => {
  const { code } = e.data;

  try {
    if (!compilerModule) {
      if (initializing) return;
      initializing = true;

      // Initialize the WASM module
      compilerModule = await self.createVelvexModule({
        locateFile: (path) => path.endsWith(".wasm") ? "/velvex_compiler.wasm" : path,
        print: (text) => self.postMessage({ type: "stdout", text }),
        printErr: (text) => self.postMessage({ type: "stderr", text }),
      });

      initializing = false;
    }

    // Call the C++ 'compile_velvet' function via the JS bridge
    compilerModule.ccall("compile_velvet", null, ["string"], [code]);
    self.postMessage({ type: "done" });
    
  } catch (err) {
    self.postMessage({ type: "stderr", text: err?.message || String(err) });
    self.postMessage({ type: "done" });
  }
};
```

---

## Testing Your First Script
Once installed, create a file named **test.vel** and paste this simple snippet:

```velvet
Txt[The area of a circle is:]
Area = Pi * r^2
```

Run the compiler:
```bash
velvex {file_path}/test.vel -o output.tex
```
The **Velvex** should respond with:

```PowerShell
Successfully compiled to: output.tex
```
and the **output.tex** will contain:

```LaTeX
\text{The area of a circle is:} \\
Area = \pi * r^{2}
```


---

### **Troubleshooting**
* **Command Not Found**: Restart your terminal after installation to refresh the Environment PATH variables.
* **Wasm Initialization Failed**: Ensure **velvex_compiler.wasm** is served from the root directory or update the **locateFile** path in your worker.

**Need more help?** Join our community on [GitHub](https://github.com/AtharvDubey12/Algorhythm).