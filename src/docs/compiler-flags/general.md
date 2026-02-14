## Flags

---

### Output Flag

The output ("-o") flag tells the compiler where to create the compiled ".tex" file.

```cmd
velvex file.vel -o result.tex
```

creates a file named "result.tex" in the current working directory (CWD).

```cmd
velvex C:/temp/code.vel -o D:/output/output.tex
```
creates "output.tex" in "D:/output/" directory.

---

### Watch Flag

```cmd
velvex --watch file.vel -o watched.tex
```

The compiler monitors the "file.vel" in current working directory and compiles the code whenever its content change, to "watched.tex" file in CWD.
The monitoring continues until the terminal is either closed or the process is terminated via the Ctrl + C keyboard interrupt.