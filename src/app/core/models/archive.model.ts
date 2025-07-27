export interface EditionModel {
    _id?: string,
    title: string,
    description: string,
}

export interface VideoModel {
    _id?: string,
    editionId: string,
    title: string,
    description: string,
    code: string
}