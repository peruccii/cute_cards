import { UrlMusic } from "./url_music"

describe('Url music test', () => {

    it('should be able to create a url music', () => {
        const url_music = new UrlMusic('https://www.youtube.com/watch?v=hTWKbfoikeg')
        const urlMusicRegex = /^(https?:\/\/)(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}(\S*)?$/;

        expect(url_music).toBeTruthy()
        expect('https://www.youtube.com/watch?v=hTWKbfoikeg').toMatch(urlMusicRegex)
    })

    it('should be not able to create a url music with invalid format', () => {
        expect(() => {
            new UrlMusic('This is a url music test.')
        }).toThrow(Error)
    })
})
