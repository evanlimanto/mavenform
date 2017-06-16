/*const pdftohtml = require('pdftohtmljs');
const converter = new pdftohtml('./template-cheatsheet.pdf', 'template-cheatsheet.html');

converter.convert('default').then(() => console.log("Success!"))
  .catch((err) => console.error(err));*/

const Docker = require('dockerode');
const docker = new Docker();
const dict = {
  Image: 'bwits/pdf2htmlex',
  Cmd: ['pdf2htmlEX', 'template-cheatsheet.pdf'],
  'Volumes': {
    '/pdf': {}
  },
  'Hostconfig': {
    'Binds': [process.cwd() + ':/pdf']
  }
};
docker.createContainer(dict, (err, container) => {
  container.attach({
    stream: true,
    stdout: true,
    stderr: true,
    tty: true
  }, (err, stream) => {
    stream.pipe(process.stdout); 
    container.start((err, data) => {
      if (err) console.error(err);
    });
  });
});
