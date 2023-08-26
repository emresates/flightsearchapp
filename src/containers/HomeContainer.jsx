import React from "react";
import SearchUi from "@/components/search";
import Image from "next/image";

function HomeContainer() {
  return (
    <div className="relative">
      <Image src='./bg3.webp' alt="background-image" unoptimized fill className="object-cover -z-10" />
      <SearchUi />
    </div>
  );
}

export default HomeContainer;
