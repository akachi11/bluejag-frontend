import React from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const OrderPage = () => {
  return (
    <div>
      <div>
        <div className="p-4 bg-gray-800 mx-2 rounded-xl">
          <p className="font-semibold">Order Information</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm">TrackingID:</p>
              <p className="text-sm font-semibold">1234567890</p>
            </div>

            <div className="flex flex-row items-start justify-between">
              <p className="text-sm">Phone:</p>
              <p className="w-[50%] text-right text-sm font-semibold">
                07025704312
              </p>
            </div>

            <div className="flex flex-row items-start justify-between">
              <p className="text-sm">Delivery Address:</p>
              <p className="w-[50%] text-right text-sm font-semibold">
                43 Gbemisola Adenubi, Ago, Lagos
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 flex gap-4 mt-8">
          <img
            src="https://bluejag-products-bucket.s3.eu-north-1.amazonaws.com/bluejag-thumbnails/c1ae4905-c4e9-45e0-a87e-ee76d68c7c02.jpg"
            className="w-15 h-20 object-contain"
            alt=""
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <p className="bg-blue-500 p-1 rounded-sm text-xs font-semibold montserrat">
                  New
                </p>
                <div className="cursor-pointer">
                  <MdOutlineFavoriteBorder />
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs">Compression Long Sleeve</p>
                <p className="text-xs text-gray-400">Chalice Red - L</p>
              </div>
            </div>

            <div className="flex justify-between items-center relative">
              <p className="font-bold text-sm">
                {(15322).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
                <span className="font-light">/pcs</span>
              </p>
              <span className="text-sm">x3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
