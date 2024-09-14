"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function WelcomePage({ setStart }: { setStart: any }) {
  function handleClickStartButton() {
    setStart(true);
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/images/logo-asamblea-full.svg"
            alt="Chile 2024 Logo"
            className="w-50"
            width="193"
            height="91"
            style={{ aspectRatio: "150/150" }}
          />
        </div>
        <div className="w-60">
          <p className="text-lg text-[#2F2D2C;]">
            <b>Realidad Aumentada Parque Nacional Conguillío</b>
          </p>
          <p className="text-sm text-[#8E8D8A;] mt-5"> Conoce el parque y su fauna silvestre típica de la región.</p>
        </div>
        <div className="mt-36">
          <button
            className="flex items-center justify-center space-x-2 h-10 px-10 py-6 text-sm font-medium text-white bg-[#2C7C89] rounded-full transition-colors hover:bg-[#256973]  disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setIsOpen(true)}
          >
            Comenzar <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        {/* <footer className="absolute bottom-4 text-xs text-gray-400">
          V.0.0.1
        </footer> */}
      </div>
      <div className="w-full flex justify-center">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 p-0" />
            <Dialog.Content
              className={`fixed z-50 bottom-0 left-0 right-0 top-auto h-full w-full max-w-full rounded-t-[25px]  bg-white p-[25px] shadow-lg ${
                isOpen ? "animate-slideInUp" : "animate-slideOutDown"
              } focus:outline-none`}
              style={{ padding: 0 }}
            >
              <div className="items-center flex-col">
                <div className="justify-center flex mt-24">
                  <div className="h-72 w-72 flex justify-center">
                    <img alt="Simbolo scan" src="/images/img-simbolo.svg" />
                  </div>
                </div>
                <div className="justify-center flex mt-24 px-4">
                  <p className="text-[#8E8D8A] text-[20px] text-center">
                  Enfoca los marcadores para ver el contenido en realidad aumentada.
                  </p>
                </div>
                <div className="flex justify-center mt-4 text-white">
                  <button
                    onClick={() => handleClickStartButton()}
                    className="bg-[#2C7C89] rounded-full p-3"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
