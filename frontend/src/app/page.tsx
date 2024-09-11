'use client'

import { Country } from "@/domain";
import api from "@/lib/axios/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter()

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data } = await api.get("/countries")
        setCountries(data)
      } catch (err) {
        setCountries([])
      }
      setLoading(false)
    }
    fetchCountries()
  }, [])

  return (
    <div className="container mx-auto p-2 md:p-5 md:px-0">
      <main className="flex text-left">
        <table className="bg-gray-50 flex-1 border-collapse border table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-2">
                <span className={`flex items-center gap-1`}>
                  Name
                </span>
              </th>
              <th className="px-6 py-2">
                <span className="flex items-center gap-1">
                  Code
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="hover:bg-gray-200 cursor-pointer animate-pulse">
                <td className="px-6 py-3 border-y">
                  <div className="h-2 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-3 border-y">
                  <div className="h-2 bg-gray-300 rounded"></div>
                </td>
              </tr>
            )}
            {countries.map((country: Country) => (
              <tr onClick={() => router.push(`/${country.countryCode}`)} key={country.countryCode} className="hover:bg-gray-200 cursor-pointer">
                <td className="px-6 py-1 border-y">{country.countryName}</td>
                <td className="px-6 py-1 border-y">
                  <div className="bg-gray-300 font-medium text-gray-700 w-fit px-3 rounded">
                    {country.countryCode}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
