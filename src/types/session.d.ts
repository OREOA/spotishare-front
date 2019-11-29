export interface Session {
    // probably should use spotify types here
    owner: {
        [key: string]: any
    },
    hash: string
    // imageUrl: string,
}
