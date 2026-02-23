import ArrowRightUpIcon from "@/icons/ArrowRightUpIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../general/Button";

const products = [
  {
    image: "/images/Saffron.png",
    title: "Saffron",
    description:
      "Ahnoud saffron, handpicked for its vibrant color and rich aroma, offers unmatched quality for the most luxurious culinary experiences.",
  },
  {
    image: "/images/Pistachios.png",
    title: "Pistachios",
    description:
      "Ahnoud pistachios, carefully selected for their bold flavor and satisfying crunch, bring a taste of premium quality to every occasion.",
  },
  {
    image: "/images/Dates.png",
    title: "Dates",
    description:
      "Ahnoud dates, naturally sweet and rich in texture, are sourced from the finest harvests to deliver an authentic taste of tradition.",
  },
] as const;

const HomeProductsList = () => {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-12 gap-0 md:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col">
          <div className="relative w-full overflow-hidden aspect-[375/500] md:aspect-[555/720]">
            <Image
              src={product.image}
              alt={product.title}
              width={555}
              height={720}
              className="object-cover w-full h-full brightness-50"
            />

            <div className="hidden md:flex absolute inset-0 z-10 flex-col justify-between p-6 lg:p-10">
              <h3 className="text-center headline-05 text-gray-1">
                {product.title}
              </h3>
              <p className="text-center body-01 text-gray-1">
                {product.description}
              </p>
            </div>

            <div className="flex md:hidden absolute inset-x-0 bottom-0 z-10 flex-col gap-6 p-5">
              <div className="flex flex-col gap-2">
                <h3 className="headline-05 text-gray-1">
                  {product.title}
                </h3>
                <p className="body-01 text-gray-1">
                  {product.description}
                </p>
              </div>
              <div className="block">
                <Button className="dark sm-md" href="/product">
                  {t("discover_more_button")}
                  <ArrowRightUpIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeProductsList;