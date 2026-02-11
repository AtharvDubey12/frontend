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
Differentials can be defined with the function **Diff**.

```Velvet
Diff[degree][main expression][comma separated secondary expressions list]
```

**Degree**: Represents the order of differential, it must be a positive integer (floating point numbers are rounded down to the nearest integer) as this determines how many distinct expressions the denominator would contain.
> Note: If the degree is one (1), it is not necessary to write the [degree] segment explicity.

**Main Expression**: This is the Expression that is to be differentiated.

**Secondary Expression(s) (comma separated)**: If the degree is greater than 1, then corresponding functions can be passed to the last segment separated by a comma ',' in order [1st, 2nd, 3rd, ...]. If the degree is greater than the list of secondary expressions, then the last expression will be used to pad the missing expressions. 

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

### **Next Steps**
Ready to dive deeper? Check out the **[Type System](/docs/core-concepts/type-system)** to see how Velvet handles complex mathematical sets and spaces.