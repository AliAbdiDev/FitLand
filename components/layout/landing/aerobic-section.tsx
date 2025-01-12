import Image from "next/image";

function AerobicSection() {

  return (
    <>
      <section className="w-full h-[25rem] max-md:hidden ">
        <Image
          src={"/image/view-all-products.jpg"}
          unoptimized
          width={500}
          height={500}
          alt="view-all-products"
          className="size-full object-cover"
        />
      </section>
    </>
  );
}

export default AerobicSection;
