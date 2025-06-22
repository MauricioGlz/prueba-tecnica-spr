'use client';
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import DisclosureItem from "./components/DisclosureItem";
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import {useState, useEffect} from 'react';

export default function Home() {
  const [programacion, setProgramacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProgramacion() {
      try {
        const response = await fetch('/api/sheets'); 
        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Programación cargada:", result.data);
        
        setProgramacion(result.data);


      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgramacion();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#008879] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="relative w-full">
            <Image
              src="/bg.png"
              alt="Background Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </main>
      </div>

    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#008879] text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-[#008879] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8 w-full">
        <div className="relative w-full">
          <Image
            src="/bg.png"
            alt="Background Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </main>

      <div className="flex flex-col items-center justify-center w-full">
        {programacion.length > 0 ? (
          programacion.map((dayData, index) => (
            <DisclosureItem key={index} dayData={dayData} dayIndex={index} />
          ))
        ) : (
          <p className="text-white">No hay programación disponible.</p>
        )}
      </div>
    </div>
  );
}

