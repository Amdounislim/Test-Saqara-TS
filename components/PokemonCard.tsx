import React, { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { PokemonEx } from "../utils/types/pokemonEx";

interface PokemonCardProps {
  pokemon: PokemonEx
}

export default function PokemonCard({
  pokemon
}: PokemonCardProps): ReactElement {
  const pokemonIndex: string = ("000" + (pokemon.id)).slice(-3);

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <a>
        <div className="bg-slate-900 rounded p-5 flex flex-col justify-center items-center relative">
          <span className="absolute text-l text-slate-500 top-0 right-3 font-bold">
            No.{pokemonIndex}
          </span>
          <Image
            alt={pokemon.name}
            width={150}
            height={150}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonIndex}.png`}
          />
          <span className="uppercase font-semibold tracking-wider text-amber-400">
            {pokemon.name}
          </span>
        </div>
      </a>
    </Link>
  );
}
