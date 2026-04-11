import blurredImage from "../assets/blurred-image.svg";
import star from "../assets/star.svg";
import Button from "./UI/Button";

export default function BlurredComponent() {
  return (
    <div className="w-391.5 mx-auto mt-16">
      <h1 className="text-[#000000] text-[40px] font-semibold ">
        Continue Learning
      </h1>
      <div className="flex justify-between items-center">
        <p className="text-[#3D3D3D] text-[18px] font-medium">
          Pick up where you left
        </p>
        <p className="text-[#4F46E5] text-[20px] font-medium underline underline-offset-[25%] cursor-pointer">
          See All
        </p>
      </div>
      <div className="flex gap-6">
        {[1, 2, 3].map((blurredContent, index) => {
          return (
            <div
              key={index}
              className="bg-[#FFFFFF] rounded-xl p-5 w-126.5 h-54.75 mt-8"
            >
              <div className="flex gap-4 mb-2">
                <img
                  src={blurredImage}
                  alt="blurred image"
                  className="w-35 h-30.75 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2.25">
                    <p className="text-[#8A8A8A] text-[14px] font-medium">
                      Lecturer{" "}
                      <span className="text-[#666666] font-medium">
                        Lecturer Marilyn Mango
                      </span>
                    </p>
                    <p className="flex items-center text-[#525252] text-[14px] font-medium gap-1">
                      <img
                        className="w-[16.62px] h-[16.62px] "
                        src={star}
                        alt="star icon"
                      />
                      4.9
                    </p>
                  </div>
                  <p className="text-[#141414] text-[20px] font-semibold">
                    Advanced React & TypeScript Development
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#141414] text-3 font-medium mb-1">
                    65% Complete
                  </p>
                  <div className="bg-[#DDDBFA] w-84 h-[15.126176834106445px] rounded-[30px] ">
                    <div
                      className="bg-[#4F46E5] h-full rounded-[30px]"
                      style={{ width: `65%` }}
                    ></div>
                  </div>
                </div>
                <Button className="flex justify-center items-center border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium rounded-lg  h-12 w-22.5 rounded-2 hover:text-[#FFFF] hover:border-[#281ED2] hover:bg-[#281ED2]">
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
