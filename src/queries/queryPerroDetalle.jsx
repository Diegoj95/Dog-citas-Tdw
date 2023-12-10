import { useQuery } from "react-query";
import axios from "axios";
import { LoremIpsum } from "react-lorem-ipsum";
import { get } from "react-hook-form";

export function useGetDog() {
    return useQuery(["getDog"], getDog, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    });
}

export const getDogBreeds = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
    return Object.keys(data.message);
};

export const getDog = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const dogBreeds = await getDogBreeds();
    return {
        name: dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6),
        image: data.message,
        description: (<LoremIpsum
            p={2}
            startWithLoremIpsum={false}
            avgWordsPerSentence={2}
            avgSentencesPerParagraph={1}
        />)
    };
};
