import {
  fileReadable,
  fileExists,
  fileWritable,
  readFile,
  writeFile,
  retrieveFileStats,
} from './custom_modules/filesystem/index.js';
import { log } from './custom_modules/index.js';
import { stringify } from './custom_modules/ObjectUtils.js';

/* fileExists('./myserver/cert.pem', false, null)
  .then((res) => log(res))
  .catch((err) => log(err)); */

// fileExists('./myserver/cerct.pem', false, (results) => log(results));

/* fileExists('./myserver/cert.pem', true, null)
  .then((res) => log(res))
  .catch((err) => log(err)); */

// fileExists('./myserver/cert.pem', true, (results) => log(results.status));

/* fileExists('./myserver/cerct.pem', false, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileExists('./myserver/cert.pem', false, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileExists('./myserver/cerct.pem', false, (results) => log(results));

fileExists('./myserver/cert.pem', false, (results) => log(results));

fileExists('./myserver/cert.pem', true, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileWritable('./myserver/cert.pem', (err) => log(err ? false : true));

fileReadable('./myserver/cert.pem', (err) => log(err ? false : true));

fileReadable('./myserver/cert.pem')
  .then((data) => log(data))
  .catch((err) => log(err)); */

/* readFile('./myserver/cert.pem', true, (data) => {
  data.status === 'success'
    ? log(`Success\n\t${data.payload}`)
    : log(`Failed: ${data.cause}`);
});

readFile('./myserver/cert.pem', false, (data) => {
  data.status === 'success'
    ? log(`Success\n\t${data.payload}`)
    : log(`Failed: ${data.cause}`);
});

readFile('./myserver/cert.pem', true)
  .then((data) =>
    data.status === 'success'
      ? log(`Success: \n\t${data.payload}`)
      : log(`Failed: ${data.cause}`)
  )
  .catch((err) => log(`Error: ${err.cause}`));

readFile('./myserver/cert.pem', false)
  .then((data) =>
    data.status === 'success'
      ? log(`Success: \n\t${data.payload}`)
      : log(`Failed: ${data.cause}`)
  )
  .catch((err) => log(`Error: ${err.cause}`)); */

/* writeFile(
  './',
  'test_file.html',
  `<h1>totally disavow those dukes</h1>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum reprehenderit obcaecati ad possimus nihil explicabo nulla distinctio porro hic suscipit iste repellendus corrupti libero voluptate dolore, tenetur temporibus enim. Nostrum.</p>`,
  true,
  (err) => {
    log(err ? err.cause : 'success');
  }
); */

/* writeFile(
  './',
  'test_file.html',
  `<h2>And Another thing ...</h2>
  <p>The quickest of the brown foxes had indeed jumped over all of the lazy dogs.</p>`,
  true,
  (err) => {
    log(err ? err.cause : 'success');
  }
); */

/* writeFile('./', 'test_file.html', 'Dem dukes', false)
  .then((res) => log(res.status))
  .catch((err) => log(err.cause)); */

/* retrieveFileStats('./myserver/cert.pem', true).then((res) =>
  log(`${res.status ? stringify(res.payload) : res.cause}`)
).catch(err => log(`${err.message})); */

/* retrieveFileStats('./myserver/cert.pem', true, (stats, err) => {
  if (err) {
    log(`Error: ${err.message}`);
  } else {
    log(`${stringify(stats)}`);
  }
}); */
