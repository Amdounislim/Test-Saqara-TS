import React, { ReactElement, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { IPokemon } from "../utils/types/pokemon";
import PokemonCard from "../components/PokemonCard";

export default function Home({
  initialPokemon: pokemonFromProps,
}: {
  initialPokemon: IPokemon;
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon>(pokemonFromProps);
  const [offset, setOffet] = useState<number>(0);

  const fetchPokemon: any = async (url: any, next: boolean) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();

    setOffet(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  };

  return (
    <Layout title="PokeDex">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.results.map((pok, index) => (
          <PokemonCard key={index} pokemon={pok} index={index + offset} />
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-5">
        <button
          disabled={!pokemon.previous}
          className="disabled:bg-gray-500 px-3 py-1 bg-slate-900"
          onClick={() => fetchPokemon(pokemon.previous, false)}
        >
          prev
        </button>
        <button
          disabled={!pokemon.next}
          className="disabled:bg-gray-500 px-3 py-1 bg-slate-900"
          onClick={() => fetchPokemon(pokemon.next, true)}
        >
          next
        </button>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const initialPokemon = await res.json();

    return {
      props: {
        initialPokemon: initialPokemon,
      },
    };
  } catch (err) {
    return {
      props: { initialPokemon: {} },
    };
  }
};

// export const getStaticProps: GetStaticProps = async (context) => {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const { InMemoryLRUCache } = require('apollo-server-caching')
//     const pokeAPI = new PokeAPI()
//     pokeAPI.initialize({ context, cache: new InMemoryLRUCache() })
//     const apolloClient = initializeApollo(null, { dataSources: { pokeAPI } })

//     interface PokemonQueryResult {
//       pokemon: IPokemon[]
//     }

//     try {
//       const { data } = await apolloClient.query<PokemonQueryResult, null>({
//         query: PokemonQuery,
//       })

//       return {
//         props: {
//           initialApolloState: apolloClient.cache.extract(),
//           pokemon: data.pokemon,
//         },
//       }
//     } catch (err) {
//       return {
//         props: { pokemon: [] },
//       }
//     }
//   }
