import fs from 'fs';
import { v4 as uuid } from 'uuid';

async function downloadImage(url: string, dest: string) {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');
    const imageFormat = contentType?.split('/')[1];
    const imageName = `${uuid()}.${imageFormat}`;
    const fileStream = fs.createWriteStream(`${dest}/${imageName}`, { encoding: 'binary' });

    const stream = new WritableStream({
        write(chunk) {
            fileStream.write(chunk);
        },
        close() {
            fileStream.end();
        },
    });

    return new Promise<string>((resolve, reject) => {
        res.body?.pipeTo(stream);
        fileStream.on('error', reject);
        fileStream.on('finish', () => {
            resolve(imageName);
        });
    });
}

export default downloadImage;
