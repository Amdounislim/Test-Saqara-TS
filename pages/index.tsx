import React, { ReactElement, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { IPokemon } from "../utils/types/pokemon";

export default function Home({
  pokemon: pokemonFromProps,
}: {
  pokemon: IPokemon[];
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonFromProps);

  console.log(pokemon);
  return (
    <Layout title="PokeDex">
      <div>
        {pokemon.map((el, index) => (
          <h3 key={index} >{el.name}</h3>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const { results } = await res.json();

    return {
      props: {
        pokemon: results,
      },
    };
  } catch (err) {
    return {
      props: { pokemon: [] },
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
