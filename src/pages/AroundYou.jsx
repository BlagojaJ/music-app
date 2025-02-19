import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux/es/exports';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country, {
    skip: country.length === 0,
  });

  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_8k4uw7q9hU4leQyNK5n3Xud0iMKFQ'
      )
      .then((res) => {
        console.log(res?.data?.location?.country);
        setCountry('GR');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(country);

  if (isFetching || isLoading) {
    return <Loader title="Loading songs around you" />;
  }

  if (error && country) {
    return <Error title="There are no available charts for your country" />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
