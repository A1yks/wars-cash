function getImageSrc(fileName: string, type: 'users' = 'users') {
    return `${process.env.NEXT_PUBLIC_URL}/static/images/${type}/${fileName}`;
}

export default getImageSrc;
