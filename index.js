#!/usr/bin/env node
const mainArgs = [
    {name:'type', validators: [v=> v ==='c', v=> v === 'h'],err:'type argument must be c or h\nexample crc c MyReactComponent'},
    {name:'name', validators: [ v => new RegExp(/^[$A-Z_][0-9A-Z_$]*$/i).test(v.split('/')[v.length-1]) ], err: 'Please inter a valid react component name'},
    {name:'style', validators:[v=> v ==='scss', v=> v === 'css'],err:'style argument must be css or scss '},
    {name:'template', validators:[v=> v ==='js', v=> v === 'ts'],err:'template argument must be js or ts '},
];
const configArgs =  [
    {name:'config', validators: [v=> v ==='config'],err:'config argument must be config'},
    {name:'template', validators:[v=> v ==='js', v=> v === 'ts'],err:'template argument must be js or ts '}
];
const args = process.argv.slice(2);
if(args.length < 2){
    console.error ('\nmissing arguments [Component(c)|Hook(h),Config(config)] [Component/Hook name, template(js,ts)\n see npmjs.com/package/@fannasd/crc')
    return;
}
const argValidators = args[0] ==='config'?configArgs:mainArgs;

for(let i = 0; i<args.length; i++) {
    let validator = argValidators[i].validators.filter(v=> v(args[i]));
    if(!validator.length){
        console.error (argValidators[i].err)
        return;
    }
}
if(args[0]==='h')
    require('./createHook')(args[0])
else if(args[0]==='c')
    require('./createComponent')(args[1], args[2])
else{
    const config = require('./config.json');
    config.template = args[1];
    require('fs').writeFile(__dirname+'/config.json',JSON.stringify(config),err=> console.error(err||'Configured Successfully '+  JSON.stringify(config)));
}
