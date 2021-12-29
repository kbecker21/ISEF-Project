/**
 * Dieses Klasse repräsentiert das Model Kurstabelle.
 */
 export interface Course {
    id: number,
    Name: string,
    Creator: number,
    CreateDate: string,
    ShortName: string,
    isActive: boolean
}