import fs from 'fs'

// stream. DO NOT APPEND https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node
export const logger = (fileName: string, data: string) => {
    const stream = fs.createWriteStream("./logs/" + fileName, {flags:'a'});
    stream.write(data + "\n")
    stream.end();
}

export const readFile = (file: string) => {
    return fs.readFileSync(file).toLocaleString()
}

export const overwriteFile = (fileName: string, data: string) => {
    fs.writeFileSync(fileName, data)
}