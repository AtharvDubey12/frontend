# Quick Start Guide

This guide will walk you through the core syntax of **Velvet**. You'll learn how to transform natural mathematical thought into clean, readable code that compiles into professional LaTeX.

---

## 1. The Basics
Velvet relies on a strict **Capitalization Rule** to distinguish between mathematical intent and raw variables. Every built-in function, special character, and mathematical symbol begins with a **Capital Letter**.

### Handling Text and Keywords
To write natural language without accidentally triggering a keyword, use the **Txt[]** function. This explicitly tells the **Velvex** compiler to treat the contents as raw text, ignoring any reserved keywords inside.

**Example:**
```velvet
Txt[The velocity Vec is defined as:] __ Vec[v] = Diff[Vec[x]][t]
```

**Renders as:**
```math
\text{The velocity Vec is defined as:} \,\,\, \vec{v} = \frac{d\vec{x}}{dt}
```

> **Design Note**: In the example above, even though **Vec** is a reserved keyword for vectors, it is rendered as plain text because it resides within the **Txt[]** function. Outside it, **Vec[v]** correctly transforms into the mathematical vector notation **\vec{v}**.

---

### Writing Comments

In Velvet, comments are handled through the **Ignore[]** function. Unlike standard programming languages that use special characters (like // or #), Velvet treats comments as a functional call that tells the **Velvex** compiler to completely bypass the enclosed content during the LaTeX generation process.

The **Ignore[]** function follows the standard syntax of the language. It is particularly useful for leaving notes about complex derivations or marking sections of a document for future editing.

**Example:**
```velvet
Ignore[This is a comment. It will be ignored by the compiler and won't appear in the final document.]
Txt[The result of the derivation is:] __ f(42) = Integ[1][1][x][0->42] = 42
```

**Renders as:**
```math
\text{The result of the derivation is:} \,\,\, f \left( 42 \right)  =\int_{0}^{42} 1 \, dx  = 42
```

> **Pro Tip**: Inside **Ignore[]**, you can nest other commands inside it if you want to temporarily "comment out" a block of Velvet code without deleting it.
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
Txt[This is]__Txt[Incorrect! as "__" doesn't have leading and preceeding space. This will give a garbage result]
```
```Velvet
Txt[This is] __ Txt[Correct as "__" must be used as " __ "]
```


---

## 2. Core Mathematical Operations
Velvet replaces complex LaTeX nesting with simple, readable commands. Here are the essentials you will use in every document:

### Fractions and Powers
Forget `\frac{num}{den}`. In Velvet, it's just `Frac`.


### **Next Steps**
Ready to dive deeper? Check out the **[Type System](/docs/core-concepts/type-system)** to see how Velvet handles complex mathematical sets and spaces.