'use client'

import api from "@/lib/axios/axios";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { DetailedCountry } from "@/domain";
import Borders from "@/components/borders";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PopulationChart from "@/components/populationchart";

export default function Page({
    params: { country }
}: {
    params: { country: string }
}) {
    const [data, setData] = useState<DetailedCountry | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCountry() {
            try {
                const { data } = await api.get<DetailedCountry>(`/countries/${country}`)
                setData(data)
            } catch (err) {
                setData(null)
            }
            setLoading(false)
        }
        fetchCountry()
    }, [])

    if (!data && !loading) {
        notFound()
    }

    if (loading) {
        return (
            <h1 className="font-bold text-2xl p-6">Loading Country Info...</h1>
        )
    }

    return (
        <div className="container h-full mx-auto p-2 md:p-6 md:px-0">
            <main>
                <div className="grid gap-0 md:gap-12 lg:grid-cols-2 grid-cols-1">
                    <div className="mb-4">
                        <div className="flex items-center mb-5">
                            <Link href="/" className="bg-gray-200 p-1 rounded me-3">
                                <ArrowLeftIcon width={30} height={30} />
                            </Link>
                            <h1 className="text-2xl md:text-4xl font-black">{data?.commonName}</h1>
                        </div>
                        <div className="mb-5">
                            <img src={data?.flag} className="border object-cover w-full h-[300px] md:w-full md:h-[400px] lg:w-[580px] rounded-lg" alt="Country Flag" />
                        </div>
                        <div className="mb-4">
                            <h2 className="font-bold text-xl">Official Name</h2>
                            <p>{data?.officialName}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="font-bold text-xl">Common Name</h2>
                            <p>{data?.commonName}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col lg:block">
                            <div className="mb-4">
                                <h2 className="mb-2 font-bold text-xl">Population</h2>
                                <PopulationChart data={data?.populationData} />
                            </div>
                            <div className="mb-4">
                                <h2 className="mb-2 font-bold text-xl">Borders {`(${data?.borders?.length})`}</h2>
                                <div className="flex">
                                    <Borders borders={data?.borders} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
