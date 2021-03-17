const fs = require('fs');
const config = require('./config.json');

function createHook(cmpName) {
    const files = cmpName.split('/');
    let dir = process.cwd()+'/';
    files.forEach((file,index)=>{
        if(index===0||index<files.length){
            dir+=file+'/'
            fs.mkdir(dir, err => {if (!err) return; console.log(err)});
        } if(index+1===files.length){
            const name = file.split('.')[0];
            fs.writeFile(dir+'index.'+(config.template==='js'?'js':'ts'),Hook(name), err=>console.log(err||`${name} Hook Created !`));
            fs.writeFile(dir+'\\'+name+'.test.'+(config.template==='js'?'js':'ts'),Test(name), err=>console.log(err||`${name} Hook Test Created !`));
        }
    })
    function Test(name) {
        return `import ${name} from './index';\ntest(' ${name} Hook ', () => {\n\t const ${name}Data = ${name};\n});`;
    }
    function Hook(name) {
        return `import {useState} from 'react';\nfunction ${name}(_props){\n\tconst[state,setState]=useState(false);\n\tconst changeState= x => {};\n\treturn {changeState};\n}\nexport default ${name};\n`
    }
}
module.exports  = createHook;