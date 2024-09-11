import axios from "@/lib/axios/axios";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type Country = {
  countryName: string;
  countryCode: string;
};

export default async function Page() {
  async function fetchCountries(): Promise<Country[]> {
    try {
      const { data } = await axios.get<Country[]>("/countries")
      return data
    } catch (err) {
      return []
    }
  }

  const countries = await fetchCountries();

  return (
    <div className="container mx-auto p-2 md:p-5 md:px-0">
      <main className="flex text-left">
        <table className="bg-slate-100 flex-1 border-collapse border border-slate-300 table-auto">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-5 py-2">Name</th>
              <th className="p-5 py-2">Code</th>
              <th className="p-5 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country: Country) => (
              <tr key={country.countryCode}>
                <td className="p-5 py-2 border-y">{country.countryName}</td>
                <td className="p-5 py-2 border-y">
                  <div className="bg-slate-300 w-fit px-3 rounded">
                    {country.countryCode}
                  </div>
                </td>
                <td className="p-5 py-2 border-y">
                  <button className="ms-auto flex bg-slate-500 gap-2 text-slate-50 px-2 py-1 rounded items-center hover:bg-slate-400 ease-in-out duration-300">
                    <div className="hidden md:inline">See Info</div>
                    <ArrowRightIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
