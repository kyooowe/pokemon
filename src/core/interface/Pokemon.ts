//#region Main Pokemon Interface
interface IPokemonBasic {
    name: string;
    url: string;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

interface IPokemonAbilities {
    ability: {
        name: string;
        url: string;
    }
}

interface IPokemonStats {
    base_stat: number;
    stat: {
        name: string;
    }
}

interface IPokemonMoves {
    move: {
        name: string;
        url: string;
    }
}

interface IPokemonMoveDetails {
    accuracy: number;
    effect_chance: string;
    effect_entries: {
        effect: string;
    }[]
    power: number;
    pp: number;
}

interface IPokemonTypes {
    type: {
        name: string;
    }
}

interface IPokemonSprites {
    back_default: string;
    front_default: string;
    other: {
        dream_world: {
            front_default: string;
        }
        home: {
            front_default: string;

        }
    }
    versions: {
        'generation-i': {

        }
    }
}

interface IPokemonImages {
    url: string;
}

interface IPokemonSpecies {
    name: string;
    url: string;
}

interface IPokemonDetails {
    base_happiness: string;
    capture_rate: string;
    egg_groups: [
        {
            name: string;
        }
    ]
    flavor_text_entries: [
        {
            flavor_text: string;
            version: {
                name: string;
            }
        }
    ]
    evolution_chain: {
        url: string;
    }
    generation: {
        name: string;
    }
    growth_rate: {
        name: string;
    }
    habitat: {
        name: string;
    }
    is_legendary: boolean;
    is_mythical: boolean;
    names: [
        {
            name: string;
        }
    ]
}
//#endregion

interface IApiResult {
    count: number;
    next: string;
    previous: string;
    results: IPokemonBasic[];
}

interface IAccordionDetails {
    label: string;
    description: string;
}

export type { IApiResult, IPokemonBasic, IPokemonAbilities, IPokemonStats, IPokemonMoves, IPokemonMoveDetails, IPokemonTypes, IPokemonSprites, IPokemonImages,  IPokemonSpecies, IPokemonDetails, IAccordionDetails };