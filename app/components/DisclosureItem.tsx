
"use client"; // Es un Client Component porque usa Disclosure de Headless UI

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Image from "next/image";

export default function DisclosureItem({ dayData, dayIndex }) {
  
  const { Dia, fecha, eventos = [] } = dayData || {}; 
  const isDayIndexEven = dayIndex % 2 === 0;

  const evenPanelBg = 'bg-[#F8E3D4]'; 
  const oddPanelBg = 'bg-[#098879]';

  const evenTextColor = 'text-black'
  const oddTextColor = 'text-white';
 
  const panelBgClass = isDayIndexEven ? evenPanelBg : oddPanelBg;
  const textColorClass = isDayIndexEven ? evenTextColor : oddTextColor;

  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full "> 
          <DisclosureButton className='py-8 border-b-1 border-black border- cursor-pointer flex w-full bg-[#d89658] px-4 py-3 text-left text-lg font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-amber-50 focus-visible:ring-opacity-75'>
            <span> {fecha}</span>
            <ChevronUpIcon
              className={` justify-end text-right ml-auto ${
                open ? 'rotate-180 transform' : ''
              } h-7 w-7 text-white bg-[#d89658] rounded-full flex`}
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className={`px-4 pt-4 pb-2 text-gray-500 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 ${panelBgClass}`}        
          >
            {eventos.map((evento, index) => (

              <div key={index} className="data-container grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-6 border-b border-gray-300 last:border-b-0">
                {/* Primera columna */}
                <div className="mb-4 order-2 md:order-1"> 
                  <div className="flex flex-col gap-4"> 

                    {evento.Horario && evento.Horario.lengh > 0 && (
                      <div className="ml-20 bg-[#098879] w-[114px] h-auto p-2 rounded-r-full font-bold text-white text-2xl">
                        {evento.Horario}
                      </div>
                    )}

                    {evento.Show && evento.Show.length > 0 && ( 
                      <div className="pl-20 mr-10 bg-[#d89658] py-2">
                          <h1 className="font-medium text-4xl text-[#353036]">{evento.Show}</h1>
                      </div>
                    )}  

                    <div className="md:pl-20">
                      <h1 className="text-[#d89558] font-bold text-4xl">{evento.Titulo}</h1> 
                      <div className="flex flex-row border-b border-[#d89658] py-2 text-lg font-bold text-[#353036]"> 
                        <div className= {`border-r border-[#d89658] pr-2  ${textColorClass}`}>{evento.Tipo}</div> 
                      </div>
                    </div>

                    <div className="md:pl-20 text-lg font-semibold text-[#d89658]">
                      <div>Dirección: <span className={`${textColorClass}`} >{evento.Direccion}</span></div>
                      <div>Año: <span className={`${textColorClass}`} >{evento.Año}</span></div>
                      <div>Idioma: <span className={`${textColorClass}`} >{evento.Idioma}</span></div>
                      <div>País: <span className={`${textColorClass}`} >{evento.Pais}</span></div>
                      <div>Duración: <span className={`${textColorClass}`} >{evento.Duracion}</span></div>
                    </div>

                    <div className="md:pl-20">
                      <p><b className='text-[#d89658]'>Sinopsis:</b><span className={`${textColorClass}`}> {evento.Sinopsis} </span> </p>
                    </div>

                  </div>
                </div>

                {/* Segunda columna */}
                <div className='order-1 md:order-2'>
                 
                 <Image src={evento.Poster} alt="Poster" width={400} height={300} className='w-full'/> 
                </div>
              </div>
            ))}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}