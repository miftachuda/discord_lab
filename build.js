const exe = require('@angablue/exe');

const build = exe({
    entry: './index.js',
    out: './expand.exe',
    // Specify extra pkg arguments
    version: '2.4.2',
    target: 'node16-win-x64',
    icon: './icon.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: 'Miftachul Huda',
        ProductName: 'Labware',
        LegalCopyright: 'https://miftachuda.my.id',
        OriginalFilename: 'expand.exe'
    }
});

build.then(() => console.log('Build completed!'));