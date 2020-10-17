export class DisciplinesModel {
    name: string;
    levels: Array<DisciplinesLevelModel>;
}

class DisciplinesLevelModel {
    name: string;
    level: number;
    description: string;
    requirement: string;
    difficulty: string;
    success?: string;
}