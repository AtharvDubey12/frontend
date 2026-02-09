# Introduction to Velvet

Write digital mathematics quicker and easier with **Velvet**. Powered by clean and intuitive syntax that is easy to learn, remember and read. Velvet allows you to write your LaTeX documents in an efficient and smooth manner.

---

### The Philosophy

Velvet is designed with the user experience first philosophy. The overall aim for the Velvet is to create a way for people to code mathematics, that is as close to natural written maths as possible without hindering performance and avoiding verbosity.

* **Simple, Short and Readable Syntax**: Natural flowing syntax that can be read naturally from left to right, just like real written mathematics.
* **Blazing Fast Compilation**: The compiler of **Velvet**, called **Velvex**, is built from ground up in native **C++**, with zero external dependencies. Resulting in an ultra fast and lightweight compiler.
* **Fully Open-Source**: **Velvex** and **Velvet** are open source. You can use, modify, upgrade and redistribute them freely. 
* **Multi Platform Support**: **Velvex** is available for Windows and Linux. Moreover, its also available as Web Assembly code, making integration of **Velvex**, extremely easy in pre-exisiting web infrastructure in a similar way it is set up on the Playground. 



---

### **A Taste of Velvet**

The syntax is designed to be clean, simple and easy to write. Here's how Velvet looks in action:

```velvet
Ignore[This is simple comment]
Txt[The taylor series is written as:] 

Taylor[x][Inf][y]

Txt[Let there be defined a function:]

g(x,y) = Frac[(xy - 1)][(x + 1)(x + 2)]

Txt[Then:] __ Pdiff[2][g(x)][x,y] = 0

```
Translates to: 
```LaTeX
\\ 
\text{The taylor series is written as:}  \\ 
 \\ 
f\left(x\right) = \sum_{n=0}^{\infty} \frac{f^{\left(n\right)}\left(y\right)}{n!} \,\left(x-y\right)^n  \\ 
 \\ 
\text{Let there be defined a function:}  \\ 
 \\ 
 g \left( x,y \right)  =\frac{\left( xy - 1 \right)}{\left( x + 1 \right) \left( x + 2 \right)} \\ 
 \\ 
\text{Then:}  \,\,\,  \frac{\partial^2 g \left( x \right)}{\partial x \partial y} = 0
```