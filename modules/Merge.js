var fs = require('fs'),
    chunks = fs.readdirSync(`${process.cwd()}/record/`),
    inputStream,
    currentfile,
    outputStream = fs.createWriteStream(`${process.cwd()}/record/merge.pcm`);

chunks.sort((a, b) => { return a - b; });

function appendFiles() {
    if (!chunks.length) {
        outputStream.end(() => console.log('Finished.'));
        return;
    }

    currentfile = `${process.cwd()}/record/` + chunks.shift();
    inputStream = fs.createReadStream(currentfile);

    inputStream.pipe(outputStream, { end: false });

    inputStream.on('end', function() {
        console.log(currentfile + ' appended');
        appendFiles();
    });
}

appendFiles();