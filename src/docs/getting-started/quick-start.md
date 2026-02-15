# Quick Start Guide

This quick start guide is meant to explain the fundamentals of **Velvet**.

---

## 1. The Basics
Velvet follows a **Capitalization Rule**, thereby every built-in function, special character, and mathematical symbol begins with a **Capital Letter** to distinguish them from regular text.

### Handling Text and Keywords
To write regular text without triggering a keyword, use the **Txt[]** function. This explicitly tells the **Velvex** compiler to treat the contents as raw text, ignoring any reserved keywords inside.

**Example:**
```velvet
Txt[The velocity Vec is defined as:] __ Vec[v] = Diff[Vec[x]][t]
```

**Renders as:**
```math
\text{The velocity Vec is defined as:} \,\,\, \vec{v} = \frac{d\vec{x}}{dt}
```

> In the example above, even though **Vec** is a reserved keyword for vectors, it is rendered as plain text because it resides within the **Txt[]** function. Outside it, **Vec[]** is recognized as the mathematical vector notation, equivalent to **\vec{}** in LaTeX.

---

### Writing Comments

In Velvet, comments are handled through the **Ignore[]** function. This function that instructs the **Velvex** compiler to completely bypass the enclosed content during the compilation process.

The **Ignore[]** function is particularly useful for leaving notes about complex derivations or marking sections of a document for future editing.

**Example:**
```velvet
Ignore[This is a comment. It will be ignored by the compiler and won't appear in the final document.]
Txt[The result of the derivation is:] __ f(42) = Integ[1][1][x][0->42] = 42
```

**Renders as:**
```math
\text{The result of the derivation is:} \,\,\, f \left( 42 \right)  =\int_{0}^{42} 1 \, dx  = 42
```

> **Tip**: Inside **Ignore[]**, you can nest other commands inside it if you want to temporarily "comment out" a block of Velvet code without deleting it.
---
> **Note**: "**__**" is a keyword thats equivalent to "\\,\\,\\," in LaTeX, it is used to add a small gap between two objects.

```velvet
Txt[Hello] Txt[World]
```

```math
\text{Hello} \text{World}
```

vs

```velvet
Txt[Hello] __ Txt[World]
```

```math
\text{Hello} \,\,\, \text{World}
```

> **Warning**: for **"__"** to work correctly, there must exist **atleast 1 space before and after** the symbol.

```Velvet
Txt[This is]__Txt[Incorrect! as "__" doesn't have a leading and preceeding space. This will give a garbage result]
```
```Velvet
Txt[This is] __ Txt[Correct as "__" must be used as " __ "]
```
---
### Writing LaTeX within Velvet

You can write raw LaTeX code within a velvet file using **Raw** function.

```velvet
Raw[
\,\frac{x}{2} \\ \\ 
\text{Hello}
]
```

```math
\,\frac{x}{2} \\ \\ 
\text{Hello}
```

Use this function if you need to use a LaTeX feature that is not yet available in velvet.

---
### Importing LaTeX Packages

You can import any LaTeX package in velvet code using two main ways:

1. Use **Import** function

```velvet
Import[amsmath, amssymb]
```

2. Use **Raw** function to directly write LaTeX

```velvet
Raw[
\usepackage{amsmath}
\usepackage{amssymb}
]
```

Both methods produce identical results. The Import function is recommended for syntactic consistency with the rest of Velvet.

---
### Static Mutable Macros

You can define a non parameterized mutable macro using **Let** function, using the syntax:

```velvet
Let[macroName][expression]
```

While defining macros, one must ensure the naming rules are followed:

1. The macro name cannot contain operators: '+', '-', '*', '/', '_' and '^'.
2. The macro name cannot contain spaces or other whitespace characters within.
3. The macro name cannot be a keyword.

```velvet
Let[fraction][Frac[5][2] + 6]
fraction - 1

Let[fraction][8]
fraction + 1
```
renders:

```math
\frac{5}{2} + 6 - 1 \\  
 \\ 
 8 + 1
```

---

## 2. Core Mathematical Functions
Here are some of the most essential functions of Velvet:

### Fractions
Fractions are implemented almost identically to LaTeX, use the function **Frac[num][den]** to define a fraction. 

```velvet
=> Frac[x][2] = Frac[4][2]
```
renders:
```math
\Rightarrow \frac{x}{2} = \frac{4}{2}
```
---
### Differentials
Differentials can be defined with the function **Diff**, where as partial differentials are defined with **Pdiff**. The **Pdiff** function is idential to **Diff** in terms of features and capabilities. Below examples are written for **Diff**, however they work the same for **Pdiff** too.

```Velvet
Diff[degree][main expression][comma separated secondary expressions list]
```

**Degree**: Represents the order of differential, it must be a positive integer (floating point numbers are rounded down to the nearest integer) as this determines how many distinct expressions the denominator would contain.
> Note: If the degree is one (1), it is not necessary to write the [degree] segment explicity.

**Main Expression**: This is the Expression that is to be differentiated.

**Secondary Expression(s) (comma separated)**: If the degree is greater than 1, then corresponding functions can be passed to the last segment separated by a comma ',' in order [1st, 2nd, 3rd, ...]. If the degree is greater than the list of secondary expressions, then the last expression will be used to pad the missing entries. 

```Velvet
Diff[2][f(x,y)][y,x]
```
renders:
```math
\frac{d^2 f(x,y)}{dydx}
```
and, 
```Velvet
Diff[2][f(x,y)][y]
```
renders:
```math
\frac{d^2 f(x,y)}{dy^2}
```
> **Note**: expression 'y' was used to pad for the remaining expression. Use this property to avoid repeating expressions
---
```velvet
Ignore[It is not necessary to write degree segment if degree = 1]

Diff[1][y][x] = Diff[y][x]
```
simply renders:
```math
\frac{dy}{dx} = \frac{dy}{dx}
```

>> Note: **Diff[][y][x]** is also equivalent to **Diff[y][x]**, but is not recommended due to lesser readability. Rather use the modern syntax and avoid degree segment entirely if degree is 1.
---
### Advanced Usage of Differentials
For finer control over the differential like non integer degrees, the **Diff** / **Pdiff** can be used as:

```velvet
Diff[^n f(x,y)][y^2,x^[n-2]] __ Txt[and] __ Pdiff[^n f(x,y)][y^2,x^[n-2]]
```
```math
\frac{d^n f \left( x,y \right)}{dy ^2 dx^{ n - 2}} \,\,\, \text{and}  \,\,\,  \frac{\partial ^n f \left( x,y \right)}{\partial y ^2 \partial x^{ n - 2}}
```
---
### Integrals

Integrals are defined with the **Integ** function

```velvet
Integ[degree][main expression][comma separated secondary expression list][comma separated list of lower_limit->higher_limit]
```

**Degree**: Represents the order of integral, it must be a positive integer (floating point numbers are rounded down to the nearest integer) as this determines the integration order

**Main Expression**: This is the Expression that is to be integrated.

**Secondary Expression(s) (comma separated)**: If the degree is greater than 1, then corresponding functions can be passed to the this segment separated by a comma ',' in order [1st, 2nd, 3rd, ...]. If the degree is greater than the list of secondary expressions, then the last expression will be used to pad the missing entries. 

**Limits (for Definite Integrals)**: If the integral is definite, then 'limit pair(s)' of integration are provided to the last segment.

```velvet
Integ[2][y][x,y][0->1,1->2]
```

```math
\int_{0}^{1} \int_{1}^{2} y \, dx  \, dy 
```

A limit pair is defined as 

```velvet
Ignore[a limit pair is: lowerLimit->upperLimit]

Ignore[
eg:
0->1
-Inf->Inf
Zeta->Alpha
]

Integ[1][g(x)][x][Alpha->Inf]
```

```math
\int_{\alpha}^{\infty} g(x) \, dx 
```

If the limit pair segment is not passed to **Integ** function, then it is considered as an indefinite integral.

```velvet
Integ[2][y][x,y]
```

```math
\iint y \, dx  \, dy 
```

---

### Limits

Limits are represented as:

```velvet
Ignore[
Lim[lowerLimitExpression->upperLimitExpression]
]

Lim[x->Inf] Frac[sin(x)][x] = 0
```

```math
\lim_{ x \to  \infty } \, \frac{sin(x)}{x} = 0
```
---

### Summation & Product

Summations and Products are represented as:

```velvet
Ignore[
Sum[lowerLimitExpression->upperLimitExpression]
]
Ignore[
Prod[lowerLimitExpression->upperLimitExpression]
]

(Sum[i=0->5] __ x_i) = (Prod[k=0->Inf] __ y_k)
```

```math
\left(\sum_{ i = 0}^{ 5} \,  \,\,\,  x _i\right) =\left(\prod_{ k = 0}^{ \infty } \,  \,\,\,  y _k\right)
```

---

### Piecewise Function

Piecewise functions are handled by the **Piece** function.
Its syntax is as follows:
```velvet
Piece[[value, condition],[value, condition],...]
```
Each value and condition are passed as a sub segment.
For example:
```velvet
Txt[The signum function is defined as:]

sgn(x) = Piece[[1, x>0],[0, x=0],[-1, x<0]]
```

```math
\text{The signum function is defined as: } \\ \\
 sgn \left( x \right)  =\begin{cases} 1 & x > 0 \\ 0 & x = 0 \\ - 1 & x < 0 \end{cases}
```
---

### Matrices and Determinants Representation

Matrices are represented by the function **Mx**, whereas Determinants are represented by the function **Dt**. Both of them follow identical syntax as represented below:

```velvet
Ignore[Mx[[row 1], [row 2], [row 3], ...]]
Ignore[Dt[[row 1], [row 2], [row 3], ...]]

A = Mx[[1,0,0],[0,1,0],[0,0,1]]

|A| = Dt[[1,0,0],[0,1,0],[0,0,1]]
```

```math
A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix}  \\ 
 \\ 
|A| = \begin{vmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1\end{vmatrix}
```
---

### Root Function

Root is represented as by the **Sqrt** function:

```velvet
Sqrt[degree][main_expression]
```
The degree parameter is optional. If omitted, the square root (degree 2) is assumed.
```velvet
Sqrt[n][5] ~~ Sqrt[2][5] != Sqrt[1][Frac[5][2]] != Sqrt[5]
```
```math
\sqrt[n]{5}  \approx \sqrt[2]{5}  \neq \sqrt[1]{\frac{5}{2}}  \neq \sqrt{5}
```

---

## 3. Predefined Series and Expansions

### Taylor Series

Taylor series is represented using the **Taylor** function.

``` velvet
Taylor[expression][upper_limit][a]
```

-   **expression** → variable of the function (e.g., x)
-   **upper_limit** → number of terms (use Inf or omit for infinite series)
-   **a** → point of expansion

If no parameters are provided, the general infinite Taylor series form
is produced.

``` velvet
Taylor
Taylor[x][n][a]
```

```math
f\left(x\right) = \sum_{n=0}^{\infty}\frac{f^{\left(n\right)}\left(a\right)}{n!}\,\left(x-a\right)^n  \\ \\
f\left(x\right) = \sum_{n=0}^{n} \frac{f^{\left(n\right)}\left(a\right)}{n!} \,\left(x-a\right)^n 
```

------------------------------------------------------------------------

### Maclaurin Series

Maclaurin series is a special case of Taylor series expanded about 0.\
It is represented using the **Maclaurin** function.

``` velvet
Maclaurin[expression][upper_limit]
```

If no parameters are provided, the infinite form is generated.

``` velvet
Maclaurin
Maclaurin[g][q]
```

```math
f\left(x\right) = \sum_{n=0}^{\infty}\frac{f^{\left(n\right)}\left(0\right)}{n!}\,x^n  \\ 
f\left(g\right) = \sum_{n=0}^{q} \frac{f^{\left(n\right)}\left(0\right)}{n!} \,\left(g\right)^n 
```

------------------------------------------------------------------------

### Fourier Series

Fourier series is represented using the **Fourier** function.

``` velvet
Fourier[expression][upper_limit][a_symbol][b_symbol]
```

-   **expression** → variable (e.g., x)
-   **upper_limit** → number of terms
-   **a_symbol** → cosine coefficient prefix
-   **b_symbol** → sine coefficient prefix

If no parameters are provided, the infinite general form is produced.

``` velvet
Fourier
Fourier[x][n][a][b]
```

```math
f\left(x\right) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos\left(nx\right) + b_n \sin\left(nx\right)\right) \\ \\ 
f\left(x\right) = \frac{a_0}{2} + \sum_{n=1}^{n} \left( a_n \cos\left(nx\right) + b_n \sin\left(nx\right)\right) 
```

------------------------------------------------------------------------

### Dirichlet Series

Dirichlet series (Riemann Zeta form) is represented using the
**Dirichlet** function.

``` velvet
Dirichlet[expression][upper_limit]
```

If no parameters are provided, the classical infinite zeta
representation is generated.

``` velvet
Dirichlet
Dirichlet[s][n]
```

```math
f\left(z\right) = \sum_{n=-\infty}^{\infty} a_n \left(z - z_0\right)^n  \\ \\
f\left(z\right) = \sum_{n=-\infty}^{\infty} a_n \left(z - z_0\right)^n 
```

------------------------------------------------------------------------

### Legendre Series

Legendre series is represented using the **Legendre** function.

``` velvet
Legendre[expression][upper_limit]
```

``` velvet
Legendre
Legendre[p][q]
```

```math
f\left(x\right) = \sum_{n=0}^{\infty} a_n P_n\left(x\right)  \\ \\
f\left(p\right) = \sum_{n=0}^{q} a_n P_n\left(p\right) 
```

------------------------------------------------------------------------

### Laurent Series

Laurent series is represented using the **Laurent** function.

``` velvet
Laurent[expression]
```

If no parameter is provided, the general infinite Laurent expansion is
produced.

``` velvet
Laurent
Laurent[y]
```

```math
f\left(z\right) = \sum_{n=-\infty}^{\infty} a_n \left(z - z_0\right)^n  \\ \\
f\left(y\right) = \sum_{n=-\infty}^{\infty} a_n \left(y - y_0\right)^n 
```

------------------------------------------------------------------------

### Binomial Expansion

Binomial expansion is represented using the **Binom** function.

``` velvet
Binomial[a][b][r]
```

-   **a** → first term
-   **b** → second term
-   **r** → exponent

``` velvet
Binomial[x][y][z]
```

```math
\left(x+y\right)^{z} = \sum_{n=0}^{\infty} \binom{z}{n} x^{\,z-n} y^n 
```

---

## 4. Symbols



### **Next Steps**
Ready to dive deeper? Check out the **[Type System](/docs/core-concepts/type-system)** to see how Velvet handles complex mathematical sets and spaces.