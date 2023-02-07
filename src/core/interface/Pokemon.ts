interface IApiResult {
    count: number;
    next: string;
    previous: string;
    results: IPokemonBasic[];
}

interface IPokemonBasic {
    name: string;
    url: string;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

interface IPokemonMoves {
    move: {
        name: string;
    }
}

interface IPokemonTypes {
    type: {
        name: string;
    }
}

interface IPokemonSprites {
    back_default: string;
    front_default: string;
}

interface IPokemonSpecies {
    name: string;
    url: string;
}

export type { IApiResult, IPokemonBasic, IPokemonMoves, IPokemonTypes, IPokemonSprites, IPokemonSpecies };