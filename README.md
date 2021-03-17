# React Create Component
Simple npm package for creating function components and hooks with their test files in javascript or typescript.
#### install via npm 
```
  npm i -g @fannasd/crc
```

## Creating a component 
```
  crc c MyReactComponent
  //with css 
  crc c MyReactComponent css

  //with scss 
  crc c MyReactComponent scss


  MyReactComponent
  ├── MyReactComponent.test.js
  ├── MyReactComponent.scss
  └── index.js

```
## Change template to typescript
```
  //default template is javascript   crc config ts

  crc config ts
  crc c MyReactComponent scss

  MyReactComponent
  ├── MyReactComponent.test.tsx
  ├── MyReactComponent.scss
  └── index.tsx

```
## Creating a hook 
```

  crc h useTheme
  
```
