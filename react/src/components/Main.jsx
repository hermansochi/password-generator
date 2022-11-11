import React from "react";
import { Сomplexity } from './Сomplexity';
import { PwdLength } from './PwdLength';
import { PwdAmount } from './PwdAmount';
import { PwdSettings  } from './PwdSettings';
import { PwdGenerator  } from './PwdGenerator';

export default function Main() {
  return (
    <>
      <div className="relative mockup-window border bg-success w-[650px] mt-10">
      <div className="absolute top-2 left-24 text-xl font-bold">Password Generator</div>
        <div className="flex justify-center px-0 py-0 bg-base-200">
          <div className="hero bg-base-200">
            <div className="hero-content flex-col">
              <div className="flex flex-col self-start">
                <div className="py-3 text-2xl">
                  Select complexity
                </div>
                <div className="py-3 w-full">
                  <Сomplexity />
                </div>
                <div className="py-4 w-full">
                  <div className="flex flex-row justify-between">
                    <PwdLength />
                    <PwdAmount />
                  </div>
                </div>
                <div className="pt-3 pb-0 w-full">
                  <PwdSettings />
                </div>
              </div>
              <div className="pх-4 divider">PWD</div>
              <div className="pх-4 w-full">
                <PwdGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

