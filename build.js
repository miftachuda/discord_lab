const exe = require('@angablue/exe');

const build = exe({
    entry: './dist/index.js',
    out: './expand.exe',
    pkg: ['--compress GZip'], // Specify extra pkg arguments
    version: '2.4.2',
    target: 'node14-win',
    icon: './icon.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: 'Miftachul Huda',
        ProductName: 'Labware',
        LegalCopyright: 'https://miftachuda.my.id',
        OriginalFilename: 'expand.exe'
    }
});

build.then(() => console.log('Build completed!'));