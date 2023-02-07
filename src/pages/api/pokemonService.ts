export const pokemonService = {
    fetchPokemons: async (limit: number, offset: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        return res.json();
    },

    fetchPokemon: async(url: string) => {
        const res = await fetch(url);
        return res.json();
    }
}