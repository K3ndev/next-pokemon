import { FormEvent, useRef, useState } from 'react';
import Head from 'next/head';
import { useIntersection } from '@mantine/hooks';
import { Header, Footer, Pokemons } from '../../shared/components/index';
import InfiniteFetch from '../../shared/hooks/InfiniteFetch';
// import FetchPokemon from '../../shared/hooks/FetchPokemon';

export default function Home(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = props;
  // i dint not included this in ui, because it will cause a problem in styling, but i think its good in seo
  const { ref, entry } = useIntersection();
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  const { DATA: pokemonsData } = InfiniteFetch(entry, pokemonsUrl);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Next Pokemon | Home page </title>
      </Head>
      <Header />
      <main className="bg-[#D9D9D9] ">
        <section className="my-3">
          <div className="mb-3 flex justify-center">
            <form
              onSubmit={(e) => {
                onSubmitHandler(e);
              }}
            >
              <input
                type="text"
                placeholder="search"
                className="w-96"
                ref={searchInput}
              />
            </form>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {!isSearching &&
              pokemonsData?.pages.map((group: any) =>
                group.response.map((pokemon: any) => {
                  return (
                    <div key={pokemon.name}>
                      <Pokemons pokemonURL={pokemon.url} />
                    </div>
                  );
                })
              )}
          </div>
        </section>

        {pokemonsData && !isSearching && (
          <section className="mx-auto max-w-7xl">
            <div className="flex justify-center bg-red-300 ">
              <div ref={ref} className="text-red-900">
                Fetching
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

// https://eya-recipes.netlify.app/
