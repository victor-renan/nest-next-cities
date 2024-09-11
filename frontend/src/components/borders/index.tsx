import { BorderCountry } from "@/domain";
import { useRouter } from "next/navigation";

export default function Borders({ borders }: { borders?: BorderCountry[] | null }) {
    const router = useRouter()

    if (!borders) {
        return <p>This country doesn't have borders</p>
    }

    return (
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
                {borders.map((country) => (
                    <tr onClick={() => router.push(`/${country.countryCode}`)} key={country.countryCode} className="hover:bg-gray-200 cursor-pointer">
                        <td className="px-6 py-1 border-y">{country.commonName}</td>
                        <td className="px-6 py-1 border-y">
                            <div className="bg-gray-300 font-medium text-gray-700 w-fit px-3 rounded">
                                {country.countryCode}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}