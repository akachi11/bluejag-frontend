import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { cat } = useParams();

  return (
    <div className="px-4 md:px-8">
      <div className="lg:w-[50%]">
        <p className="font-semibold montserrat uppercase mt-8 text-3xl">
          {cat}
        </p>

        <p className="montserrat mt-2">
          Elevate your performance and style with Bluejag’s men’s collection —
          crafted for those who move with purpose. Our workout tops and athletic
          wear are built to deliver peak comfort, confidence, and versatility,
          whether you’re training hard or taking it easy. With breathable,
          sweat-wicking fabrics and precision-fit designs, Bluejag ensures you
          look sharp and feel unstoppable through every rep, run, and routine.
        </p>
      </div>

      <img src="" alt="" />

      <div className="mt-8">
        <div className="mt-8">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="cursor-pointer">
                <div className="w-full">
                  <img
                    src="https://bluejag-products-bucket.s3.eu-north-1.amazonaws.com/bluejag-thumbnails/c1ae4905-c4e9-45e0-a87e-ee76d68c7c02.jpg"
                    alt=""
                    className="w-full h-[250px] md:h-[300px] object-cover rounded-lg"
                  />

                  <div className="mt-3">
                    <p className="montserrat text-sm truncate w-full">
                      Long Sleeve Compression Body Suit
                    </p>
                    <p className="text-sm montserrat text-zinc-400">
                      Compression
                    </p>
                    <p className="montserrat font-semibold">
                      {(17000).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
