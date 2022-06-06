import React, { ReactElement, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { IPokemon } from "../utils/types/pokemon";
import PokemonCard from "../components/PokemonCard";
import client from "../utils/sources/apollo-client";
import { gql } from "@apollo/client";
import Search from "../components/Search";

export default function Home({
  initialPokemon: pokemonFromProps,
}: {
  initialPokemon: IPokemon;
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon>(pokemonFromProps);
  const [offset, setOffet] = useState<number>(0);
  // const [next, setNext] = useState<boolean>(true);

  const fetchPokemon: any = async () => {
    const { data } = await client.query({
      query: gql`
      query MyQuery {
        pokemon_v2_pokemon(limit: 20, offset: ${offset}) {
          id
          name
        }
      }
      `,
    });
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  return (
    <Layout title="PokeDex">
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.pokemon_v2_pokemon.map((pok, index) => (
          <PokemonCard key={index} pokemon={pok} index={index + offset} />
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-5">
        <button
          disabled={offset <= 0}
          className="disabled:bg-gray-500 px-3 py-1 bg-slate-900"
          onClick={() => setOffet(offset - 20)}
        >
          prev
        </button>
        <button
          className="disabled:bg-gray-500 px-3 py-1 bg-slate-900"
          onClick={() => setOffet(offset + 20)}
        >
          next
        </button>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          pokemon_v2_pokemon(limit: 20, offset: 0) {
            id
            name
          }
        }
      `,
    });

    return {
      props: {
        initialPokemon: data,
      },
    };
  } catch (err) {
    return {
      props: { initialPokemon: {} },
    };
  }
};
