import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { IPokemonDetails } from "../../utils/types/pokemonDetails";
import Layout from "../../components/Layout";

interface PokemonProps {
  pokemon: IPokemonDetails;
}

export default function Pokemon({ pokemon }: PokemonProps): ReactElement {
  const pokeIndex: string = ("000" + pokemon.id).slice(-3);
  const pokeName: string =
    pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const renderTypes = () =>
    pokemon.types.map((type, index) => (
      <li key={index} className="px-2 py-1 bg-slate-700 rounded">
        {type.type.name}
      </li>
    ));

  const renderStats = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="bg-slate-700 my-2 rounded p-1">
        <div
          className="bg-slate-900 rounded px-2"
          style={{ width: `${stat.base_stat}%` }}
        >
          {stat.stat.name}: {stat.base_stat}
        </div>
      </div>
    ));

  return (
    <Layout title={pokeName}>
      <div>
        <Link href="/">
          <a>
            <button className="px-3 py-1 bg-slate-900 rounded absolute z-10">
              Back
            </button>
          </a>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center ">
        <span className="absolute text-[400px] font-bold text-slate-500">
          No.{pokeIndex}
        </span>
        <Image
          alt={pokemon.name}
          width={400}
          height={400}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
        />
      </div>

      <div className="bg-slate-900 rounded p-5">
        <ul className="flex gap-5 mb-2">
          <li className="px-2 py-1 bg-slate-700 rounded">
            Height : {pokemon.height} m
          </li>
          <li className="px-2 py-1 bg-slate-700 rounded">
            Weight : {pokemon.weight} kg
          </li>
        </ul>
        <ul className="flex gap-5">{renderTypes()}</ul>

        <div>{renderStats()}</div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();

    return {
      props: {
        pokemon,
      },
    };
  } catch (err) {
    return {
      props: { pokemon: {} },
    };
  }
};
