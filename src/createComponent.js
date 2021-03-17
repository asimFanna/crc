const fs = require('fs');
const config = require('./config.json');
function createComponent(cmpName,style) {
    const files = cmpName.split('/');
    let dir = process.cwd()+'/';
    files.forEach((file,index)=>{
        if(index===0||index<files.length){
            dir+=file+'/'
            fs.mkdir(dir, err => {if (!err) return; console.log(err)});
        } if(index+1===files.length){
            const name = file.split('.')[0];
            fs.writeFile(dir+'index.'+(config.template==='js'?'js':'tsx'),Component(name), err=>console.log(err||`${name} Component Created !`));
            fs.writeFile(dir+'\\'+name+'.test.'+(config.template==='js'?'js':'tsx'),Test(name), err=>console.log(err||`${name} Component Test Created !`));
            if(style==='scss')
                fs.writeFile(dir+name+'.scss',Component(name), err=>console.log(err||`${name}.scss Created !`));
            else if(style === 'css')
                fs.writeFile(dir+name+'.css','', err=>console.log(err||`${name}.css Created !`));
        }
    })
    function Test(name) {

        return `import { render } from '@testing-library/react';\nimport ${name} from './index';\ntest('Render ${name}', () => {\n\tconst {getByText} = render(<${name} />);\n\tgetByText('${name} Component Working')\n});`;

    }
    function Component(name) {
        const importStyle = style?"import './"+name+'.'+style+"'":'';
        if (config.template==='js')
        return `${importStyle}${importStyle?'\n':''}function ${name}(_props){\n\treturn (<div>${name} Component Working</div>);\n}\nexport default ${name};\n`;
        return `import React from "react";${importStyle?'\n':''}${importStyle}\ninterface Props extends React.ButtonHTMLAttributes<HTMLElement> {\n}\nconst ${name}: React.FC<Props> = (props)=> {\n\treturn (<div>${name} is working!</div>);\n}\nexport default ${name};\n`
    }
}

module.exports = createComponent;