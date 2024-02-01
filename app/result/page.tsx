import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home = async ({
  searchParams,
}: {
  searchParams: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
}) => {
  const url =
    "?first=" +
    searchParams.first +
    "&second=" +
    searchParams.second +
    "&third=" +
    searchParams.third +
    "&fourth=" +
    searchParams.fourth +
    "&fifth=" +
    searchParams.fifth +
    "&sixth=" +
    searchParams.sixth;
  console.log(url);
  const result = await fetcher("https://gaapi.onrender.com/" + url);
  console.log(result.message);
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 my-20"
          id="main"
        >
          <h1 className="mx-auto font-bold text-2xl">提案された観光ルート</h1>
          <div className="flex flex-col">
            <div className="flex flex-col gap-8 mx-auto">
              {result.message.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex flex-col gap-8">
                    <Card>
                      <CardHeader className="text-xl font-bold mx-auto">
                        {item.city}
                      </CardHeader>
                    </Card>

                    {index != 6 && (
                      <div className="flex gap-3 items-center">
                        <Image
                          src={"/arrow.svg"}
                          alt="→"
                          width={40}
                          height={30}
                        />
                        <p>移動</p>
                        <p>移動時間:{item.time}分</p>
                        <p>混雑指数:{item.confusion}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
