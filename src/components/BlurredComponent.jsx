import blurredImage from "../assets/blurred-image.svg";
import star from "../assets/star.svg";
import lock from "../assets/Lock.svg";
import { useModal } from "../context/ModalContext";
import Button from "./UI/Button";

export default function BlurredComponent() {
  const { openModal } = useModal();
  return (
    <div className="w-391.5 mx-auto mt-16">
      <h1 className="text-[#000000] text-[40px] font-semibold ">
        Continue Learning
      </h1>
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#3D3D3D] text-[18px] font-medium">
          Pick up where you left
        </p>
        <p className="text-[#4F46E5] text-[20px] font-medium underline underline-offset-[25%] cursor-pointer">
          See All
        </p>
      </div>
      <div className="flex gap-6 relative">
        <div className="z-10 border-2 border-[#ADADAD] bg-[#FFFFFF] w-104.5 h-58.25 rounded-xl py-8 px-14 text-center absolute inset-0 left-1/2 -translate-x-1/2">
          <div className="bg-[#DDDBFA] rounded-full p-5 w-18.5 h-19.25 mb-3 mx-auto">
            <img
              className="w-9.25 h-9.25 object-cover"
              src={lock}
              alt="lock icon"
            />
          </div>
          <p className="text-[16px] font-medium text-[#0A0836] mb-6">
            Sign in to track your learning progress
          </p>
          <Button
            onClick={() => openModal("login")}
            className="bg-[#4F46E5] rounded-lg text-[#F5F5F5] text-[16px] font-medium  h-10.5 w-20.75 hover:bg-[#281ED2]"
          >
            Log In
          </Button>
        </div>
        <div className="flex gap-6 blur-[9px] opacity-76">
          {[1, 2, 3].map((blurredContent, index) => {
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-xl p-5 w-126.5 h-54.75"
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
                  <Button className="flex justify-center items-center border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium h-12 w-22.5 rounded-lg hover:text-[#FFFF] hover:border-[#281ED2] hover:bg-[#281ED2]">
                    View
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
